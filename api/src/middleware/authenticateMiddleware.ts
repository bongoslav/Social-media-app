import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface IGetUserAuthInfoRequest extends Request {
  userId: string;
  // TODO: roles: string
}

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

// new auth middleware
export const verifyJWT = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string =
    req.headers.authorization as string || req.headers.Authorization as string;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err: Error, decoded: JwtPayload) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.userId = decoded.userId;
      // TODO: req.roles = decoded.roles
      next();
    }
  );
};
