import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "@presentation/auth.guard";

jest.mock("@config/env", () => ({
  env: {
    NODE_ENV: "test",
    PORT: "3000",
    ACCESS_TOKEN_SECRET: "test"
  },
}));

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    verify: jest.fn(),
  },
}));

describe('Auth Middleware', () => {
    let req: Request, res: Response, next: NextFunction;

    beforeEach(() => {
        req = { headers: {} } as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        next = jest.fn();
    });

    it('should return 401 if no authorization header is provided', () => {
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 401, detail: "Authorization token is missing" }));
    });

    it('should call next if token is provided', () => {
        req.headers['authorization'] = 'Bearer valid-token';
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});