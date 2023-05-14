import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import compression from "compression";
import postRoutes from "./src/routes/post";
import authRoutes from "./src/routes/auth";
import cors from "cors";

dotenv.config();

const PORT: number = 3000;
const mongoURLEnv = process.env.mongoURL || "";

const app = express();

app.use(cors())

app.use(express.static("./public/"));
app.use(
  compression({
    threshold: 100 * 1000, // 100kb
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(cookieParser());

const mongoURL = mongoURLEnv;

mongoose.connect(mongoURL);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
