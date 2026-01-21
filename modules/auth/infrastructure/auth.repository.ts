import { UserEntity } from "@modules/auth/domain/entities/user.entity";
import { ISignIn } from "@modules/auth/domain/interfaces/signin.interface";
import { ISignUp } from "@modules/auth/domain/interfaces/signup.interface";
import { IUserResponse } from "@modules/auth/domain/interfaces/user-response.interface";

export interface AuthRepository {
  signUp(signup: ISignUp): Promise<IUserResponse>;
  signIn(signin: ISignIn): Promise<IUserResponse>;
  getAccessToken(refreshToken: string): Promise<string>;
  verifyToken(token: string): Promise<UserEntity>;
}