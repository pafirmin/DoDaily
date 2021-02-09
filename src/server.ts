import express from 'express';
import connectDB from './db';
import UserRouter from './routes/users';
import FolderRouter from './routes/folders';

const app = express();

app.use(express.json());

connectDB();

const PORT = 5000;

app.use('/api/users', UserRouter);
app.use('/api/folders', FolderRouter);

app.listen(PORT, () => {
  `Server listening on port ${PORT}`;
});
