import { HttpStatus } from "@shared/enums/http.enum";
import { AppError } from "@shared/errors/app.error";
import { HttpErrorResponse } from "@shared/interfaces/http.interface";
import { httpLogger } from "@shared/utils/logger/http-logger";
import { NextFunction, Request, Response } from "express";

export const allExceptionsFilter = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = 
    err instanceof AppError ? err.statusCode : 500;

  const detail = 
    err instanceof AppError ? err.detail : "Internal server error";

  const response: HttpErrorResponse = {
    success: false,
    statusCode: status,
    timestamp: new Date().toISOString(),
    title: HttpStatus[status] ?? "Error",
    detail
  }

  if (!(err instanceof AppError)) {
    httpLogger.logger.error(err);
  }

  res.status(status).json(response);
}