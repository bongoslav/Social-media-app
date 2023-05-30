import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";

interface PaginatedResult<T> {
  results: T[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
  nextPage?: number;
  previousPage?: number;
}

interface CustomResponse<T> extends Response {
  paginatedResult?: PaginatedResult<T>;
}

export function paginateResults<T>(model: Model<T>) {
  return async (req: Request, res: CustomResponse<T>, next: NextFunction) => {
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;
    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;

    const results: PaginatedResult<T> = {
      results: [],
      totalResults: 0,
      totalPages: 0,
      currentPage: page,
    };

    try {
      results.totalResults = await model.countDocuments().exec();
      results.totalPages = Math.ceil(results.totalResults / limit);

      if (endIndex < results.totalResults) {
        results.nextPage = page + 1;
      }

      if (startIndex > 0) {
        results.previousPage = page - 1;
      }

      results.results = await model.find().limit(limit).skip(startIndex).exec();

      res.locals.paginatedResult = results;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  };
}
