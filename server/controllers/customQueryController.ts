
import { RequestHandler } from 'express';
// import { QueryResult } from 'pg';
import pkg from 'pg';
const { Pool } = pkg;
type CustomDBController = {
  customQueryMetrics: RequestHandler;
  // queryTimeSQL: RequestHandler;
};

// type CustomMetricsObj = {
//   meanTime: number;
//   queryString: string;
//   customMetrics: {
//     planningTime: number,
//     executionTime: number,
//     totalTime: number;
//     cacheSize: number;
//     workingMem: number;
//     sharedHitBlocks: number;
//     sharedReadBlocks: number;
//   }[];
//   queryDelay: number;
//   queryCount: number;
// }


// Takes in query & URI from client and gathers query metrics using client's database
const customDBController: CustomDBController = {


  customQueryMetrics: async (req, res, next) => {
    // const { uri, queryString, queryName, queryCount, queryDelay } = req.body;
    const { uri, queryString } = req.body;
    const pool = new Pool({
      connectionString: uri,
    });

    const clientDBModel = {
      query: (text: string, params?: Array<string>) => {
        return pool.query(text, params);
      },
    };
    // Initiating new model
    //   const { Pool } = pg;
    //   const pool = new Pool({
    //     connectionString: uri
    //   });

    const queryCountDef = 10;
    const delayTimeDef = 0.5;


    // Append EXPLAIN (options...) to client's query string
    const query = 'EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON)' + `${queryString};`;

    await clientDBModel.query('BEGIN'); // Start the transaction
    const delayedTasks = [];
    const labelsArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const planningTimesArr: number[] = [];

    const executionTimesArr: number[] = [];

    const totalTimesArr: number[] = [];

    // const startupCostsArr: number[] = [];
    // const totalCostsArr: number[] = [];
    // const actualRowsArr: number[] = [];
    // const actualLoopsArr: number[] = [];

    // const totalTimesArrFromPG : number[] = [];

    try {
      for (let i = 0; i < queryCountDef; i++) {
        const data = await clientDBModel.query(query);
        const parsedData = data.rows;
        const planningTime = parsedData[0]['QUERY PLAN'][0]['Planning Time'];
        const executionTime = parsedData[0]['QUERY PLAN'][0]['Execution Time'];
        const totalTime = Number((planningTime + executionTime).toFixed(2));
        const cacheSize = parsedData[0]['QUERY PLAN'][0]['Settings']['effective_cache_size'];
        const workingMem = parsedData[0]['QUERY PLAN'][0]['Settings']['work_mem'];
        const sharedHitBlocks = parsedData[0]['QUERY PLAN'][0]['Plan']['Shared Hit Blocks'];
        const sharedReadBlocks = parsedData[0]['QUERY PLAN'][0]['Plan']['Shared Read Blocks'];
        const nodeType = parsedData[0]['QUERY PLAN'][0]['Plan']['Node Type']
        const actualRows = parsedData[0]['QUERY PLAN'][0]['Plan']['Actual Rows']
        const actualLoops = parsedData[0]['QUERY PLAN'][0]['Plan']['Actual Loops']
        const totalCosts = parsedData[0]['QUERY PLAN'][0]['Plan']['Total Cost']
        const startUpCosts = parsedData[0]['QUERY PLAN'][0]['Plan']['Startup Cost']
        // actualRowsArr.push(actualRows);
        // actualLoopsArr.push(actualLoops);
        // totalCostsArr.push(totalCosts);
        // startupCostsArr.push(startUpCosts);
        planningTimesArr.push(planningTime);
        executionTimesArr.push(executionTime);
        totalTimesArr.push(totalTime);
        delayedTasks.push({
          nodeType, planningTime, executionTime, totalTime, cacheSize, workingMem, sharedHitBlocks, sharedReadBlocks, startUpCosts, totalCosts, actualRows, actualLoops
        });

        // Wait for the desired delay time before running the next iteration.
        await new Promise(resolve => setTimeout(resolve, delayTimeDef * 1000));
      }
      await clientDBModel.query('ROLLBACK');
      /*
      const delayedTasks = await Promise.all(
        Array.from({ length: queryCountDef }, (_, i) => i).map(async (i) => {
          await new Promise((resolve) => setTimeout(resolve, i * (delayTimeDef * 1000))); //1 sec
          const data: QueryResult = await clientDBModel.query(query);
          const parsedData = data.rows;
        //   const planningTime = parsedData[0]['QUERY PLAN'][0]['Planning Time'];
        //   const executionTime = parsedData[0]['QUERY PLAN'][0]['Execution Time'];
        //   const totalTime = Number((planningTime + executionTime).toFixed(2));
        //   const cacheSize = parsedData[0]['QUERY PLAN'][0]['Settings']['effective_cache_size'];
        //   const workingMem = parsedData[0]['QUERY PLAN'][0]['Settings']['work_mem'];
        //   const sharedHitBlocks = parsedData[0]['QUERY PLAN'][0]['Planning']['Shared Hit Blocks'];
        //   const sharedReadBlocks = parsedData[0]['QUERY PLAN'][0]['Planning']['Shared Read Blocks'];
          return {
            // planningTime, executionTime, totalTime, cacheSize ,workingMem, sharedHitBlocks, sharedReadBlocks
            ...parsedData
          };
        })
      );*/
      //   await clientDBModel.query.query('ROLLBACK'); 
      const meanTotalTime = Number(delayedTasks.reduce((acc, obj) => acc + obj.totalTime, 0) / queryCountDef).toFixed(2);
      const meanPlanningTime = Number(delayedTasks.reduce((acc, obj) => acc + obj.planningTime, 0) / queryCountDef).toFixed(2);
      const meanExecutionTime = Number(delayedTasks.reduce((acc, obj) => acc + obj.executionTime, 0) / queryCountDef).toFixed(2);
      const overallMeanTimesLabels: string[] = ['Mean Total Time', 'Mean Planning Time', 'Mean Execution Time'];
      const overallMeanTimesArr: number[] = [Number(meanTotalTime), Number(meanPlanningTime), Number(meanExecutionTime)]
      const customMetricsObj = {
        labelsArr: labelsArr,
        nodeType: delayedTasks[0]['nodeType'],
        sharedHitBlocks: delayedTasks[0]['sharedHitBlocks'],
        sharedReadBlocks: delayedTasks[0]['sharedReadBlocks'],
        cacheSize: delayedTasks[0]['cacheSize'],
        workingMem: delayedTasks[0]['workingMem'],
        actualRows: delayedTasks[0]['actualRows'],
        actualLoops: delayedTasks[0]['actualLoops'],
        totalCosts: delayedTasks[0]['totalCosts'],
        startUpCosts: delayedTasks[0]['startUpCosts'],
        planningTimesArr: planningTimesArr,
        executionTimesArr: executionTimesArr,
        totalTimesArr: totalTimesArr,
        overallMeanTimesLabels: overallMeanTimesLabels,
        overallMeanTimesArr: overallMeanTimesArr,
        queryString: queryString,
        customMetrics: delayedTasks,
        queryDelay: delayTimeDef,
        queryCount: queryCountDef
      };

      res.locals.customMetrics = customMetricsObj;
      return next();
    } catch (err) {
      return next({
        log: 'Error handler caught error in customDBController.customMetrics middleware',
        status: 400,
        message: 'An error occurred while generating metrics',
      });
    }
  },

  /*
  // Calculates necessary statistics while querying the database
      queryTimeSQL: async (req, res, next) => {
  
    const { uri , queryString } = req.body;
  
    // Initiating new model
    const { Pool } = pg;
    const pool = new Pool({
      connectionString: uri
    });
  
    const clientDBModel.query = function(text, params, callback) {
      
      return pool.query(text, params, callback);
    };
   
    const string = `${queryString}`;
  
    try {
      // Start time of the query
      const startTime = process.hrtime();
  
      // Awaited query
      const result = await clientDBModel.query(string);
  
      // End time of the query
      const endTime = process.hrtime(startTime);
  
      const totalTimeSQL = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
      const obj = {};
      obj.resultData = result.rows[0];
      obj.totalTimeSQL = totalTimeSQL;
      
      res.locals.queryResultSQL = obj;
      
      return next();
    } catch (err) {
      return next({
        log: 'Error handler caught error in customDBController.queryTimeSQL middleware',
        status: 400,
        message: 'An error occurred while measuring time taken to query the primary database',
      });
    }
  };
  */
};
export default customDBController;
