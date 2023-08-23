import { RequestHandler, query } from 'express';
// import { explainQuery } from '../helpers/explainQuery';
import { PoolClient, QueryResult } from 'pg';
import { faker } from '@faker-js/faker';
import { type } from 'os';


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
///////////////////
//Helper functions
function generateFakeData(dataType: string): any {
  switch (dataType) {
  case 'string':
    return faker.lorem.word(35);
  case 'number':
    return faker.number.bigInt();
  case 'date':
    return faker.date.past();
  case 'boolean':
    return faker.datatype.boolean();
  case 'timestamp without time zone':
    // You can use 'toISOString()' and then strip off the 'Z' (indicating UTC time).
    // This will provide a date-time string in the format '2023-08-10T14:30:00'.
    // If you want it without the 'T', you can replace it with a space.
    return faker.date.recent().toISOString().replace('Z', '').replace('T', ' ');
  default:
    return faker.lorem.word();
  }
}


//function for finding 
const identifyCascadeDeletes = async (dbInfo: DBinfo, tableName: string, key: any, visitedTables = new Set<string>()): Promise<string[]> => {
  if (visitedTables.has(tableName)) return [];

  visitedTables.add(tableName);
  const cascadeDeletes = [tableName];

  for (const potentialDependentTableName in dbInfo) {
    const potentialDependentTableInfo = dbInfo[potentialDependentTableName];

    if(Object.keys(potentialDependentTableInfo.foreignKeysObj).length > 0 && potentialDependentTableInfo.foreignKeysObj.constructor === Object) {
      for (const fk in potentialDependentTableInfo.foreignKeysObj) {
        if (potentialDependentTableInfo.foreignKeysObj[fk].referencedTable === tableName) {
          const childDeletes = await identifyCascadeDeletes(dbInfo, potentialDependentTableName, visitedTables);
          cascadeDeletes.push(...childDeletes);
          
        }
      }
    }
  }
  console.log('THIS IS CASCADE DELETES', cascadeDeletes);
  return cascadeDeletes;
};

const isLookupTable = async(db: PoolClient, tableName: string): Promise<boolean> => {
// 1. Check for Incoming Foreign Key References
  const incomingFKQuery = `
  SELECT COUNT(*) as incoming_count
  FROM pg_constraint
  WHERE confrelid = (SELECT oid FROM pg_class WHERE relname = $1)
`;
  const incomingFKResult: QueryResult = await db.query(incomingFKQuery, [tableName]);
  const incomingFKCount = parseInt(incomingFKResult.rows[0].incoming_count, 10);

  // 2. Check for Outgoing Foreign Key References
  const outgoingFKQuery = `
   SELECT COUNT(*) as outgoing_count 
   FROM information_schema.key_column_usage 
   WHERE table_name = $1 AND position_in_unique_constraint IS NOT NULL;
 `;
  const outgoingFKResult: QueryResult = await db.query(outgoingFKQuery, [tableName]);
  const outgoingFKCount = parseInt(outgoingFKResult.rows[0].outgoing_count, 10);

  // 3. Check the Number of Columns
  const columnCountQuery = `
   SELECT COUNT(*) as column_count 
   FROM information_schema.columns 
   WHERE table_name = $1;
 `;
  const columnCountResult: QueryResult = await db.query(columnCountQuery, [tableName]);
  const columnCount = parseInt(columnCountResult.rows[0].column_count, 10);

  // 4. Check the Number of Rows
  const rowCountQuery = `SELECT COUNT(*) as row_count FROM ${tableName};`;
  const rowCountResult: QueryResult = await db.query(rowCountQuery);
  const rowCount = parseInt(rowCountResult.rows[0].row_count, 10);

  // Conditions to determine if the table is a lookup table
  const isReferencedByMany = incomingFKCount >= 1; // Adjust this threshold as needed
  const hasFewOutgoingReferences = outgoingFKCount === 0;
  const hasFewColumns = columnCount <= 3; // Adjust this threshold as needed
  const hasFewRows = rowCount <= 100; // Adjust this threshold as needed

  return isReferencedByMany && hasFewOutgoingReferences && hasFewColumns && hasFewRows;
};

//////////////////////////////////////////////////////

const genericMetricsController: GeneralMetricsController = {
  performGenericQueries: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const tableNames = res.locals.tableNames;
    // console.log('tableNames', tableNames);
   
    const dbInfo = res.locals.databaseInfo;
    // console.log('metrics pulls db info ', dbInfo);
    const executionPlans: ExecutionPlans = {};

    await db.query('BEGIN'); // Start the transaction

    try {
      for (const tableName of tableNames) {
        const tableInfo = dbInfo[tableName];
        // console.log('tableInfo', tableInfo);
        const columnDataTypes = tableInfo.columnDataTypes;
        // console.log('COOLUMN DATATYPEs', columnDataTypes);
        const sampleRow = { ...tableInfo.sampleData };
        const primaryKeysObject = tableInfo.primaryKeysObj;
        const checkContraintObj = tableInfo.checkConstraints;
        const foreignKeysObj = tableInfo.foreignKeysObj;
        const pkArray = [...Object.keys(primaryKeysObject)];
        // console.log('FKOBJ', foreignKeysObj);

        //Initialize exec plans for the table
        executionPlans[tableName] = {};


        //INSERT Test this will be the hardest test of them all because we must account for complex relationships and constraints as we will see
        const values = { ...sampleRow};
        const unchangedSample = { ...sampleRow};

        //first we must find all the columns that are primary keys or foriegn keys 
        for(const pk in primaryKeysObject){
          //primary keys often use auto-incrementing columns (e.g., SERIAL type in PostgreSQL). If you're inserting into a table with an auto-incrementing primary key, you typically omit that column from the insert statement, and the database will automatically assign a value to it.
          if(primaryKeysObject[pk].isAutoIncrementing || pk === 'id'){
            // console.log('in delete pk condition this is pk', pk);
            delete values[pk];
          }else{
            // console.log('pk datatype and autoincrement', primaryKeysObject[pk].datatype, primaryKeysObject[pk].isAutoIncrementing);
            values[pk] = generateFakeData(primaryKeysObject[pk].datatype);
            // console.log('pk random generator for ', pk, generateFakeData(values[pk]));
          }
        }
        //Now we need to handle foreing keys by choosing a random value in the refrenced table to pair the new row to 
        for(const fk in foreignKeysObj){
          // Fetch a valid foreign key value from the referenced table
          const fkColumn = foreignKeysObj[fk].column;
          const fkRefTable = foreignKeysObj[fk].referencedTable;
          const fkRefColumn = foreignKeysObj[fk].referencedColumn;
          // console.log('refssss', fkColumn, fkRefColumn, fkRefTable);
          const validFKValues = await db.query(`SELECT ${fkRefColumn} FROM ${fkRefTable} LIMIT 100`); // fetch the first 100 rows for performance reasons
          if (validFKValues.rowCount > 0) {
            const randomIndex = faker.number.int({ min: 0, max: validFKValues.rowCount - 1 });
            values[fkColumn] = validFKValues.rows[randomIndex][fkRefColumn];
            // console.log('randomInt is ', randomIndex, 'and the values pulled are ', values[fkColumn] );
            // console.log('randomInt is ', randomIndex, 'and the values pulled are ', values[fkColumn] );
          } else {
            throw new Error(`No valid foreign key values found for table: ${fkRefTable}`);
          }
        }


        
        for (const key of columnDataTypes) {
          // console.log('Values:', values);
          // console.log('Foreign Keys Object:', foreignKeysObj);
          // console.log('Check Constraints obj', checkContraintObj);
          // console.log('column dataTypes', columnDataTypes);
          // console.log('Values:', values);
          // console.log('Foreign Keys Object:', foreignKeysObj);
          // console.log('Check Constraints obj', checkContraintObj);
          // console.log('column dataTypes', columnDataTypes);
          if (!foreignKeysObj[key.column_name] && !checkContraintObj[key.column_name]) {
            // const valueDataType = typeof values[key];
            // console.log('js data type',key.column_name,key.datatype);
            // console.log('datatype and column', key.datatype, key.column_name);
            // console.log('js data type',key.column_name,key.datatype);
            // console.log('datatype and column', key.datatype, key.column_name);
            values[key.column_name] = generateFakeData(key.datatype);
          }
        }
        delete values['id'];
        const placeholders = Object.keys(values)
          .map((key, index) => `$${index + 1}`)
          .join(', ');
      
        const insertQuery = `INSERT INTO ${tableInfo.tableName} (${Object.keys(values).join(', ')}) VALUES (${placeholders})`;
        
        // console.log('query', query);
        // console.log('values array',Object.values(values));
        // console.log('query', query);
        // console.log('values array',Object.values(values));
        const insertPlan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,FORMAT JSON) ${insertQuery}`, Object.values(values));
        //need to handle errors still
        executionPlans[tableName].INSERT = { query: insertQuery, plan: insertPlan, values: values };

        ///Insert test finished 
    
        //SELECT Test
        // SELECT test we make a select from the sample we pulled in the dbinfo tab
        const selectQuery = `SELECT * FROM ${tableInfo.tableName} WHERE ${pkArray[pkArray.length - 1]} = $1`;
        // console.log('this is the unchangedSample', unchangedSample, 'and this is the primaryKey',tableInfo.primaryKeysObj, 'selectQuery', selectQuery);
        const selectPlan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,FORMAT JSON) ${selectQuery}`, [unchangedSample[pkArray[pkArray.length - 1]]]);
        executionPlans[tableName].SELECT = { query: selectQuery, plan: selectPlan };
        /////////////////

        //UPDATe Test
        //we want to update the sample row by changing only the non constrained column values
        let updateColumn;
        let updateValue;
        for(const column of Object.keys(unchangedSample)){
          if(!primaryKeysObject[column] && !foreignKeysObj[column]){
            // console.log('entered the if block and the column is', column)
            updateColumn = column;
            updateValue = unchangedSample[column];
            break;
          }
        }
        // console.log('update col and val', updateColumn, updateValue)
        const updateQuery = `UPDATE ${tableInfo.tableName} SET ${updateColumn} = $1 WHERE ${pkArray[pkArray.length - 1]} = $2`;
        const updatePlan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,FORMAT JSON) ${updateQuery}`, [updateValue, unchangedSample[pkArray[pkArray.length - 1]]]);
        executionPlans[tableName].UPDATE = { query: updateQuery, plan: updatePlan };
        //done with update

        /* IGNORE - THIS IS THE CURRENT PROGRESS ON THE DELETE STATEMENT
        ///DELETE TEST

        // // To perform the DELETE test, we can delete a sample row that we fetched in the DBinfo step.
        // // This should be done with caution since deletion will cascade through all connected rows, which is why we've set up transactions to roll back the changes later.

        // const cascadingDeletes = await identifyCascadeDeletes(dbInfo, tableName, unchangedSample[pkArray[pkArray.length - 1]]);
        // console.log('Tables affected by cascading delete:', cascadingDeletes);

        // const deleteQuery = `DELETE FROM ${tableInfo.tableName} WHERE ${pkArray[pkArray.length - 1]} = $1`;
        // const deletePlan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${deleteQuery}`, [unchangedSample[pkArray[pkArray.length - 1]]]);
        // executionPlans[tableName].DELETE = { query: deleteQuery, plan: deletePlan };
        
        // 1. Identify which tables would be affected by a cascading delete.
        
        let lookupFlag = false;
        executionPlans[tableName].DELETE = {query: 'placeholder'}
        executionPlans[tableName].DELETE['otherExecutions'] = {}
        lookupFlag = await isLookupTable(db, tableName);

        console.log('look up val!!!!!!', lookupFlag, 'table name ', tableName)
        if(lookupFlag){
          console.log(`Skipping delete test for lookup table: ${tableName}`);
          executionPlans[tableName].DELETE = { query: 'Flagged as a Lookup table. skipped deleteQuery' };
        }else{
          const tablesToDeleteFrom = await identifyCascadeDeletes(dbInfo, tableName, sampleRow[pkArray[pkArray.length - 1]]);
          console.log('TABLE NAMES',tablesToDeleteFrom);
          // 2. Iterate over the tables identified in the cascading delete and explain the DELETE statements.
          for (const tableToDeleteFrom of tablesToDeleteFrom) {
            if(!await isLookupTable(db, tableToDeleteFrom)){
            // Formulate DELETE statement
              let tempTableInfo = dbInfo[tableToDeleteFrom]
              let tempPkAray = [...Object.keys(tempTableInfo.primaryKeysObj)];
              let tempSample = {...dbInfo[tableToDeleteFrom].sampleData};
              const deleteQuery = `DELETE FROM ${tableToDeleteFrom} WHERE ${tempPkAray[tempPkAray.length - 1]} = $1`;
              // `EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${
              // Fetch DELETE execution plan
              const deletePlan = await db.query(deleteQuery, [tempSample[tempPkAray[tempPkAray.length - 1]]]);
          
              const delname = 'DELETE' + `${tableToDeleteFrom}`;
              console.log('delname and del plan', delname, deletePlan)
              // executionPlans[tableName].DELETE['otherExecutions'][delname] = { query: deleteQuery, plan: deletePlan };
          
            }  
          }
        }
        */
      }
      await db.query('ROLLBACK'); // Roll back the transaction, undoing all changes
      res.locals.executionPlans = executionPlans;
      return next();

    }catch (error) {
      // console.log(insertQuery);
      // console.log('ERROR in generalMetricsController.performGenericQueries: ', error);
      return next({
        log: `ERROR caught in generalMetricsController.performGenericQueries: ${error}`,
        status: 400,
        message: 'ERROR: error has occurred in generalMetricsController.performGenericQueries',
      });
    }
  }


};

export default genericMetricsController;