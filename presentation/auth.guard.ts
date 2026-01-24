import jwt from "jsonwebtoken";
import { AppError } from "@shared/errors/app.error";
import { logger } from "@shared/utils/logger/logger";
import { Request, Response, NextFunction } from "express";
import { env } from "@config/env";
import { DecodedTokenPayload, RequestWithUser } from "@shared/interfaces/decoded-token-payload.interface";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const rawToken = Array.isArray(header) ? header[0] : (header || "")

  if (!rawToken) {
    logger.error(`Auth middleware missing authorization header`)
    return next(new AppError(401, "Authorization token is missing"))
  }

  const match = rawToken.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    logger.error(`Auth middleware invalid authorization header format`)
    return next(new AppError(401, "Invalid authorization header format"))
  }

  const token = match[1];

  const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET as string) as unknown;

  if (!decoded || typeof decoded !== 'object') {
    return next(new AppError(401, "Invalid token payload"));
  }

  const payload = decoded as DecodedTokenPayload;
  if (!payload.id || !payload.email || !payload.name) {
    return next(new AppError(401, "Invalid token payload"));
  }

  (req as RequestWithUser).user = payload;
  next();
}