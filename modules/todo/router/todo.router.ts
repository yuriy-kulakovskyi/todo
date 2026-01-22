import { container } from "tsyringe";
import express from "express";
import { authMiddleware } from "@presentation/auth.guard";
import { RequestWithUser } from "@shared/interfaces/decoded-token-payload.interface";
import { TodoController } from "@modules/todo/controllers/todo.controller";
import { validateInput } from "@shared/middlewares/validate-input.middleware";
import { CreateTodoDto } from "@shared/dto/todo/create-todo.dto";
import { GetTodoByIdDto } from "@shared/dto/todo/get-todo-by-id.dto";
import { UpdateTodoDto } from "@shared/dto/todo/update-todo.dto";
import { ChangeTodoStatusDto } from "@shared/dto/todo/change-todo-status.dto";
import { DeleteTodoDto } from "@shared/dto/todo/delete-todo.dto";

const router = express.Router();
const todoController = container.resolve(TodoController);

router.post("/", validateInput(CreateTodoDto), authMiddleware, async (req, res, next) => {
  try {
    const { title } = req.body;
    const userId = (req as RequestWithUser).user.id;

    const todo = await todoController.addTodo({ title, userId });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

router.get("/", authMiddleware,  async (req, res, next) => {
  try {
    const userId = (req as RequestWithUser).user.id;

    const todos = await todoController.getTodos(userId);

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateInput(GetTodoByIdDto), authMiddleware,  async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = (req as RequestWithUser).user.id;

    const todo = await todoController.getTodoById({ id: id as string, userId });

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateInput(UpdateTodoDto), authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const userId = (req as RequestWithUser).user.id;

    const todo = await todoController.updateTodo({ id: id as string, title, userId });

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", validateInput(ChangeTodoStatusDto), authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const userId = (req as RequestWithUser).user.id;

    const todo = await todoController.changeTodoStatus({ id: id as string, completed, userId });

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateInput(DeleteTodoDto), authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = (req as RequestWithUser).user.id;

    const deleteResponse = await todoController.deleteTodo({ id: id as string, userId });

    res.status(200).json(deleteResponse);
  } catch (error) {
    next(error);
  }
});

export { router as todoRouter };