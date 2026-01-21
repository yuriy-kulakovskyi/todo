import { Request } from "express";

export interface DecodedTokenPayload {
  id: string;
  email: string;
  name: string;
}

export interface RequestWithUser extends Request {
  user: DecodedTokenPayload;
}