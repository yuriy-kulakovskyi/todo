import { TodoEntity } from "@modules/todo/domain/entities/todo.entity";
import { IChangeTodoStatus } from "@modules/todo/domain/interfaces/change-todo-status.interface";
import { IUpdateTodo } from "@modules/todo/domain/interfaces/update-todo.interface";
import { TodoRepository } from "./todo.repository";

export class PrismaTodoRepository implements TodoRepository {
  async addTodo(title: string): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  async getTodos(): Promise<TodoEntity[]> {
    throw new Error("Method not implemented.");
  }

  async getTodoById(id: string): Promise<TodoEntity | null> {
    throw new Error("Method not implemented.");
  }

  async updateTodo(updateTodo: IUpdateTodo): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  async changeTodoStatus(changeTodoStatus: IChangeTodoStatus): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  async deleteTodo(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}