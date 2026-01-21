import { container } from "tsyringe";
import { PRISMA_AUTH_REPOSITORY, SIGNUP_USECASE, AUTH_SERVICE, AUTH_CONTROLLER, SIGNIN_USECASE, GET_ACCESS_TOKEN_USECASE, VERIFY_TOKEN_USECASE } from "@modules/auth/domain/tokens/auth.tokens";
import { PrismaAuthRepository } from "@modules/auth/infrastructure/prisma-auth.repository";
import { SignUpUseCase } from "@modules/auth/application/usecases/signup.usecase";
import { AuthService } from "@modules/auth/application/services/auth.service";
import { AuthController } from "@modules/auth/controllers/auth.controller";
import { GetAccessTokenUseCase } from "@modules/auth/application/usecases/get-access-token.usecase";
import { VerifyTokenUseCase } from "@modules/auth/application/usecases/verify-token.usecase";
import { SignInUseCase } from "@modules/auth/application/usecases/signin.usecase";

container.register(PRISMA_AUTH_REPOSITORY, {
  useClass: PrismaAuthRepository
})

container.register(SIGNUP_USECASE, {
  useClass: SignUpUseCase
})

container.register(AUTH_SERVICE, {
  useClass: AuthService
})

container.register(AUTH_CONTROLLER, {
  useClass: AuthController
})

container.register(SIGNIN_USECASE, {
  useClass: SignInUseCase
})

container.register(GET_ACCESS_TOKEN_USECASE, {
  useClass: GetAccessTokenUseCase
})

container.register(VERIFY_TOKEN_USECASE, {
  useClass: VerifyTokenUseCase
})