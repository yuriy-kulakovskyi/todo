import { Request, Response, NextFunction } from "express";
import { rateLimiter } from "@shared/middlewares/rate-limiter.middleware";

describe("Rate Limiter Middleware", () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = {
      ip: "192.168.65.3/28"
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    next = jest.fn();
  });

  it("should return 429", () => {
    for (let i = 0; i < 50; i++) {
      rateLimiter(req, res, next);
    }

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 429 })
    );
  });

  it("should pass to the next middleware", () => {
    rateLimiter(req, res, next);
    expect(next).toHaveBeenCalled();
  })
});