import { AppError } from "@shared/errors/app.error";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

type ValidateInput = (
  schema: z.ZodObject<{
    body?: z.ZodTypeAny;
    headers?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    params?: z.ZodTypeAny;
    error?: z.ZodTypeAny;
  }>
) => MiddlewareFunction;

export const validateInput: ValidateInput =
  (schema): MiddlewareFunction =>
  (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
    });

    if (!result.success) {
      throw new AppError(400, result.error.message);
    }
    
    next();
  }