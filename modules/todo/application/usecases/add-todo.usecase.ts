import { inject, injectable } from "tsyringe";
import { PRISMA_TODO_REPOSITORY } from "@modules/todo/domain/tokens/todo.tokens";
import { PrismaTodoRepository } from "@modules/todo/infrastructure/prisma-todo.repository";
import { ICreateTodo } from "@modules/todo/domain/interfaces/create-todo.interface";

@injectable()
export class AddTodoUseCase {
  constructor(
    @inject(PRISMA_TODO_REPOSITORY)
    private readonly todoRepository: PrismaTodoRepository
  ) {}

  async execute(createTodo: ICreateTodo) {
    return this.todoRepository.addTodo(createTodo);
  }
}