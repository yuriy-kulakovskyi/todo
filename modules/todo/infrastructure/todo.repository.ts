import { TodoEntity } from "@modules/todo/domain/entities/todo.entity";
import { IUpdateTodo } from "@modules/todo/domain/interfaces/update-todo.interface";
import { IChangeTodoStatus } from "@modules/todo/domain/interfaces/change-todo-status.interface";

export interface TodoRepository {
  addTodo(title: string): Promise<TodoEntity>;
  getTodos(): Promise<TodoEntity[]>;
  getTodoById(id: string): Promise<TodoEntity | null>;
  updateTodo(updateTodo: IUpdateTodo): Promise<TodoEntity>;
  changeTodoStatus(changeTodoStatus: IChangeTodoStatus): Promise<TodoEntity>;
  deleteTodo(id: string): Promise<void>;
}