import { RequestHandler, query } from 'express';
// import { explainQuery } from '../helpers/explainQuery';
import pkg from 'pg';
const { Pool } = pkg;
import { faker } from '@faker-js/faker';


function generateFakeData(dataType: string): any {
  switch (dataType) {
  case 'string':
    return faker.lorem.word() ;
  case 'number':
    return faker.number.bigInt();
  case 'date':
    return faker.date.past();
  case 'boolean':
    return faker.datatype.boolean();
  default:
    return faker.lorem.word() ;
  }
}
interface ForeignKey {
  column: string;
  referencedcolumn: string;
  referencedtable: string;
}
// interface ForeignKey {
//   column: string;
//   referencedTable: string;
//   referencedColumn: string;
// }

interface TableInfo {
  tableName: string;
  numberOfRows: number;
  numberOfIndexes: number;
  numberOfFields: number;
  numberOfForeignKeys: number;
  foreignKeys: ForeignKey[];
  primaryKey: string | null;
}

interface DBinfo {
  [tablename: string]: TableInfo;
}
type GeneralMetricsController = {
  analyzeCostumQuery: RequestHandler;
  performGenericQueries: RequestHandler;
};
//for insert test
async function fetchValidForeignKeyValue(db: any, fk: ForeignKey): Promise<any> {
  const validFKValues = await db.query(`SELECT ${fk.referencedcolumn} FROM ${fk.referencedtable} LIMIT 100`);
  if (validFKValues.rowCount === 0) {
    throw new Error(`No valid foreign key values found for table: ${fk.referencedtable}`);
  }
  
  const randomIndex = faker.number.int({ min: 0, max: validFKValues.rowCount - 1 });
  return validFKValues.rows[randomIndex][fk.referencedcolumn];
}

function generateValueForColumn(columnName: string, tableInfo: any, fkTable: ForeignKey[]): any {
  if (foreignKeyColumns.includes(columnName)) {
    const fk = fkTable.find(fk => fk.column === columnName);
    return fetchValidForeignKeyValue(db, fk);
  }

  const columnInfo = tableInfo.columnDataTypes.find((column: ColumnDataType) => column.column_name === columnName);
  return generateFakeData(columnInfo.data_type);
}
//
const identifyCascadeDeletes = async (dbInfo: DBinfo, tableName: string, key: any, visitedTables = new Set<string>()): Promise<string[]> => {
  if (visitedTables.has(tableName)) return [];

  visitedTables.add(tableName);
  let cascadeDeletes = [tableName];

  for (const potentialDependentTableName in dbInfo) {
    const potentialDependentTableInfo = dbInfo[potentialDependentTableName];

    for (const fk of potentialDependentTableInfo.foreignKeys) {
      if (fk.referencedtable === tableName) {
        const childDeletes = await identifyCascadeDeletes(dbInfo, potentialDependentTableName, key, visitedTables);
        cascadeDeletes = cascadeDeletes.concat(childDeletes);
      }
    }
  }

  return cascadeDeletes;
};
 
// function modifyValue(value: any): any {
//   if (typeof value === 'string') {
//     return 'string' + '_' + Math.random().toString(36).slice(0, 18);  // Appending a random 5-character string
//   } else if (typeof value === 'number') {
//     return value + Math.floor(Math.random() * 100000000);  // Adding a random number between 0 and 9
//   } else if (value instanceof Date) {
//     return new Date(value.getTime() + (Math.random() * 1000000));  // Adding a random number of milliseconds
//   } else if (typeof value === 'boolean') {
//     return !value;  // Toggle boolean
//   } else if (Array.isArray(value)) {
//     return [...value, Math.random()];  // Adding a random number to the array
//   }
//   return value;  // If datatype is not identified, return the original value
// }
const generalMetricsController: GeneralMetricsController = {
  analyzeCostumQuery: async (req, res, next) => {
    // Extract query string from request
    const queryString = req.body.query;
    
    // Establish connection to the user's database
    const uri_string = req.body.uri;
    const pool = new Pool({
      connectionString: uri_string,
    });
    const db = {
      query: (text: string, params?: Array<string>) => {
        return pool.query(text, params);
      },
    };
    
    // Run EXPLAIN on the query to get execution plan without actual execution
    try {
      const explainQuery = `EXPLAIN (FORMAT JSON) ${queryString}`;
      const result = await db.query(explainQuery);
      res.locals.result = result.rows;
      return next();
    } catch (error) {
      console.log('ERROR in generalMetricsController.analyzeQuery: ', error);
      return next({
        log: `ERROR caught in generalMetricsController.analyzeQuery: ${error}`,
        status: 400,
        message:
          'ERROR: error has occured in generalMetricsController.analyzeQuery',
      });
    }
  },
  performGenericQueries: async (req, res, next) => {
   



    const db = res.locals.dbConnection;
    const dbInfo = res.locals.databaseInfo;
    console.log('Expected dbInfo to be an array, but got:', dbInfo);
    const executionPlans = [];
    await db.query('BEGIN'); // Start the transaction
    try {
      for (const tableName in dbInfo) {

        interface ColumnDataType {
          column_name: string;
          data_type: string;
        }

        interface ForeignKey {
          column: string;
          referencedTable: string;
          referencedColumn: string;
        }
        
        const tableInfo = dbInfo[tableName];
        const { primaryKey } = tableInfo;
        const valuesOriginal = { ...tableInfo.sampleData };
        const values = { ...tableInfo.sampleData };  // Create a shallow copy of the sampleData
        const fkTable = tableInfo.foreignKeys.slice();
        console.log(fkTable,'fk table ');
        const foreignKeyColumns = fkTable.map((fk: ForeignKey) => fk.column);
    
        // delete values[primaryKey];   // remove the primary key from the values
    
        interface ForeignKey {
          column: string;
          referencedcolumn: string;
          referencedtable: string;
        }
        // Use the new functions in the loop
        for (const key in values) {
          values[key] = await generateValueForColumn(key, tableInfo, fkTable as ForeignKey[]);
        }

    
        const placeholders = Object.keys(values)
          .map((key, index) => `$${index + 1}`)
          .join(', ');
    
        let query = `INSERT INTO ${tableInfo.tableName} (${Object.keys(values).join(', ')}) VALUES (${placeholders})`;
    
        let plan = await db.query(`EXPLAIN (ANALYZE true, SUMMARY true, FORMAT JSON) ${query}`, Object.values(values));
        executionPlans.push({ query, plan });

        
  
        // SELECT test
        query = `SELECT * FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = $1`;
        plan = await db.query(`EXPLAIN (ANALYZE true, SUMMARY true, FORMAT JSON) ${query}`, [values[tableInfo.primaryKey]]);
        executionPlans.push({ query, plan });
  


        // UPDATE test
        const nonConstraintColumns = tableInfo.columnDataTypes.filter((col: ColumnDataType) => col.column_name !== tableInfo.primaryKey && !tableInfo.foreignKeys.some((fk: ForeignKey) => fk.column === col.column_name));
        if (nonConstraintColumns.length > 0) {
          const firstNonConstraintColumn = nonConstraintColumns[0].column_name;
          query = `UPDATE ${tableInfo.tableName} SET ${firstNonConstraintColumn} = $1 WHERE ${tableInfo.primaryKey} = $2`;
          plan = await db.query(`EXPLAIN (ANALYZE true, SUMMARY true, FORMAT JSON) ${query}`, [values[firstNonConstraintColumn], values[tableInfo.primaryKey]]);
          executionPlans.push({ query, plan });
        }
  
        // DELETE test
        // First check and delete any dependent rows. This is a basic approach, you might need to extend this for deep nested dependencies.
        // for (const fk of tableInfo.foreignKeys) {
        //   query = `DELETE FROM ${fk.referencedTable} WHERE ${fk.referencedColumn} = $1`;
        //   await db.query(query, [values[fk.column]]);
        // }
        // for (const fk of tableInfo.foreignKeys) {
        //   console.log(fk); // This will log the foreign key object
        //   query = `DELETE FROM ${fk.referencedTable} WHERE ${fk.referencedColumn} = $1`;
        //   await db.query(query, [values[fk.column]]);
        // }
        // Check if there are foreign key constraints on the table.
        // if (tableInfo.foreignKeys && tableInfo.foreignKeys.length > 0) {
        //   console.log(`Table ${tableInfo.tableName} has ${tableInfo.foreignKeys.length} foreign key constraints.`);
        //   // You can also push a custom message to the executionPlans to inform the user.
        //   executionPlans.push({ query: `DELETE FROM ${tableInfo.tableName}`, plan: `Skipped due to ${tableInfo.foreignKeys.length} foreign key constraints.` });
        // } else {
        //   console.log(`Table ${tableInfo.tableName} has ${tableInfo.foreignKeys.length} foreign key constraints.`);
        //   query = `DELETE FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = $1`;
        //   plan = await db.query(`EXPLAIN (ANALYZE true, SUMMARY true, FORMAT JSON) ${query}`, [valuesOriginal[tableInfo.primaryKey]]);
        //   executionPlans.push({ query, plan });
        // }
        // This function will recursively identify all tables that could be affected 
        // by a DELETE operation starting from a given table.

        const tablesToCascadeDelete = await identifyCascadeDeletes(dbInfo, tableInfo.tableName, valuesOriginal[tableInfo.primaryKey]);

        // Inform the user about potential cascading deletes:
        executionPlans.push({ 
          query: `DELETE FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = ${valuesOriginal[tableInfo.primaryKey]}`, 
          plan: `This will also affect tables: ${tablesToCascadeDelete.join(', ')} due to foreign key constraints.` 
        });


        // // Step 2: Now delete the desired row from the current table.
        // query = `DELETE FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = $1`;
        // plan = await db.query(`EXPLAIN (ANALYZE true, SUMMARY true, FORMAT JSON) ${query}`, [valuesOriginal[tableInfo.primaryKey]]);
        // executionPlans.push({ query, plan });


        // // JOIN test
        // if (tableInfo.numberOfForeignKeys > 0) {
        //   for (const fk of tableInfo.foreignKeys) {
        //     query = `DELETE FROM ${fk.referencedtable} WHERE ${fk.referencedcolumn} = $1`;
        //     plan = await db.query(`EXPLAIN (ANALYZE true, SUMMARY true, FORMAT JSON) ${query}`, [valuesOriginal[fk.column]]);
        //     executionPlans.push({ query, plan });
        //   }
        // }
      }
      await db.query('ROLLBACK'); // Roll back the transaction, undoing all changes
      res.locals.executionPlans = executionPlans;
      return next();
    } catch (error) {
      // console.log(insertQuery);
      console.log('ERROR in generalMetricsController.performGenericQueries: ', error);
      return next({
        log: `ERROR caught in generalMetricsController.performGenericQueries: ${error}`,
        status: 400,
        message: 'ERROR: error has occurred in generalMetricsController.performGenericQueries',
      });
    }
  }
  
  
};

export default generalMetricsController;



/* 
The provided query is using the EXPLAIN command of PostgreSQL to obtain execution plan details for the SQL statement contained in the queryString variable.


Let's break down the components:

EXPLAIN: This command is used to display the execution plan of a statement, showing how the database would process the statement ---> ** without actually executing it **  <----

The options provided within the parentheses provide additional details about the execution:

ANALYZE true: Executes the query, providing real-time statistics about the execution. This helps in understanding the actual time taken for various operations.

COSTS true: Shows the estimated startup and total cost for each plan node, both in units of disk page fetches.

SETTINGS true: Displays any modified settings that might affect the plan.

BUFFERS true: Provides details about buffer usage if ANALYZE is also enabled. This can show how many times data was read from disk versus from cache.

WAL true: Displays WAL (Write-Ahead Logging) usage statistics of the executed query.

SUMMARY true: Adds an additional "Planning Time" and "Execution Time" to the output, making it easier to see how long both planning and execution took.

FORMAT JSON: This changes the output format to JSON, which can be easier for programs to parse. By default, the output is in text format.

${queryString}: This is where the actual SQL statement (that you want to analyze) is appended. By using the + operator, you are concatenating the EXPLAIN command with the actual SQL statement.

When executed, this query will return a detailed execution plan of the SQL statement in queryString with all the specified details in JSON format. This is often used by database administrators and developers to optimize and troubleshoot SQL queries by understanding how they are executed under-the-hood by the database engine.


*/

//Example Result:

/*
[
    {
        "Plan": {
            "Node Type": "Seq Scan",
            "Relation Name": "users",
            "Alias": "users",
            "Startup Cost": 0.00,
            "Total Cost": 23.20,
            "Plan Rows": 5,
            "Plan Width": 72,
            "Actual Startup Time": 0.010, //Actual Startup Time: The time it took before the first row could be returned, in milliseconds.
            "Actual Total Time": 0.015, //Actual Total Time: The time it took to return all rows, in milliseconds.
            "Actual Rows": 3,
            "Actual Loops": 1,
            "Filter": "(age > 25)",
            "Rows Removed by Filter": 2,
            "Shared Hit Blocks": 15, //Shared Hit Blocks: The number of buffer hits in shared block cache.
            "Shared Read Blocks": 0, //Shared Read Blocks: The number of disk blocks read in shared block cache.
            "Shared Dirtied Blocks": 0,
            "Shared Written Blocks": 0,
            ...
        },
        "Planning Time": 0.050, //Planning Time: The time it took for the query planner to devise this plan, in milliseconds.
        "Execution Time": 0.100, //Execution Time: The total time it took to run the query, in milliseconds, from start to finish, including both planning and execution.
        "Settings": { //Settings: The configuration parameters that were in effect for this query.
            "work_mem": "4096",
            "effective_cache_size": "524288",
            ...
        },
        ...
    }
]

//we will have the data as so with query too
[
  {
    "query": "INSERT INTO orders VALUES (...)",
    "plan": { ... }
  },
  {
    "query": "SELECT * FROM orders WHERE order_id = ...",
    "plan": { ... }
  },
  {
    "query": "UPDATE orders SET ... WHERE order_id = ...",
    "plan": { ... }
  },
  {
    "query": "DELETE FROM orders WHERE order_id = ...",
    "plan": { ... }
  },
  ...
]

*/

// const values = tableInfo.sampleData;
// const placeholders = Object.keys(values).map((key, index) => `$${index + 1}`).join(', ');
        
// let query = `INSERT INTO ${tableInfo.tableName} (${Object.keys(values).join(', ')}) VALUES (${placeholders})`;
// let plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`, Object.values(values));
// executionPlans.push({ query, plan });
          
// // SELECT test
// query = `SELECT * FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = $1`;
// // randomize the filter so that it selects a random yet valid value for primary key
// plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`, [values[tableInfo.primaryKey]]);
// executionPlans.push({ query, plan });
          
// // UPDATE test
// const firstColumn = tableInfo.columnDataTypes[0].column_name;
// query = `UPDATE ${tableInfo.tableName} SET ${firstColumn} = $1 WHERE ${tableInfo.primaryKey} = $2`;
// plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`, [values[firstColumn], values[tableInfo.primaryKey]]);
// executionPlans.push({ query, plan });
          
// // DELETE test
// query = `DELETE FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = $1`;
// plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`, [values[tableInfo.primaryKey]]);
// executionPlans.push({ query, plan });
          
// // JOIN test (if there are foreign keys)
// if (tableInfo.numberOfForeignKeys > 0) {
//   for (const fk of tableInfo.foreignKeys) {
//     query = `SELECT * FROM ${tableInfo.tableName} JOIN ${fk.referencedTable} ON ${tableInfo.tableName}.${fk.column} = ${fk.referencedTable}.${fk.referencedColumn}`;
//     plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`);
//     executionPlans.push({ query, plan });
//   }
// }
// }

// performGenericQueries: async (req, res, next) => {
    
//   const db = res.locals.dbConnection;
//   const dbInfo = res.locals.databaseInfo;
//   const executionPlans: any[] = [];

//   try {
//     for (const tableInfo of dbInfo) {
//       // INSERT test with ON CONFLICT DO NOTHING to avoid unique constraint violations
//       const values = tableInfo.sampleData;
//       const placeholders = Object.keys(values).map((key, index) => `$${index + 1}`).join(', ');
//       let query = `INSERT INTO ${tableInfo.tableName} (${Object.keys(values).join(', ')}) VALUES (${placeholders}) ON CONFLICT (${tableInfo.primaryKey}) DO NOTHING`;
//       let plan = await db.query(`EXPLAIN ${query}`, Object.values(values));
//       executionPlans.push({ query, plan });

//       // SELECT test
//       query = `SELECT * FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = $1`;
//       plan = await db.query(`EXPLAIN ${query}`, [values[tableInfo.primaryKey]]);
//       executionPlans.push({ query, plan });

//       // UPDATE test
//       // Assuming the first column isn't a primary or unique key; otherwise, this will violate constraints.
//       const firstColumn = tableInfo.columnDataTypes[0].column_name;
//       query = `UPDATE ${tableInfo.tableName} SET ${firstColumn} = $1 WHERE ${tableInfo.primaryKey} = $2`;
//       plan = await db.query(`EXPLAIN ${query}`, [values[firstColumn], values[tableInfo.primaryKey]]);
//       executionPlans.push({ query, plan });

//       // DELETE test
//       // To handle foreign key constraints on DELETE, either:
//       // a) Delete dependent rows first or
//       // b) Ensure the DB has ON DELETE CASCADE for the foreign key or
//       // c) Use a DELETE that is sure not to violate the constraint.
//       query = `DELETE FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = $1`;
//       plan = await db.query(`EXPLAIN ${query}`, [values[tableInfo.primaryKey]]);
//       executionPlans.push({ query, plan });

//       // JOIN test (if there are foreign keys)
//       if (tableInfo.numberOfForeignKeys > 0) {
//         for (const fk of tableInfo.foreignKeys) {
//           query = `SELECT * FROM ${tableInfo.tableName} JOIN ${fk.referencedTable} ON ${tableInfo.tableName}.${fk.column} = ${fk.referencedTable}.${fk.referencedColumn}`;
//           plan = await db.query(`EXPLAIN ${query}`);
//           executionPlans.push({ query, plan });
//         }
//       }
//     }
//     res.locals.executionPlans = executionPlans;
//     return next();
//   } catch (error) {
//     console.log('ERROR in generalMetricsController.performGenericQueries: ', error);
//     return next({
//       log: `ERROR caught in generalMetricsController.performGenericQueries: ${error}`,
//       status: 400,
//       message: 'ERROR: error has occurred in generalMetricsController.performGenericQueries',
//     });
//   }
// }


// INSERT test
// const tableInfo = dbInfo[tableName];
// const values = tableInfo.sampleData;
// const placeholders = Object.keys(values).map((key, index) => `$${index + 1}`).join(', ');

// let insertQuery: string;
// if (tableInfo.primaryKey && tableInfo.primaryKey.length > 0) {
//   // Check if the column used in ON CONFLICT actually has a unique constraint
//   const uniqueColumns = await getUniqueColumnsForTable(db,tableInfo.tableName); // You'd need to define this function
//   if (uniqueColumns.includes(tableInfo.primaryKey)) {
//     insertQuery = `INSERT INTO ${tableInfo.tableName} (${Object.keys(values).join(', ')}) VALUES (${placeholders}) ON CONFLICT (${tableInfo.primaryKey}) DO NOTHING`;
//   } else {
//     insertQuery = `INSERT INTO ${tableInfo.tableName} (${Object.keys(values).join(', ')}) VALUES (${placeholders})`;
//   }
// } else {
//   insertQuery = `INSERT INTO ${tableInfo.tableName} (${Object.keys(values).join(', ')}) VALUES (${placeholders})`;
// }
// console.log('table', tableName,'and keys', tableInfo.primaryKey, tableInfo.foreignKeys)
// let plan = await db.query(`EXPLAIN ${insertQuery}`, Object.values(values));
// executionPlans.push({ query: insertQuery, plan });

// interface RowResult {
//   column_name: string;
// }
// async function getUniqueColumnsForTable(db:any, tableName: string): Promise<string[]> {
//   const uniqueColumnsQuery = `
//       SELECT a.attname AS column_name
//       FROM pg_index i
//       JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
//       WHERE i.indrelid = $1::regclass AND i.indisunique
//   `;
  
  
//   try {
//     const result = await db.query(uniqueColumnsQuery, [tableName]);
//     return result.rows.map((row : RowResult)=> row.column_name);
//   } catch (err) {
//     console.error('Error fetching unique columns:', err);
//     return [];
//   }
// }