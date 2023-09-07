///Using for helper functions on delete 
// interface ForeignKey {
//   column: string;
//   referencedTable: string;
//   referencedColumn: string;
// }
// type ForeignKeyInfo = { [columName: string]: ForeignKey }
// type PrimaryKeyInfo = {
//   [columnName: string]: { datatype: string, isAutoIncrementing: boolean };
// };
// interface TableInfo {
//   tableName: string;
//   numberOfRows: number;
//   numberOfIndexes: number;
//   numberOfFields: number;
//   numberOfForeignKeys: number;
//   foreignKeysObj: ForeignKeyInfo
//   primaryKeysObj: PrimaryKeyInfo
// }
// interface DBinfo {
//   [tableName: string]: TableInfo;
// }
const dbGenericQueryTesting = {
    performGenericQueries: async (_req, res, next) => {
        const db = res.locals.dbConnection;
        const tableNames = res.locals.tableNames;
        const dbInfo = res.locals.databaseInfo;
        const executionPlans = {};
        // await db.query('BEGIN'); // Start the transaction
        try {
            for (const tableName of tableNames) {
                //Initialize exec plans for the table
                executionPlans[tableName] = {};
                // executionPlans[tableName].DELETE ={query: 'not applicable yet'};
                // executionPlans[tableName].INSERT ={query: 'not applicable yet'};
                const tableInfo = dbInfo[tableName];
                const primaryKeysObject = tableInfo.primaryKeysObj;
                // const checkContraintObj = tableInfo.checkConstraints;
                const foreignKeysObj = tableInfo.foreignKeysObj;
                const sampleData = tableInfo.sampleData;
                // const columnDataTypes = tableInfo.columnDataTypes;
                const pkArray = [...Object.keys(primaryKeysObject)];
                const sampleValuesArr = Object.values(sampleData);
                const sampleColumnsArr = Object.keys(sampleData);
                const unchangedSample = { ...sampleData };
                //SELECT Test
                // SELECT test we make a select from the sample we pulled in the dbinfo tab
                const selectQuery = `SELECT * FROM ${tableInfo.tableName} WHERE '${sampleColumnsArr[sampleColumnsArr.length - 1]}' = $1`;
                const selectPlan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,FORMAT JSON) ${selectQuery}`, [sampleValuesArr[sampleValuesArr.length - 1]]);
                executionPlans[tableName].SELECT = { query: selectQuery, plan: selectPlan };
                /////////////////
                //UPDATe Test
                //we want to update the sample row by changing only the non constrained column values
                let updateColumn = sampleColumnsArr[0];
                let updateValue = sampleValuesArr[0];
                let col;
                const columns = Object.keys(sampleData);
                for (let i = 0; i < columns.length; i++) {
                    col = columns[i];
                    if (!primaryKeysObject[col] && !foreignKeysObj[col]) {
                        updateColumn = col;
                        updateValue = unchangedSample[col];
                        break;
                    }
                }
                const updateQuery = `UPDATE ${tableInfo.tableName} SET ${updateColumn} = $1 WHERE ${pkArray[pkArray.length - 1]} = $2`;
                if (updateColumn && updateValue) {
                    const updatePlan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,FORMAT JSON) ${updateQuery}`, [updateValue, unchangedSample[pkArray[pkArray.length - 1]]]);
                    executionPlans[tableName].UPDATE = { query: updateQuery, plan: updatePlan };
                }
                else {
                    executionPlans[tableName].UPDATE = { query: `Table ${tableName} has no rows` };
                }
                //done with update
            }
            res.locals.executionPlans = executionPlans;
            return next();
        }
        catch (error) {
            //Rollback if an error is caught
            // await db.query('ROLLBACK');
            return next({
                log: `ERROR caught in generalMetricsController.performGenericQueries: ${error}`,
                status: 400,
                message: 'ERROR: error has occurred in generalMetricsController.performGenericQueries',
            });
        }
    }
};
export default dbGenericQueryTesting;
/*//UPDATe Test
        //we want to update the sample row by changing only the non constrained column values
        const columns = Object.keys(sampleData);
        let updateColumn;
        let updateValue;
        let col;
        for(let i = 0; i < columns.length; i++){
          col = columns[i];
          if(!primaryKeysObject[col] && !foreignKeysObj[col] && !checkContraintObj[col]){
            updateColumn = col;
            updateValue = sampleData[col];
          }
        }
        for(const column of Object.keys(unchangedSample)){
          if(!primaryKeysObject[column] && !foreignKeysObj[column]){
            updateColumn = column;
            updateValue = unchangedSample[column];
            break;
          }
        }
        const updateQuery = `UPDATE ${tableInfo.tableName} SET ${updateColumn} = $1 WHERE ${pkArray[pkArray.length - 1]} = $2`;
        const updatePlan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,FORMAT JSON) ${updateQuery}`, [updateValue, unchangedSample[pkArray[pkArray.length - 1]]]);
        executionPlans[tableName].UPDATE = { query: updateQuery, plan: updatePlan };
        //UPDATE TESTING

        // if(up)
      //   // const updateQuery = `UPDATE ${tableName} SET "${updateColumn}" = '${String(updateValue)}' WHERE "${updateColumn}" = '${String(updateValue)}'`;
       
      //   const updateQuery = `UPDATE ${tableName} SET '${updateColumn}' = ${updateValue} WHERE '${updateColumn}' = ${updateValue}`;
      //   const updatePlan = await db.query(
      //     `EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,FORMAT JSON) ${updateQuery}`,
      //     [String(updateValue), String(updateValue)]
      //   );
      //   executionPlans[tableName].UPDATE = { query: updateQuery, plan: updatePlan };
      //   //done with update
      }

      //SELECT TESTING
      // const selectColumn = */ 
