import { inject, injectable } from "tsyringe";
import { PRISMA_TODO_REPOSITORY } from "@modules/todo/domain/tokens/todo.tokens";
import { PrismaTodoRepository } from "@modules/todo/infrastructure/prisma-todo.repository";
import { IDeleteTodo } from "@modules/todo/domain/interfaces/delete-todo.interface";

@injectable()
export class DeleteTodoUseCase {
  constructor(
    @inject(PRISMA_TODO_REPOSITORY)
    private readonly todoRepository: PrismaTodoRepository
  ) {}

  async execute(deleteTodo: IDeleteTodo) {
    return this.todoRepository.deleteTodo(deleteTodo);
  }
}