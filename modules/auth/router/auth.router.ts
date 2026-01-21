import { container } from "tsyringe";
import express from "express";
import { AuthController } from "@modules/auth/controllers/auth.controller";

const router = express.Router();

const accountController = container.resolve(AuthController);

router.post("/signup", async (req, res, next) => {
  try {
    const userResponse = await accountController.signUp({email: req.body.email, password: req.body.password, name: req.body.name});

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const userResponse = await accountController.signIn({email: req.body.email, password: req.body.password});

    res.status(200).json(userResponse);
  } catch (error) {
    next(error);
  }
});

router.post("/access-token", async (req, res, next) => {
  try {
    const accessToken = await accountController.getAccessToken(req.body.refreshToken);

    res.status(200).json({
      error: false,
      accessToken,
      message: "Access token created successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/verify-token", async (req, res, next) => {
  try {
    const user = await accountController.verifyToken(req.headers.authorization as string);

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