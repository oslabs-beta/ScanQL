/* eslint-disable @typescript-eslint/no-var-requires */
// const express = require('express');
// const path = require('path');
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
// allows the use __dirname in es module scope
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
import pgRoute from './routes/pgRoute.js';
import authRoute from './routes/authRoute.js';

app.use(express.static(path.join(__dirname, '../src/assets')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/pg', pgRoute);
app.use('/auth', authRoute);
 
// unknown route handler
app.use((req: Request, res: Response) => {
  return res.status(404).send('No page found');
});
 
// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {
      error: 'An error occured'
    } 
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`);
});
