import { IChangeTodoStatus } from "@modules/todo/domain/interfaces/change-todo-status.interface";
import { PRISMA_TODO_REPOSITORY } from "@modules/todo/domain/tokens/todo.tokens";
import { PrismaTodoRepository } from "@modules/todo/infrastructure/prisma-todo.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ChangeTodoStatusUseCase {
  constructor(
    @inject(PRISMA_TODO_REPOSITORY)
    private readonly todoRepository: PrismaTodoRepository
  ) {}

  async execute(changeTodoStatus: IChangeTodoStatus) {
    return this.todoRepository.changeTodoStatus(changeTodoStatus);
  }
}