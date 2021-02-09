import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './db';
import UserRouter from './routes/users';
import FolderRouter from './routes/folders';
import TaskRouter from './routes/tasks';
import AuthRouter from './routes/auth';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

connectDB();

app.use('/api/users', UserRouter);
app.use('/api/folders', FolderRouter);
app.use('/api/tasks', TaskRouter);
app.use('api/auth', AuthRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
