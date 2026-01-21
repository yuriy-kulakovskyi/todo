import { inject, injectable } from "tsyringe";
import { AUTH_SERVICE } from "@modules/auth/domain/tokens/auth.tokens";
import { AuthService } from "@modules/auth/application/services/auth.service";
import { ISignUp } from "@modules/auth/domain/interfaces/signup.interface";
import { ISignIn } from "@modules/auth/domain/interfaces/signin.interface";

@injectable()
export class AuthController {
  constructor(
    @inject(AUTH_SERVICE)
    private readonly authService: AuthService
  ) {}

  async signUp(signup: ISignUp) {
    return this.authService.signUp(signup);
  }

  async signIn(signin: ISignIn) {
    return this.authService.signIn(signin);
  }

  async getAccessToken(refreshToken: string) {
    return this.authService.getAccessToken(refreshToken);
  }

  async verifyToken(token: string) {
    return this.authService.verifyToken(token);
  }
}