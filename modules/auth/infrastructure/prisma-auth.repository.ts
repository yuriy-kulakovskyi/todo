import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserEntity } from "@modules/auth/domain/entities/user.entity";
import { ISignIn } from "@modules/auth/domain/interfaces/signin.interface";
import { ISignUp } from "@modules/auth/domain/interfaces/signup.interface";
import { AuthRepository } from "./auth.repository";
import { IUserResponse } from "../domain/interfaces/user-response.interface";
import { AppError } from "@shared/errors/app.error";
import prisma from "prisma/prisma.service";
import { env } from "@config/env";
import { generateTokens } from "@shared/utils/tokens/generate-tokens.util";

export class PrismaAuthRepository implements AuthRepository {
  async signUp(signup: ISignUp): Promise<IUserResponse> {
    try {
      const { email, password, name } = signup;

      // Check if user with the same email already exists
      const existingUser = await prisma.user.findFirst({ where: { email } });

      if (existingUser) {
        throw new AppError(400, "User with this email already exists");
      }

      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, env.SALT_ROUNDS);

      // Create the new user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      // Prepare the response
      const userEntity = new UserEntity(newUser.id, newUser.email, newUser.name);
      const token = generateTokens(userEntity);

      const { accessToken, refreshToken } = await token;

      return {
        user: userEntity,
        accessToken,
        refreshToken
      }

    } catch (error) {
      if (error instanceof AppError) {
        throw error; 
      }

      throw new AppError(500, "Error during user sign up");
    }
  }

  async signIn(signin: ISignIn): Promise<IUserResponse> {
    try {
      const { email, password } = signin;

      // Find user by email
      const user = await prisma.user.findFirst({ where: { email } });

      if (!user) {
        throw new AppError(401, "Invalid email or password");
      }

      // Compare provided password with stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AppError(401, "Invalid email or password");
      }

      // Prepare the response
      const userEntity = new UserEntity(user.id, user.email, user.name);
      const token = generateTokens(userEntity);

      const { accessToken, refreshToken } = await token;

      return {
        user: userEntity,
        accessToken,
        refreshToken
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error; 
      }

      throw new AppError(500, "Error during user sign in");
    }
  }

  async verifyToken(token: string): Promise<UserEntity> {
    try {
      const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as { id: string; email: string };

      const user = await prisma.user.findUnique({ where: { id: decoded.id, email: decoded.email } });

      if (!user) {
        throw new AppError(401, "Token is invalid or user does not exist");
      }

      return new UserEntity(user.id, user.email, user.name);
    } catch (error) {
      if (error instanceof AppError) {
        throw error; 
      }

      throw new AppError(500, "Error during token verification");
    }
  }
}