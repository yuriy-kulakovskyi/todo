import jwt from 'jsonwebtoken';

export interface ITokenDetails {
  id: string;
  name: string;
  email: string;
}

export interface IVerifyTokenResult {
  tokenDetails: ITokenDetails | string | jwt.JwtPayload | undefined;
  error: boolean;
  message: string;
}
