import jwt from "jsonwebtoken";
import { env } from "@config/env";
import prisma from "prisma/prisma.service";
import { AppError } from "@shared/errors/app.error";
import { IVerifyTokenResult } from "@shared/interfaces/verify-token.interface";

export const verifyRefreshToken = (refreshToken: string): Promise<IVerifyTokenResult> => {
  const refreshTokenSecret = env.REFRESH_TOKEN_SECRET;

  return new Promise(async (resolve, reject) => {
    const dbToken = await prisma.userToken.findFirst({
      where: { token: refreshToken }
    });

    if (!dbToken) {
      return reject(new Error("Invalid refresh token"));
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, tokenDetails) => {
      if (err) {
        throw new AppError(401, "Refresh token is invalid or expired");
      }

      resolve({
        tokenDetails,
        error: false,
        message: "Refresh token is valid"
      });
    })
  });
}