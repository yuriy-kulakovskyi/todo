import { TodoEntity } from "@modules/todo/domain/entities/todo.entity";
import { IUpdateTodo } from "@modules/todo/domain/interfaces/update-todo.interface";
import { IChangeTodoStatus } from "@modules/todo/domain/interfaces/change-todo-status.interface";
import { ICreateTodo } from "@modules/todo/domain/interfaces/create-todo.interface";
import { IGetTodoById } from "@modules/todo/domain/interfaces/get-todo-by-id.interface";
import { IDeleteTodo } from "@modules/todo/domain/interfaces/delete-todo.interface";
import { IDeleteTodoResponse } from "../domain/interfaces/delete-response.interface";

export interface TodoRepository {
  addTodo(create: ICreateTodo): Promise<TodoEntity>;
  getTodos(userId: string): Promise<TodoEntity[]>;
  getTodoById(getTodoById: IGetTodoById): Promise<TodoEntity | null>;
  updateTodo(updateTodo: IUpdateTodo): Promise<TodoEntity>;
  changeTodoStatus(changeTodoStatus: IChangeTodoStatus): Promise<TodoEntity>;
  deleteTodo(deleteTodo: IDeleteTodo): Promise<IDeleteTodoResponse>;
}