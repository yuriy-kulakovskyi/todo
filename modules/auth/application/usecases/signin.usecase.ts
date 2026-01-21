import { inject, injectable } from "tsyringe";
import { ISignIn } from "@modules/auth/domain/interfaces/signin.interface";
import { PRISMA_AUTH_REPOSITORY } from "@modules/auth/domain/tokens/auth.tokens";
import { PrismaAuthRepository } from "@modules/auth/infrastructure/prisma-auth.repository";

@injectable()
export class SignInUseCase {
  constructor(
    @inject(PRISMA_AUTH_REPOSITORY)
    private readonly authRepository: PrismaAuthRepository,
  ) {}

  async execute(signin: ISignIn) {
    return this.authRepository.signIn(signin);
  }
}