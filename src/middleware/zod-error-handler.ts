import type { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";
import { ZodError } from "zod";
import { BadRequestError } from "../lib/errors";

export const zodErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    logger.debug(`${err.name} - ${err}`);
    throw new BadRequestError("Invalid data", err.errors);
  }

  next(err);
};
