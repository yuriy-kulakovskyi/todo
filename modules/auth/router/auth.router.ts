import { container } from "tsyringe";
import express from "express";
import { AuthController } from "@modules/auth/controllers/auth.controller";
import { validateInput } from "@shared/middlewares/validate-input.middleware";
import { SignupDto } from "@shared/dto/auth/signup.dto";
import { SigninDto } from "@shared/dto/auth/signin.dto";
import { GetAccessTokenDto } from "@shared/dto/auth/get-access-token.dto";
import { VerifyTokenDto } from "@shared/dto/auth/verify-token.dto";

const router = express.Router();

const accountController = container.resolve(AuthController);

router.post("/signup", validateInput(SignupDto), async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const userResponse = await accountController.signUp({email, password, name});

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
});

router.post("/signin", validateInput(SigninDto), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userResponse = await accountController.signIn({email, password});

    res.status(200).json(userResponse);
  } catch (error) {
    next(error);
  }
});

router.post("/access-token", validateInput(GetAccessTokenDto), async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await accountController.getAccessToken(refreshToken);

    res.status(200).json({
      error: false,
      accessToken,
      message: "Access token created successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/verify-token", validateInput(VerifyTokenDto), async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    
    const user = await accountController.verifyToken(authorization as string);

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