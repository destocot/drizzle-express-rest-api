import type { Request, Response, NextFunction } from "express";
import JwtUtils from "../lib/utils/jwt.util";
import { JwtPayload } from "../types";
import { UnauthorizedError } from "../lib/errors";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) return next(new UnauthorizedError());

  try {
    const payload = JwtUtils.verify(accessToken);
    req.user = payload as JwtPayload;
  } catch (err) {
    return next(new UnauthorizedError());
  }

  next();
};
