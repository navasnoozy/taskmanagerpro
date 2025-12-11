
import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod/v4";
import { RequestValidationError } from "../errors";

declare global {
  namespace Express {
    interface Request {
      validated?: {
        body?: unknown;
        params?: unknown;
        query?: unknown;
      };
    }
  }
}

export const validateRequest = <T>(schema: ZodType<T>, source: "body" | "params" | "query" = "body") => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      throw new RequestValidationError(result.error);
    };
    
    if (!req.validated) {
      req.validated = {};
    }
    req.validated[source] = result.data as T;

    next();
  };
};
