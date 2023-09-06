import express from 'express';
import dbConnectionController from '../controllers/dbConnectionController.js';
import dbInfoController from '../controllers/dbInfoController.js';
import dbERDcontroller from '../controllers/dbERDcontroller.js'
import genericMetricsController from '../controllers/genericMetricsController.js';
import dbOverviewController from '../controllers/dbOverviewConroller.js';
import dBHistoryController from '../controllers/dbHistoryController.js';
import customDBController from '../controllers/customQueryController.js';
const pgRoute = express.Router();

pgRoute.post(
  '/dbInfo', 
  dbConnectionController.connectAndInitializeDB,
  dbConnectionController.createExtension,
  dbInfoController.getDataBaseInfo,
  dbERDcontroller.getSchemaPostgreSQL,
  genericMetricsController.performGenericQueries,
  dbOverviewController.dbSizeMetrics,
  dBHistoryController.dbPastMetrics,
  (_req, res) => {
    return res.status(200).json(res.locals);
  }
);
pgRoute.post(
  '/customQuery', 
  customDBController.customQueryMetrics,
  //new controller

  (_req, res) => {
    return res.status(200).json(res.locals.customMetrics);
  }
);

export default pgRoute;