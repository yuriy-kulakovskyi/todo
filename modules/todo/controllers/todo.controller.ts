import { inject, injectable } from "tsyringe";
import { ICreateTodo } from "@modules/todo/domain/interfaces/create-todo.interface";
import { TODO_SERVICE } from "@modules/todo/domain/tokens/todo.tokens";
import { TodoService } from "@modules/todo/application/services/todo.service";
import { IGetTodoById } from "@modules/todo/domain/interfaces/get-todo-by-id.interface";
import { IUpdateTodo } from "@modules/todo/domain/interfaces/update-todo.interface";
import { IChangeTodoStatus } from "@modules/todo/domain/interfaces/change-todo-status.interface";
import { IDeleteTodo } from "@modules/todo/domain/interfaces/delete-todo.interface";

@injectable()
export class TodoController {
  constructor(
    @inject(TODO_SERVICE)
    private readonly todoService: TodoService
  ) {}

  async addTodo(createTodo: ICreateTodo) {
    return this.todoService.addTodo(createTodo);
  }

  async getTodos(userId: string) {
    return this.todoService.getTodos(userId);
  }

  async getTodoById(getTodoById: IGetTodoById) {
    return this.todoService.getTodoById(getTodoById);
  }

  async updateTodo(updateTodo: IUpdateTodo) {
    return this.todoService.updateTodo(updateTodo);
  }

  async changeTodoStatus(changeTodoStatus: IChangeTodoStatus) {
    return this.todoService.changeTodoStatus(changeTodoStatus);
  }

  async deleteTodo(deleteTodo: IDeleteTodo) {
    return this.todoService.deleteTodo(deleteTodo);
  }
}