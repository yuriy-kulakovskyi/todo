import { IUpdateTodo } from "@modules/todo/domain/interfaces/update-todo.interface";
import { PRISMA_TODO_REPOSITORY } from "@modules/todo/domain/tokens/todo.tokens";
import { PrismaTodoRepository } from "@modules/todo/infrastructure/prisma-todo.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateTodoUseCase {
  constructor(
    @inject(PRISMA_TODO_REPOSITORY)
    private readonly todoRepository: PrismaTodoRepository
  ) {}

  async execute(updateTodo: IUpdateTodo) {
    return this.todoRepository.updateTodo(updateTodo);
  }
}