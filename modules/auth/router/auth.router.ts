import express from "express";
import jwt from "jsonwebtoken";
import { PrismaAuthRepository } from "../infrastructure/prisma-auth.repository";
import { verifyRefreshToken } from "@shared/utils/tokens/verify-refresh-token.util";
import { env } from "@config/env";

const router = express.Router();

const repo = new PrismaAuthRepository();

router.post("/signup", async (req, res, next) => {
  try {
    const userResponse = await repo.signUp({email: req.body.email, password: req.body.password, name: req.body.name});

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const userResponse = await repo.signIn({email: req.body.email, password: req.body.password});

    res.status(200).json(userResponse);
  } catch (error) {
    next(error);
  }
});

router.post("/access-token", async (req, res, next) => {
  try {
    const request = await verifyRefreshToken(req.body.refreshToken);
    const { tokenDetails } = request;
    console.log(tokenDetails);

    if (tokenDetails && typeof tokenDetails !== "string") {
      const payload = { id: tokenDetails.id, email: tokenDetails.email };
      const accessToken = jwt.sign(
        payload,
        env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' }
      );

      console.log(accessToken);

      res.status(200).json({
        error: false,
        accessToken,
        message: "Access token created successfully",
      });
    }
  } catch (error) {
    next(error);
  }
})

router.get("/verify-token", async (req, res, next) => {
  try {
    const user = await repo.verifyToken(req.headers.authorization as string);

    res.status(200).json({
      error: false,
      user,
      message: "Token is valid",
    });
  } catch (error) {
    next(error);
  }
});

export { router as authRouter };