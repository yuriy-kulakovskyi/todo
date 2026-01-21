import { inject, injectable } from "tsyringe";
import { ISignUp } from "@modules/auth/domain/interfaces/signup.interface";
import { PRISMA_AUTH_REPOSITORY } from "@modules/auth/domain/tokens/auth.tokens";
import { PrismaAuthRepository } from "@modules/auth/infrastructure/prisma-auth.repository";

@injectable()
export class SignUpUseCase {
  constructor(
    @inject(PRISMA_AUTH_REPOSITORY)
    private readonly authRepository: PrismaAuthRepository,
  ){}

  async execute(signup: ISignUp) {
    return this.authRepository.signUp(signup);
  }
}
