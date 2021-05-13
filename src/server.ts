import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./db";
import UserRouter from "./routes/users";
import FolderRouter from "./routes/folders";
import TaskRouter from "./routes/tasks";
import AuthRouter from "./routes/auth";
import path from "path";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://peaceful-fortress-47523.herokuapp.com/*",
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/folders", FolderRouter);
app.use("/api/tasks", TaskRouter);

const root = path.join(__dirname, "..", "client", "build");

app.use(express.static(root));
app.get("*", (_req, res) => {
  res.sendFile("index.html", { root });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
