import { UserEntity } from "../entities/user.entity";

export interface IUserResponse {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
}