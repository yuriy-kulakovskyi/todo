import { AppError } from "@shared/errors/app.error";
import { Request, Response, NextFunction } from "express";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

const requestsMap = new Map<string, number[]>();

export const rateLimiter = (req: Request, _: Response, next: NextFunction) => {
  const ip = req.ip || "";
  const now = Date.now();

  const timestamps = requestsMap.get(ip) ?? [];

  const currentPeriodTimestamps = timestamps.filter((ts: number) => 
    now - ts < WINDOW_MS
  );

  if (currentPeriodTimestamps.length >= MAX_REQUESTS) {
    return next(new AppError(429, "Too many requests"));
  }

  currentPeriodTimestamps.push(now);
  requestsMap.set(ip, currentPeriodTimestamps);

  next();
}