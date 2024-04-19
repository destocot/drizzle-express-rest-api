import { type Request, type Response, type NextFunction } from "express";
import { type AnyZodObject } from "zod";

export const validateResource = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  };
};
