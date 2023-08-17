import { RequestHandler } from 'express';
import { Pool, QueryResult } from 'pg';
// import { explainQuery } from '../helpers/explainQuery';


type GeneralMetricsController = {
  analyzeCostumQuery: RequestHandler;
  performGenericQueries: RequestHandler;
};

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
    
    // pulling database connection from res locals
    const db = res.locals.dbConnection;

    const tableNames = res.locals.tableNames;
    const dbInfo = res.locals.databaseInfo; // more comprehensive info on tabls

    try {

      // Store query execution plans here
      const executionPlans: any[] = [];

      for (const tableInfo of dbInfo) {
          // INSERT test
          let values = tableInfo.sampleData;
          let placeholders = Object.keys(values).map((key, index) => `$${index + 1}`).join(', ');
          let query = `INSERT INTO ${tableInfo.tableName} (${Object.keys(values).join(', ')}) VALUES (${placeholders})`;
          let plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`, Object.values(values));
          executionPlans.push({ query, plan });
          
          // SELECT test
          query = `SELECT * FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = $1`;
          plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`, [values[tableInfo.primaryKey]]);
          executionPlans.push({ query, plan });
          
          // UPDATE test
          const firstColumn = tableInfo.columnDataTypes[0].column_name;
          query = `UPDATE ${tableInfo.tableName} SET ${firstColumn} = $1 WHERE ${tableInfo.primaryKey} = $2`;
          plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`, [values[firstColumn], values[tableInfo.primaryKey]]);
          executionPlans.push({ query, plan });
          
          // DELETE test
          query = `DELETE FROM ${tableInfo.tableName} WHERE ${tableInfo.primaryKey} = $1`;
          plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`, [values[tableInfo.primaryKey]]);
          executionPlans.push({ query, plan });
          
          // JOIN test (if there are foreign keys)
          if (tableInfo.numberOfForeignKeys > 0) {
              for (const fk of tableInfo.foreignKeys) {
                  query = `SELECT * FROM ${tableInfo.tableName} JOIN ${fk.referencedTable} ON ${tableInfo.tableName}.${fk.column} = ${fk.referencedTable}.${fk.referencedColumn}`;
                  plan = await db.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${query}`);
                  executionPlans.push({ query, plan });
              }
          }
      }
      
      res.locals.executionPlans = executionPlans;
      return next();

    } catch (error) {
      console.log('ERROR in generalMetricsController.performGenericQueries: ', error);
      return next({
        log: `ERROR caught in generalMetricsController.performGenericQueries: ${error}`,
        status: 400,
        message: 'ERROR: error has occurred in generalMetricsController.performGenericQueries',
      });
    }
  },
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