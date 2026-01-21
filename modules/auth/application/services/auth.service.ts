import { inject, injectable } from "tsyringe";
import { GET_ACCESS_TOKEN_USECASE, SIGNIN_USECASE, SIGNUP_USECASE, VERIFY_TOKEN_USECASE } from "@modules/auth/domain/tokens/auth.tokens";
import { SignUpUseCase } from "@modules/auth/application/usecases/signup.usecase";
import { ISignUp } from "@modules/auth/domain/interfaces/signup.interface";
import { SignInUseCase } from "@modules/auth/application/usecases/signin.usecase";
import { ISignIn } from "@modules/auth/domain/interfaces/signin.interface";
import { GetAccessTokenUseCase } from "@modules/auth/application/usecases/get-access-token.usecase";
import { VerifyTokenUseCase } from "@modules/auth/application/usecases/verify-token.usecase";

@injectable()
export class AuthService {
  constructor(
    @inject(SIGNUP_USECASE)
    private readonly signUpUseCase: SignUpUseCase,

    @inject(SIGNIN_USECASE)
    private readonly signInUseCase: SignInUseCase,

    @inject(GET_ACCESS_TOKEN_USECASE)
    private readonly getAccessTokenUseCase: GetAccessTokenUseCase,

    @inject(VERIFY_TOKEN_USECASE)
    private readonly verifyTokenUseCase: VerifyTokenUseCase,
  ) {}

  async signUp(signUp: ISignUp) {
    return this.signUpUseCase.execute(signUp);
  }

  async signIn(signIn: ISignIn) {
    return this.signInUseCase.execute(signIn);
  }

  async getAccessToken(refreshToken: string) {
    return this.getAccessTokenUseCase.execute(refreshToken);
  }

  async verifyToken(token: string) {
    return this.verifyTokenUseCase.execute(token);
  }
}