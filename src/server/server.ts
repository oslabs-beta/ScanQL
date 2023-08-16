import express from 'express';
import apiRoutes from './routes/api';

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
