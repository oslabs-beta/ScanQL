import { RequestHandler } from 'express';
import { QueryResult } from 'pg';

type DBHistoryMetrics = {
//   slowestTotalQueries: SlowestTotalQueries;  // The question were answering is: Among the most common queries run on the database which are the slowest and how slow are they?
//   slowestCommonQueries: SlowestCommonQueries;
//   overAllQueryAggregates: OverAllQueryAggregates;
slowestTotalQueries: SlowestTotalMedianMean,
slowestCommonQueries: SlowestCommonMedianMean,
execTimesByOperation: ExecTimeByOperation

};

type ExecTimeByOperation = {
  [operation: string] :  {
    query: string;
    operation: string;
    median_exec_time: number;
    mean_exec_time: number;
    stdev_exec_time:number;
    min_exec_time: number;
    max_exec_time: number;
    execution_count: number;

  }
}
type SlowestTotalQueryInfo = {
    query: string;
    operation: string;
    median_exec_time: number;
    mean_exec_time: number;
    min_exec_time: number;
    max_exec_time: number;
};
type SlowestCommonQueryInfo = {
    query: string;
    operation: string;
    median_exec_time: number;
    mean_exec_time: number;
    min_exec_time: number;
    max_exec_time: number;
    execution_count: number;
};
type SlowestTotalMedianMean = {
    [query: string]: {
        query:string;
        median: number;
        mean: number;
    };
};
type SlowestCommonMedianMean = {
    [query: string]: {
        query:string;
        median: number;
        mean: number;
        count: number;
    };
};
// type SlowestTotalQueries = {
//     [query: string]: SlowestTotalQueryInfo ;
//   };
  
// type SlowestCommonQueries = {
//     [query: string]: {operationType: string, avgExecTime: number, medianexectime: number};
// };
// type OverAllQueryAggregates = {
//     [query: string]: {operationType: string, avgExecTime: number, medianexectime: number};
//   };


type DBHistoryController = {
  dbPastMetrics: RequestHandler;
};

const dBHistoryController: DBHistoryController = {
  dbPastMetrics: async (_req, res, next) => {
    try {
      const db = res.locals.dbConnection;
            
      const slowestTotalQueriesString: QueryResult = await db.query(`
        SELECT 
            query,
            CASE 
            WHEN UPPER(LEFT(TRIM(query), 6)) = 'SELECT' THEN 'SELECT'
            WHEN UPPER(LEFT(TRIM(query), 6)) = 'UPDATE' THEN 'UPDATE'
            WHEN UPPER(LEFT(TRIM(query), 6)) = 'INSERT' THEN 'INSERT'
            WHEN UPPER(LEFT(TRIM(query), 6)) = 'DELETE' THEN 'DELETE'
            ELSE 'OTHER'
            END AS operation,
                PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_exec_time) AS median_exec_time,
                AVG(mean_exec_time) AS mean_exec_time,
                STDDEV(total_exec_time) AS stdev_exec_time,
                MIN(total_exec_time) AS min_exec_time,
                MAX(total_exec_time) AS max_exec_time
        FROM 
            pg_stat_statements
        GROUP BY 
            query 
        ORDER BY 
          mean_exec_time DESC
        LIMIT 10;   `);
      // console.log('slowestTotalQueriesString array', slowestTotalQueriesString.rows);
      const slowestTotalQueriesResults: SlowestTotalQueryInfo[] = [...slowestTotalQueriesString.rows]; //copy of array
    
      const totalQueries: SlowestTotalMedianMean = {}; 
      slowestTotalQueriesResults.forEach((slowQuery: SlowestTotalQueryInfo, index) => {
        if(slowQuery.operation !== 'OTHER'){
          totalQueries[`${slowQuery.operation} Query ${index + 1}`] = {
            query: slowQuery.query,
            median: slowQuery.median_exec_time,
            mean: slowQuery.mean_exec_time,
          };
        }
      });
      console.log('this is totalQueriestop10', slowestTotalQueriesString.rows)

      //   res.locals.totalQueries = totalQueries;
      const slowestCommonQueriesString: QueryResult = await db.query(`
        SELECT 
        query,
        CASE 
            WHEN UPPER(LEFT(TRIM(query), 6)) = 'SELECT' THEN 'SELECT'
            WHEN UPPER(LEFT(TRIM(query), 6)) = 'UPDATE' THEN 'UPDATE'
            WHEN UPPER(LEFT(TRIM(query), 6)) = 'INSERT' THEN 'INSERT'
            WHEN UPPER(LEFT(TRIM(query), 6)) = 'DELETE' THEN 'DELETE'
            ELSE 'OTHER'
            END AS operation,
            PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_exec_time) AS median_exec_time,
            AVG(mean_exec_time) AS mean_exec_time,
            MIN(total_exec_time) AS min_exec_time,
            MAX(total_exec_time) AS max_exec_time,
            COUNT(*) AS execution_count 
        FROM 
            pg_stat_statements
        GROUP BY 
            query
        ORDER BY 
            execution_count DESC
        LIMIT 10;`      );
        
      // console.log('slowestCommonQueriesString array', slowestCommonQueriesString.rows);

      const slowestCommonQueriesResults: SlowestCommonQueryInfo[] = [...slowestCommonQueriesString.rows]; //copy of array
    
      const commonQueries: SlowestCommonMedianMean = {}; 

      slowestCommonQueriesResults.forEach((slowQuery: SlowestCommonQueryInfo, index) => {
        if(slowQuery.operation !== 'OTHER'){
          commonQueries[`${slowQuery.operation} Query ${index + 1}`] = {
            query: slowQuery.query,
            median: slowQuery.median_exec_time,
            mean: slowQuery.mean_exec_time,
            count: slowQuery.execution_count,
          };
        }
      });
      //   res.locals.slowestCommonQueriesString = commonQueries;
      
      const overAllQueryAggregatesString: QueryResult = await db.query(`
      WITH operations_cte AS (
        SELECT unnest(ARRAY['SELECT', 'UPDATE', 'INSERT', 'DELETE']) AS operation
    )
    SELECT 
        operations_cte.operation,
        COALESCE(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_exec_time), 0) AS median_exec_time,
        COALESCE(AVG(mean_exec_time), 0) AS mean_exec_time,
        COALESCE(MIN(total_exec_time), 0) AS min_exec_time,
        COALESCE(MAX(total_exec_time), 0) AS max_exec_time,
        COALESCE(SUM(CASE 
                        WHEN UPPER(LEFT(TRIM(pg_stat_statements.query), 6)) = 'SELECT' THEN 1
                        WHEN UPPER(LEFT(TRIM(pg_stat_statements.query), 6)) = 'UPDATE' THEN 1
                        WHEN UPPER(LEFT(TRIM(pg_stat_statements.query), 6)) = 'INSERT' THEN 1
                        WHEN UPPER(LEFT(TRIM(pg_stat_statements.query), 6)) = 'DELETE' THEN 1
                        ELSE 0
                    END), 0) AS execution_count
    FROM 
        operations_cte
    LEFT JOIN 
        pg_stat_statements ON operations_cte.operation = 
            CASE 
                WHEN UPPER(LEFT(TRIM(pg_stat_statements.query), 6)) = 'SELECT' THEN 'SELECT'
                WHEN UPPER(LEFT(TRIM(pg_stat_statements.query), 6)) = 'UPDATE' THEN 'UPDATE'
                WHEN UPPER(LEFT(TRIM(pg_stat_statements.query), 6)) = 'INSERT' THEN 'INSERT'
                WHEN UPPER(LEFT(TRIM(pg_stat_statements.query), 6)) = 'DELETE' THEN 'DELETE'
                ELSE 'OTHER'
            END
    GROUP BY 
        operations_cte.operation
    ORDER BY 
        mean_exec_time DESC
    LIMIT 10;    
        `);
      //Create NA and  0 for no operation
      const operationArr: [string, string, string, string] = ['INSERT', 'SELECT', 'UPDATE', 'DELETE'];

      const overAllQueryAggregates:ExecTimeByOperation = {} ;

      operationArr.forEach((operation) => {
        const row = overAllQueryAggregatesString.rows.find((row) => row.operation === operation);
        if (row) {
          overAllQueryAggregates[operation] = row;
        } else {
          overAllQueryAggregates[operation] = {
            query:'N/A',
            operation: operation,
            median_exec_time: -1,
            mean_exec_time: -1,
            stdev_exec_time: -1,
            min_exec_time: -1,
            max_exec_time: -1,
            execution_count: 0,
          };
        }
      });
      // console.log('overAllQueryAggregatesString array', overAllQueryAggregates);
      //   res.locals.overAllQueries = overAllQueryAggregatesString.rows;

      // // Building the result object
      const dbHistMetrics: DBHistoryMetrics = {
        slowestTotalQueries: totalQueries,
        slowestCommonQueries: commonQueries,
        execTimesByOperation: overAllQueryAggregates,
      };

      res.locals.dbHistMetrics = dbHistMetrics;

      return next();
    } catch (error) {
      return next(error);
    }
  },

};

export default dBHistoryController;