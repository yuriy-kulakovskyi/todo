import jwt from "jsonwebtoken";
import { UserEntity } from "@modules/auth/domain/entities/user.entity";
import { env } from "@config/env";
import prisma from "prisma/prisma.service";

export const generateTokens = async (user: UserEntity): Promise< { accessToken: string, refreshToken: string } > => {
  try {
    const payload = { id: user.id, name: user.name, email: user.email };
    const accessToken = jwt.sign(
      payload,
      env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      payload,
      env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    );

    await prisma.userToken.upsert({
      where: { userId: user.id },
      update: { token: refreshToken },
      create: { userId: user.id, token: refreshToken }
    })

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
}