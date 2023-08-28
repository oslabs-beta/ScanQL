import { RequestHandler } from 'express';
import { QueryResult } from 'pg';

type DbSizeMetrics = {
  tableNames: string[];
  totalDatabaseSize: string;
  tableSizes: { [table: string]: {  diskSize: string; rowSize: string } };
  allIndexSizes: { [indexName: string]: string };
  indexSizesByTable: { [tableName: string]: { [indexName: string]: string } };
  freeSpace: string; // This is a bit trickier; it generally requires OS-level commands or access to pg_settings
  logSize: string;
  activeConnections: number;
};
type DbPerformanceMetrics = {
    avgQueryResponseTime: string;
    queriesPerSecond: number;
    slowestQueries: { query: string, executionTime: string }[];
    cacheHitRate: number;
  };
type DbOverviewController = {
  dbSizeMetrics: RequestHandler;
//   dbPerformanceMetrics: RequestHandler;
};

const dbOverviewController: DbOverviewController = {
  dbSizeMetrics: async (req, res, next): Promise<void> => {
    const db = res.locals.dbConnection;
   


    try {
        
      const tablesArr: QueryResult = await db.query(`
        SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'
   `);
      // console.log('tables array', tablesArr.rows);

      const tables: QueryResult = await db.query(
        'SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != \'pg_catalog\' AND schemaname != \'information_schema\';'
      );
      //array of table names to use in generic metrics function
      const tableNames = tables.rows.map(obj => obj.tablename);
      // console.log('tableNames', tableNames);
      // const tableNames: string[] = res.locals.tableNames; // Assuming you have the table names in dbInfo
      // Check if we have at least one table to work with

      // Total database size
      const totalSizeQuery: QueryResult = await db.query(
        'SELECT pg_size_pretty(pg_database_size(current_database())) as size;'
      );
      const totalDatabaseSize = totalSizeQuery.rows[0].size;

      //   //Find the Schema name 
      //   const schemaNameRes: QueryResult = await db.query(`SELECT nspname 
      //   FROM pg_namespace 
      //   WHERE nspname NOT LIKE 'pg_%' 
      //   AND nspname != 'information_schema';`);
      
      //   console.log('here are the schemas', schemaNameRes);


      const tableSizes: { [key: string]: { diskSize: string, rowSize: string } } = {};

      for (const table of tableNames) {
        const sizeQuery: QueryResult = await db.query(
          `SELECT pg_size_pretty(pg_total_relation_size('${table}')) as diskSize,
             pg_size_pretty(pg_relation_size('${table}')) as rowSize`
        );
      
        // console.log('table size results', sizeQuery);
      
        if (sizeQuery.rows && sizeQuery.rows[0]) {
          tableSizes[table] = {
            diskSize: sizeQuery.rows[0].disksize,
            rowSize: sizeQuery.rows[0].rowsize,
          };
        }
      }
      
      // console.log('here are the table sizes', tableSizes);
      // Size of each index
      const indexSizeResults : QueryResult = await db.query(`
        SELECT 
        indexrelname AS indexname,
        pg_size_pretty(pg_total_relation_size(indexrelid::regclass)) AS index_size
        FROM 
        pg_stat_all_indexes
        JOIN 
        pg_class ON pg_class.oid = pg_stat_all_indexes.indexrelid
        WHERE 
        schemaname = 'public';  -- adjust for your schema if different
        `); //we will need to generalize publ

      // console.log('this is the index size from me', indexSizeResults);


      //size of each index for each table
      // Size of each index
      const indexSizesRes = await Promise.all(
        tableNames.map(async (table) => {

          const sizeQuery: QueryResult = await db.query(`SELECT indexname, pg_size_pretty(pg_relation_size(indexname::regclass)) as size
          FROM pg_indexes
          WHERE tablename = $1;`, [table]
          );
          const indexes = sizeQuery.rows.reduce((acc: any, curr: any) => {
            acc[curr.indexname] = curr.size;
            return acc;
          }, {});
          return {
            [table]: indexes,
          };
        }));
      const indexSizesByTable = Object.assign({}, ...indexSizesRes);
      // console.log('index sizes fancy',indexSizesByTable );
      // Convert results into a key-value pair object
      const allIndexSizes: { [indexName: string]: string } = {};
      for (const row of indexSizeResults.rows) {
        allIndexSizes[row.indexname] = row.index_size;
      }

      // console.log(allIndexSizes);
      /////////////////////////////////////////////////////////////


      // Log file size
      const logSizeQuery: QueryResult = await db.query(
        'SELECT pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), \'0/0\'::pg_lsn) * 8192) AS wal_size;'
      );
      const logSize = logSizeQuery.rows[0].wal_size;
      // console.log('log siz results', logSizeQuery);

      //current active connections 
      const dbNameRes: QueryResult = await db.query('SELECT current_database()');

      const dbName: string = dbNameRes.rows[0].current_database;
      const activeConnectionsRes: QueryResult = await db.query(`
            SELECT COUNT(*) 
            FROM pg_stat_activity 
            WHERE datname = $1;
          `, [dbName]);
      const activeConnections: number = activeConnectionsRes.rows[0].count;
      
      // Building the result object
      const dbSizeMetrics: DbSizeMetrics = {
        tableNames,
        totalDatabaseSize,
        tableSizes,
        allIndexSizes,
        indexSizesByTable,
        freeSpace: 'To be determined (Requires OS-level command or access to pg_settings)',
        logSize,
        activeConnections
      };

      res.locals.dbSizeMetrics = dbSizeMetrics;
      // console.log('dbSizeMetrics', dbSizeMetrics);
      return next();
    } catch (error) {
      return next(error);
    }
  },
  /*
  dbPerformanceMetrics: async (req, res, next): Promise<void> => {
    const db = res.locals.dbConnection;

    try {
      // 1. Average query response time
      const avgQueryResponseTimeRes: QueryResult = await db.query(
        `SELECT avg(total_exec_time) AS avg_exec_time 
         FROM pg_stat_statements;`
      );
      const avgQueryResponseTime = avgQueryResponseTimeRes.rows[0].avg_exec_time;

      // 2. Number of queries executed per second (you might need to track this over time)
    //   const versionResult: QueryResult = await db.query('SHOW server_version_num;');
    //   const versionNumber = parseInt(versionResult.rows[0].server_version_num, 10);
      
    //   let queryStr = '';
      
    //   if (versionNumber < 100000) {
    //     // For PostgreSQL versions earlier than 10
    //     queryStr = 'SELECT ... , stats_reset, ... FROM pg_stat_database ...';
    //   } else {
    //     // For PostgreSQL versions 10 and later
    //     queryStr = 'SELECT ... , stats_io_reset, ... FROM pg_stat_database ...';
    //   }
      
      const result: QueryResult = await db.query(queryStr);
      const queriesPerSecond = result.rows[0].qps;
      ///tracking over time

      const overTime: QueryResult = await db.query(`
            SELECT 
                capture_time,
                SUM(calls) as total_queries,
                AVG(total_time/calls) as average_query_time,
                SUM(calls) / EXTRACT(EPOCH FROM (MAX(capture_time) - MIN(capture_time))) as queries_per_second
            FROM query_metrics
            GROUP BY capture_time
            ORDER BY capture_time DESC
        `);
        console.log('overTime.rows' ,overTime);
      // 3. Slowest queries and their execution times
      const slowestQueriesRes: QueryResult = await db.query(
        `SELECT query, total_exec_time / calls AS avg_exec_time 
         FROM pg_stat_statements 
         ORDER BY avg_exec_time DESC 
         LIMIT 5;`
      );
      const slowestQueries = slowestQueriesRes.rows.map(row => ({
        query: row.query,
        executionTime: row.avg_exec_time,
      }));

      // 4. Cache hit rate
      const cacheHitRateRes: QueryResult = await db.query(
        `SELECT 
           sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) as rate 
         FROM pg_statio_user_tables;`
      );
      const cacheHitRate = cacheHitRateRes.rows[0].rate;

      const dbPerformanceMetrics: DbPerformanceMetrics = {
        avgQueryResponseTime,
        queriesPerSecond,
        slowestQueries,
        cacheHitRate,
      };

      res.locals.dbPerformanceMetrics = dbPerformanceMetrics;
      console.log('dbPerformanceMetrics', dbPerformanceMetrics);
      return next();

    } catch (error) {
      return next(error);
    }
  },
  */
};

export default dbOverviewController;