import type { Request, Response, NextFunction } from "express";
import logger from "@/lib/logger";
import { CustomError } from "@/lib/errors/custom-error";
import { ZodError } from "zod";
import { DrizzleError } from "drizzle-orm";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    logger.debug(`${err.statusCode} - ${err.serializeErrors().message}`);

    res.status(err.statusCode);

    const { message, errors } = err.serializeErrors();

    return res.json({ error: { message, errors } });
  }

  if (err instanceof DrizzleError) {
    logger.debug(`THROWING INSTANCE OF DRIZZLE ERROR`);
  }

  console.error(err);

  res.status(500);
  res.json({ error: err.message });
};
