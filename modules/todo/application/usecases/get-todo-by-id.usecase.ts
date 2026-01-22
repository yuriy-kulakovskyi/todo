import { inject, injectable } from "tsyringe";
import { PRISMA_TODO_REPOSITORY } from "@modules/todo/domain/tokens/todo.tokens";
import { PrismaTodoRepository } from "@modules/todo/infrastructure/prisma-todo.repository";
import { IGetTodoById } from "@modules/todo/domain/interfaces/get-todo-by-id.interface";

@injectable()
export class GetTodoByIdUseCase {
  constructor(
    @inject(PRISMA_TODO_REPOSITORY)
    private readonly todoRepository: PrismaTodoRepository
  ) {}

  async execute(getTodoById: IGetTodoById) {
    return this.todoRepository.getTodoById(getTodoById);
  }
}