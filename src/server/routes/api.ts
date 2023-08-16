import express from 'express';
import databaseController from '../controllers/generalMetricsController';
import dbConnectionController from '../controllers/dbConnectionController';
import dbInfoController from '../controllers/dbInfoController';
import generalMetricsController from '../controllers/generalMetricsController';
const router = express.Router();

router.get(
    '/dbInfo', 
    dbConnectionController.connectAndInitializeDB,
    dbInfoController.getDataBaseInfo,
    generalMetricsController.performGenericQueries,
    );
// ... more routes

export default router;
