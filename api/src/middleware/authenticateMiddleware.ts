import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
  const token = req.cookies["accessToken"];

  try {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      if (!decoded) {
        return res.status(401).json({ error: "Token is not valid" });
      }
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
