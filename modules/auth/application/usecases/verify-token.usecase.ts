import { inject, injectable } from "tsyringe";
import { PRISMA_AUTH_REPOSITORY } from "@modules/auth/domain/tokens/auth.tokens";
import { PrismaAuthRepository } from "@modules/auth/infrastructure/prisma-auth.repository";

@injectable()
export class VerifyTokenUseCase {
  constructor(
    @inject(PRISMA_AUTH_REPOSITORY)
    private readonly authRepository: PrismaAuthRepository,
  ) {}

  async execute(token: string) {
    return this.authRepository.verifyToken(token);
  }
}