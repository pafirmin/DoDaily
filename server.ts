import express from 'express';

const app = express();
app.use(express.json());

const PORT = 5000;

app.get('/', (_req, res) => {
  res.json('Hello, world');
});

app.listen(PORT, () => {
  `Server listening on port ${PORT}`;
});
