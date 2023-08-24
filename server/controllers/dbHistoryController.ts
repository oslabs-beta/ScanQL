import { RequestHandler, query } from 'express';
import { QueryResult } from 'pg';

type DBHistoryMetrics = {
//   slowestTotalQueries: SlowestTotalQueries;  // The question were answering is: Among the most common queries run on the database which are the slowest and how slow are they?
//   slowestCommonQueries: SlowestCommonQueries;
//   overAllQueryAggregates: OverAllQueryAggregates;
slowestTotalQueries: SlowestTotalMedianMean,
slowestCommonQueries: SlowestCommonMedianMean,
execTimesByOperation: ExecTimeByOperation[]

};

type ExecTimeByOperation = {
    query: string;
    operation: string;
    median_exec_time: number;
    avg_exec_time: number;
    stdev_exec_time:number;
    min_exec_time: number;
    max_exec_time: number;
}
type SlowestTotalQueryInfo = {
    query: string;
    operation: string;
    median_exec_time: number;
    avg_exec_time: number;
    min_exec_time: number;
    max_exec_time: number;
};
type SlowestCommonQueryInfo = {
    query: string;
    operation: string;
    median_exec_time: number;
    avg_exec_time: number;
    min_exec_time: number;
    max_exec_time: number;
};
type SlowestTotalMedianMean = {
    [query: string]: {
        query:string;
        median: number;
        average: number;
    };
};
type SlowestCommonMedianMean = {
    [query: string]: {
        query:string;
        median: number;
        average: number;
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
  dbPastMetrics: async (req, res, next) => {
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
                AVG(mean_exec_time) AS avg_exec_time,
                STDDEV(total_exec_time) AS stdev_exec_time,
                MIN(total_exec_time) AS min_exec_time,
                MAX(total_exec_time) AS max_exec_time
        FROM 
            pg_stat_statements
        GROUP BY 
            query
        ORDER BY 
            COUNT(*) DESC
            LIMIT 20;   `);
      console.log('slowestTotalQueriesString array', slowestTotalQueriesString.rows);
      const slowestTotalQueriesResults: SlowestTotalQueryInfo[] = [...slowestTotalQueriesString.rows]; //copy of array
    
      const totalQueries: SlowestTotalMedianMean = {}; 
      slowestTotalQueriesResults.forEach((slowQuery: SlowestTotalQueryInfo, index) => {
        if(slowQuery.operation !== 'OTHER'){
          totalQueries[`${slowQuery.operation} Query ${index + 1}`] = {
            query: slowQuery.query,
            median: slowQuery.median_exec_time,
            average: slowQuery.avg_exec_time,
          };
        }
      });

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
                AVG(mean_exec_time) AS avg_exec_time,
                MIN(total_exec_time) AS min_exec_time,
                MAX(total_exec_time) AS max_exec_time
            FROM 
                pg_stat_statements
            GROUP BY 
                query
            ORDER BY 
                avg_exec_time DESC
            LIMIT 20;`      );
    
      console.log('slowestCommonQueriesString array', slowestCommonQueriesString.rows);

      const slowestCommonQueriesResults: SlowestCommonQueryInfo[] = [...slowestCommonQueriesString.rows]; //copy of array
    
      const commonQueries: SlowestCommonMedianMean = {}; 

      slowestCommonQueriesResults.forEach((slowQuery: SlowestCommonQueryInfo, index) => {
        if(slowQuery.operation !== 'OTHER'){
          commonQueries[`${slowQuery.operation} Query ${index + 1}`] = {
            query: slowQuery.query,
            median: slowQuery.median_exec_time,
            average: slowQuery.avg_exec_time,
          };
        }
      });
      //   res.locals.slowestCommonQueriesString = commonQueries;
      
      const overAllQueryAggregatesString: QueryResult = await db.query(`
        SELECT 
            CASE 
                WHEN UPPER(LEFT(TRIM(query), 6)) = 'SELECT' THEN 'SELECT'
                WHEN UPPER(LEFT(TRIM(query), 6)) = 'UPDATE' THEN 'UPDATE'
                WHEN UPPER(LEFT(TRIM(query), 6)) = 'INSERT' THEN 'INSERT'
                WHEN UPPER(LEFT(TRIM(query), 6)) = 'DELETE' THEN 'DELETE'
                ELSE 'OTHER'
            END AS operation,
            AVG(total_exec_time) AS mean_exec_time,
            PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_exec_time) AS median_exec_time,
            STDDEV(total_exec_time) AS stdev_exec_time,
            MIN(total_exec_time) AS min_exec_time,
            MAX(total_exec_time) AS max_exec_time,
            COUNT(*) AS execution_count
        FROM 
            pg_stat_statements
        GROUP BY 
            operation
        ORDER BY 
            mean_exec_time DESC;
        `);

      console.log('overAllQueryAggregatesString array', overAllQueryAggregatesString.rows);
      //   res.locals.overAllQueries = overAllQueryAggregatesString.rows;

      // // Building the result object
      const dbHistMetrics: DBHistoryMetrics = {
        slowestTotalQueries: totalQueries,
        slowestCommonQueries: commonQueries,
        execTimesByOperation: overAllQueryAggregatesString.rows,
      };

      res.locals.dbHistMetrics = dbHistMetrics;

      return next();
    } catch (error) {
      return next(error);
    }
  },

};

export default dBHistoryController;