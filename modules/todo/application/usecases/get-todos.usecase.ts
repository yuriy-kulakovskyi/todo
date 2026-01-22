import { inject, injectable } from "tsyringe";
import { PRISMA_TODO_REPOSITORY } from "@modules/todo/domain/tokens/todo.tokens";
import { PrismaTodoRepository } from "@modules/todo/infrastructure/prisma-todo.repository";

@injectable()
export class GetTodosUseCase {
  constructor(
    @inject(PRISMA_TODO_REPOSITORY)
    private readonly todoRepository: PrismaTodoRepository
  ) {}

  async execute(userId: string) {
    return this.todoRepository.getTodos(userId);
  }
}