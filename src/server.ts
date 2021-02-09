import express from 'express';
import connectDB from './db';
import UserRouter from './routes/users';

const app = express();

app.use(express.json());

connectDB();

const PORT = 5000;

app.use('/api/users', UserRouter);

app.listen(PORT, () => {
  `Server listening on port ${PORT}`;
});
