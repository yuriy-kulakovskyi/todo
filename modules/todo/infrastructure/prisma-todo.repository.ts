import { TodoEntity } from "@modules/todo/domain/entities/todo.entity";
import { IChangeTodoStatus } from "@modules/todo/domain/interfaces/change-todo-status.interface";
import { IUpdateTodo } from "@modules/todo/domain/interfaces/update-todo.interface";
import { TodoRepository } from "./todo.repository";
import { ICreateTodo } from "@modules/todo/domain/interfaces/create-todo.interface";
import { AppError } from "@shared/errors/app.error";
import prisma from "prisma/prisma.service";
import { IGetTodoById } from "@modules/todo/domain/interfaces/get-todo-by-id.interface";
import { IDeleteTodo } from "@modules/todo/domain/interfaces/delete-todo.interface";
import { IDeleteTodoResponse } from "@modules/todo/domain/interfaces/delete-response.interface";

export class PrismaTodoRepository implements TodoRepository {
  async addTodo(create: ICreateTodo): Promise<TodoEntity> {
    try {
      const { title, userId } = create;

      if (!title) {
        throw new AppError(400, "Title is required");
      }

      if (!userId) {
        throw new AppError(400, "User ID is required");
      }

      const existingTodo = await prisma.todo.findFirst({ where: { title, userId } });

      if (existingTodo) {
        throw new AppError(400, "Todo with this title already exists for the user");
      }

      const todo = await prisma.todo.create({
        data: {
          title,
          userId
        }
      });

      return new TodoEntity(todo.id, todo.title, todo.completed);
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(500, error.message);
    }
  }

  async getTodos(userId: string): Promise<TodoEntity[]> {
    try {
      if (!userId) {
        throw new AppError(400, "User ID is required");
      }

      const todos = await prisma.todo.findMany({ where: { userId, isDeleted: false } });

      if(!todos || todos.length === 0) {
        throw new AppError(404, "No todos found for the user");
      }

      return todos.map(todo => new TodoEntity(todo.id, todo.title, todo.completed));
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      
      throw new AppError(500, (error as Error).message);
    }
  }

  async getTodoById(getTodoById: IGetTodoById): Promise<TodoEntity | null> {
    try {
      const { id, userId } = getTodoById;

      if (!id) {
        throw new AppError(400, "Todo ID is required");
      }

      if (!userId) {
        throw new AppError(400, "User ID is required");
      }

      const todo = await prisma.todo.findFirst({ where: { id, userId, isDeleted: false } });

      if (!todo) {
        return null;
      }

      return new TodoEntity(todo.id, todo.title, todo.completed);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      
      throw new AppError(500, (error as Error).message);
    }
  }

  async updateTodo(updateTodo: IUpdateTodo): Promise<TodoEntity> {
    try {
      const { id, title, userId } = updateTodo;

      if (!id) {
        throw new AppError(400, "Todo ID is required");
      }

      if (!title) {
        throw new AppError(400, "Title is required");
      }

      if (!userId) {
        throw new AppError(400, "User ID is required");
      }

      const todo = await prisma.todo.findFirst({ where: { id, userId, isDeleted: false } });

      if (!todo) {
        throw new AppError(404, "Todo not found");
      }

      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { title }
      });

      return new TodoEntity(updatedTodo.id, updatedTodo.title, updatedTodo.completed);

    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(500, (error as Error).message);
    }
  }

  async changeTodoStatus(changeTodoStatus: IChangeTodoStatus): Promise<TodoEntity> {
    try {
      const { id, completed, userId } = changeTodoStatus;

      if (!id) {
        throw new AppError(400, "Todo ID is required");
      }

      if (completed === undefined) {
        throw new AppError(400, "Completed status is required");
      }

      if (!userId) {
        throw new AppError(400, "User ID is required");
      }

      const todo = await prisma.todo.findFirst({ where: { id, userId, isDeleted: false } });

      if (!todo) {
        throw new AppError(404, "Todo not found");
      }

      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { completed }
      });

      return new TodoEntity(updatedTodo.id, updatedTodo.title, updatedTodo.completed);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(500, (error as Error).message);
    }
  }

  async deleteTodo(deleteTodo: IDeleteTodo): Promise<IDeleteTodoResponse> {
    try {
      const { id, userId } = deleteTodo;

      if (!id) {
        throw new AppError(400, "Todo ID is required");
      }

      if (!userId) {
        throw new AppError(400, "User ID is required");
      }
      
      const todo = await prisma.todo.findFirst({ where: { id, userId, isDeleted: false } });

      if (!todo) {
        throw new AppError(404, "Todo not found");
      }

      await prisma.todo.update({
        where: { id },
        data: { isDeleted: true }
      });
      
      return { success: true, message: "Todo deleted successfully" };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(500, (error as Error).message);  
    }
  }
}