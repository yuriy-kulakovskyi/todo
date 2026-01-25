import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import httpMocks from 'node-mocks-http';

interface JwtPayload {
  id: number;
  email: string;
  name: string;
}

interface RequestWithUser extends Request {
  user?: JwtPayload;
}

jest.mock('jsonwebtoken', () => ({ verify: jest.fn() }));

const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  const header = req.get("authorization");
  const rawToken = Array.isArray(header) ? header[0] : (header || "");

  if (!rawToken) {
    next(new Error("Authorization token is missing"));
    return;
  }

  const match = rawToken.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    next(new Error("Invalid authorization header format"));
    return;
  }

  const token = match[1];
  const decoded = jwt.verify(token, "") as JwtPayload;

  if (!decoded || typeof decoded !== "object") {
    next(new Error("Invalid token payload"));
    return;
  }

  req.user = decoded;
  next();
};

test('authMiddleware calls next and attaches user when token is valid', () => {
  const payload = { id: 42, email: 'guard@example.com', name: 'Guard' };
  (jwt.verify as jest.Mock).mockReturnValue(payload);

  const req = httpMocks.createRequest({
    headers: { authorization: 'Bearer faketoken' },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  authMiddleware(req, res, next);

  expect(next).toHaveBeenCalledWith();
  expect(req.user).toBeDefined();
  expect(req.user.email).toEqual(payload.email);
});
