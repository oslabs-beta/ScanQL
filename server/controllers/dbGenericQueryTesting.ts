import { RequestHandler, query } from 'express';
// import { explainQuery } from '../helpers/explainQuery';
import { PoolClient, QueryResult } from 'pg';
import { faker } from '@faker-js/faker';

type GeneralMetricsController = {
    performGenericQueries: RequestHandler;
  };
type QueryResults = {
    query?: string;
    plan?: QueryResult;
    values?: any;
    otherExecutions?: TableResults
};

type TableResults = {
    [tablename: string]: QueryResults
};

type ExecutionPlans = {
    [tablename: string]: TableResults;
};
///Using for helper functions on delete 
interface ForeignKey {
  column: string;
  referencedTable: string;
  referencedColumn: string;
}
type ForeignKeyInfo = {[columName: string]: ForeignKey}
type PrimaryKeyInfo = {
  [columnName: string]: {datatype: string, isAutoIncrementing: boolean};
};
interface TableInfo {
  tableName: string;
  numberOfRows: number;
  numberOfIndexes: number;
  numberOfFields: number;
  numberOfForeignKeys: number;
  foreignKeysObj: ForeignKeyInfo
  primaryKeysObj: PrimaryKeyInfo 
}
interface DBinfo {
  [tablename: string]: TableInfo;
}

const dbGenericQueryTesting: GeneralMetricsController = {
  performGenericQueries: async (req, res, next) => {
    console.log('in the genericMetricsController');
    const db = res.locals.dbConnection;

    const tableNames = res.locals.tableNames;

    const dbInfo = res.locals.databaseInfo;

    const executionPlans: ExecutionPlans = {};

    // await db.query('BEGIN'); // Start the transaction
    console.log('in the genericMetricsController line 205');
    try{  
      for (const tableName of tableNames) {
        const tableInfo = dbInfo[tableName];
        // console.log('tableInfo', tableInfo);
        const primaryKeysObject = tableInfo.primaryKeysObj;
        const checkContraintObj = tableInfo.checkConstraints;
        const foreignKeysObj = tableInfo.foreignKeysObj;
        const sampleData = tableInfo.sampleData;
        const columnDataTypes = tableInfo.columnDataTypes;
        //UPDATe Test
        //we want to update the sample row by changing only the non constrained column values
        let updateColumn;
        let updateValue;
        for(const col of sampleData){
          if(!primaryKeysObject[col] && !foreignKeysObj[col] && !checkContraintObj[col]){
            // console.log('entered the if block and the column is', column)
            updateColumn = col;
            updateValue = sampleData[col];
            break;
          }
        }
        // console.log('update col and val', updateColumn, updateValue)
        const updateQuery = `UPDATE ${updateValue} SET ${updateColumn} = $1 WHERE ${updateColumn} = ${sampleData[updateColumn]}`;
        const updatePlan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,FORMAT JSON) ${updateQuery}`, [updateValue, unchangedSample[pkArray[pkArray.length - 1]]]);
        executionPlans[tableName].UPDATE = { query: updateQuery, plan: updatePlan };
        //done with update
        console.log('in the genericMetricsController updateQuery', updateQuery);
      }  
    }
    catch(error) {
      //Rollback if an error is caught
      // await db.query('ROLLBACK');
      // console.log('insertQuery');
      // console.log('ERROR in generalMetricsController.performGenericQueries: ', error);
      return next({
        log: `ERROR caught in generalMetricsController.performGenericQueries: ${error}`,
        status: 400,
        message: 'ERROR: error has occurred in generalMetricsController.performGenericQueries',
      });
    }
  }
};

export default dbGenericQueryTesting;