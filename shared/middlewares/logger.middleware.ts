import { logger } from "@shared/utils/logger/logger";
import { Request, Response, NextFunction } from "express";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const loggerMiddleware: MiddlewareFunction = (req, res, next) => {
  logger.info(`${req.method} ${req.url} ${new Date(Date.now()).toString()}`);
  next();
}