/* eslint-disable @typescript-eslint/no-var-requires */
// const express = require('express');
// const path = require('path');
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
import pgRoute from './routes/pgRoute';
import authRoute from './routes/authRoute';

app.use(express.static(path.join(__dirname, '../src/assets')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/pg', pgRoute);

app.use('/auth', authRoute);

// unknown routre handler
app.use((req: Request, res: Response) => {
  res.status(404).send('No page found');
});

// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const errorObject = {
    log: 'Unknown error occured in middleware',
    status: 500,
    message: {
      error: `Error occured in middleware: ${err}`
    }
  };
  const newErrorObj = { ...errorObject, ...err };
  console.log(newErrorObj.log);
  res.status(newErrorObj.status).json(newErrorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`);
});
