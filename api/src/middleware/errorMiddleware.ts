import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
  });
};

export default errorMiddleware;
