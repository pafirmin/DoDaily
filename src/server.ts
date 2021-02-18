import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectDB from './db';
import UserRouter from './routes/users';
import FolderRouter from './routes/folders';
import TaskRouter from './routes/tasks';
import AuthRouter from './routes/auth';
import path from 'path';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);
app.use('/api/folders', FolderRouter);
app.use('/api/tasks', TaskRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  app.get('/', (_req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
