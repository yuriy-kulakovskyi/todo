import 'reflect-metadata';
import '@config/di/auth.di'; 
import '@config/di/todo.di'; 

import { NextFunction, Request, Response } from "express";
import { authRouter } from "@modules/auth/router/auth.router";
import { app } from "./app";
import { env } from "@config/env";
import { todoRouter } from "@modules/todo/router/todo.router";
import { allExceptionsFilter } from "@shared/filters/all-exceptions.filter";
import { logger } from "@shared/utils/logger/logger";
import bodyParser from "body-parser";
import { loggerMiddleware } from '@shared/middlewares/logger.middleware';
import { rateLimiter } from '@shared/middlewares/rate-limiter.middleware';

app.use(bodyParser.json());

app.use(rateLimiter);
app.use(loggerMiddleware);

app.use("/todo", todoRouter);
app.use("/auth", authRouter);

app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => allExceptionsFilter(err, req, res, next)
);

app.listen(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});