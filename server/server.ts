
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
// allows the use __dirname in es module scope
import { fileURLToPath } from 'url';
import pgRoute from './routes/pgRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../dist/')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/pg', pgRoute);
 
// unknown route handler
app.use((_req: Request, res: Response) => {
  return res.status(404).send('No page found');
});
 
// global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
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
