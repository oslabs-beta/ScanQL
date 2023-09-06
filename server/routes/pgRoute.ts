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
// ... more routes

// pgRoute.get(
//   ''
// )

export default pgRoute;

// User connects to database via connect button on dashboard -> send URI & connect to db -> return dbmetrics and populate dashboard with metrics view and selectable tabs. if user clicks on er diagram tab -> fetch er diagram data from db and cache, on each subsequent er diagram click check if there is data cached and return that, otherwise refetch data from db. 

// If user clicks refresh button we don't want to check the cache, we want to refetch the data from the db

// users URI string will be kept in cache on server or in database,

// On every request for db info or metrics we will verify the user has a session, get their saved URI from their user info, connect to their database, and run requested metrics for the route that is being fetched.

//DBHive implementation:
// used zustand for state management. They store user information in indexedDB (in memory db). When user is authenticated, they decrypt the value stored on the user - which holds all the userData (such as their password and db nicknames and uris) - this info is stored as an encrypted string and stored as the value of the username key in indexedDB. After they get all the user Data from decrypting indexDB value they update the userData state with the collected userData from indexedDB. 

// Our approach: 
// We will use postgres instead of IndexedDB to store username and encrypted password - then we will also store for each user their uri's. When user logs in they will be authenticated and 

// when the user submits their uri on client side, it will be encrypted their before sending back and stored and the server will have the key to decrypt. on server we will decrypt, verify the validity of the URI and then reencrypt and store in our database connected to the 