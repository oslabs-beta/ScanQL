import { RequestHandler } from 'express';
import { Pool, QueryResult } from 'pg';

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


    try {

      
      // 1. Get List of Tables in the database
  
      // const tableNames = await db.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';");
      

      
      // 2. Select a Sample Table
      const sampleTable = tableNames.rows[0].tablename;
      
      // 3. 




      // const firstFiveRows = await db.query(`SELECT * FROM ${sampleTable} LIMIT 5;`);
      // const lastFiveRows = await db.query(`SELECT * FROM ${sampleTable} ORDER BY ctid DESC LIMIT 5;`);
      // // ... (other queries based on this sampleTable)
      
      // 4. Collect and Send the Results
      res.locals.result = {
        countRows: countRows.rows,
        firstFiveRows: firstFiveRows.rows,
        lastFiveRows: lastFiveRows.rows,
        // ... (other results)
      };
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


const getMetrics = async (req: Request, res: Response): Promise<void> => {
  // Retrieve start and end times from request parameters or body
  const startTime = req.query.startTime || req.body.startTime;
  const endTime = req.query.endTime || req.body.endTime;

  // Define your prebuilt query
  const queryString = 'SELECT * FROM your_table WHERE created_at BETWEEN $1 AND $2';

  try {
    // Perform EXPLAIN analysis on the prebuilt query
    const explainQuery = `EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${queryString}`;
    const explainResult = await pool.query(explainQuery, [startTime, endTime]);
    
    // Actual execution of the query
    const queryResult = await pool.query(queryString, [startTime, endTime]);

    // Construct the response
    res.status(200).json({
      explainResult: explainResult.rows,
      queryResult: queryResult.rows,
    });
  } catch (error) {
    console.error('ERROR fetching data: ', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

// Export the object containing the functions
export const databaseController = {
  getMetrics,
  // ... more functions for different endpoints
};


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
            "Actual Startup Time": 0.010,
            "Actual Total Time": 0.015,
            "Actual Rows": 3,
            "Actual Loops": 1,
            "Filter": "(age > 25)",
            "Rows Removed by Filter": 2,
            "Shared Hit Blocks": 15,
            "Shared Read Blocks": 0,
            "Shared Dirtied Blocks": 0,
            "Shared Written Blocks": 0,
            ...
        },
        "Planning Time": 0.050,
        "Execution Time": 0.100,
        "Settings": {
            "work_mem": "4096",
            "effective_cache_size": "524288",
            ...
        },
        ...
    }
]

*?