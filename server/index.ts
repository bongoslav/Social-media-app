import express from "express";
import mainRoutes from "./src/routes/index";
import authRoutes from "./src/routes/auth";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const PORT: number = 3000;
const mongoURLEnv = process.env.mongoURL || "";

const app = express();

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

app.use("/", mainRoutes);
app.use("/auth/", authRoutes);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
