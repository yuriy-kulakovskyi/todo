import { UserEntity } from "@modules/auth/domain/entities/user.entity";
import { PrismaAuthRepository } from "@modules/auth/infrastructure/prisma-auth.repository";
import { AppError } from "@shared/errors/app.error";
import { logger } from "@shared/utils/logger/logger";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

    const data = await new PrismaAuthRepository().verifyToken(token) as UserEntity;

    if (!data.id) {
      logger.error(`Auth middleware user not found in token response`)
      next(new AppError(404, "User not found"))
    }

    logger.info(`Auth middleware authenticated user ${data.id}`)
    req.user = data;
    next();
  } catch(error) {
    next(error)
  }
}