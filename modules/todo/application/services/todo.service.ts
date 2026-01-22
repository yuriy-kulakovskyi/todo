import { inject, injectable } from "tsyringe";
import { ADD_TODO_USECASE, CHANGE_TODO_STATUS_USECASE, DELETE_TODO_USECASE, GET_TODO_BY_ID_USECASE, GET_TODOS_USECASE, UPDATE_TODO_USECASE } from "@modules/todo/domain/tokens/todo.tokens";
import { AddTodoUseCase } from "@modules/todo/application/usecases/add-todo.usecase";
import { ICreateTodo } from "@modules/todo/domain/interfaces/create-todo.interface";
import { GetTodosUseCase } from "@modules/todo/application/usecases/get-todos.usecase";
import { IGetTodoById } from "@modules/todo/domain/interfaces/get-todo-by-id.interface";
import { GetTodoByIdUseCase } from "@modules/todo/application/usecases/get-todo-by-id.usecase";
import { UpdateTodoUseCase } from "../usecases/update-todo.usecase";
import { IUpdateTodo } from "@modules/todo/domain/interfaces/update-todo.interface";
import { ChangeTodoStatusUseCase } from "@modules/todo/application/usecases/change-todo-status.usecase";
import { IChangeTodoStatus } from "@modules/todo/domain/interfaces/change-todo-status.interface";
import { DeleteTodoUseCase } from "@modules/todo/application/usecases/delete-todo.usecase";
import { IDeleteTodo } from "@modules/todo/domain/interfaces/delete-todo.interface";

@injectable()
export class TodoService {
  constructor(
    @inject(ADD_TODO_USECASE)
    private readonly addTodoUseCase: AddTodoUseCase,

    @inject(GET_TODOS_USECASE)
    private readonly getTodosUseCase: GetTodosUseCase,

    @inject(GET_TODO_BY_ID_USECASE)
    private readonly getTodoByIdUseCase: GetTodoByIdUseCase,

    @inject(UPDATE_TODO_USECASE)
    private readonly updateTodoUseCase: UpdateTodoUseCase,

    @inject(CHANGE_TODO_STATUS_USECASE)
    private readonly changeTodoStatusUseCase: ChangeTodoStatusUseCase,

    @inject(DELETE_TODO_USECASE)
    private readonly deleteTodoUseCase: DeleteTodoUseCase,
  ) {}

  async addTodo(createTodo: ICreateTodo) {
    return this.addTodoUseCase.execute(createTodo);
  }

  async getTodos(userId: string) {
    return this.getTodosUseCase.execute(userId);
  }

  async getTodoById(getTodoById: IGetTodoById) {
    return this.getTodoByIdUseCase.execute(getTodoById);
  }

  async updateTodo(updatedTodo: IUpdateTodo) {
    return this.updateTodoUseCase.execute(updatedTodo);
  }

  async changeTodoStatus(changeTodoStatus: IChangeTodoStatus) {
    return this.changeTodoStatusUseCase.execute(changeTodoStatus);
  }

  async deleteTodo(deleteTodo: IDeleteTodo) {
    return this.deleteTodoUseCase.execute(deleteTodo);
  }
}