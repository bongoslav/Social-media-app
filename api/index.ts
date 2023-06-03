import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import compression from "compression";
import postRoutes from "./src/routes/post";
import authRoutes from "./src/routes/auth";
import usersRoutes from "./src/routes/users";
import cors from "cors";
import errorMiddleware from "./src/middleware/errorMiddleware";

dotenv.config();

const PORT: number = 3000;
const mongoURLEnv = process.env.mongoURL || "";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Enable sending credentials
  })
);

app.use(cookieParser());
app.use(express.static("./public/"));
app.use(
  compression({
    threshold: 100 * 1000, // 100kb
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoURL = mongoURLEnv;

mongoose.connect(mongoURL);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/users", usersRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
