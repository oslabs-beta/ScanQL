import express from 'express';
import dbConnectionController from '../controllers/dbConnectionController';
import dbInfoController from '../controllers/dbInfoController';
import generalMetricsController from '../controllers/generalMetricsController';


const pgRoute = express.Router();

pgRoute.post(
  '/dbInfo', 
  dbConnectionController.connectAndInitializeDB,
  dbInfoController.getDataBaseInfo,
  generalMetricsController.performGenericQueries,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);
// ... more routes

export default pgRoute;