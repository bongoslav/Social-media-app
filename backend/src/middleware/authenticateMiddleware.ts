import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Secret } from "jsonwebtoken";
import { merge } from "lodash";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
  const token = req.cookies["myApp_token"];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ msg: "Token is not valid" });
    }

    // Add user object to request
    merge(req, { user });

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
