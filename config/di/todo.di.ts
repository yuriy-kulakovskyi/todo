import { container } from "tsyringe";
import { ADD_TODO_USECASE, CHANGE_TODO_STATUS_USECASE, DELETE_TODO_USECASE, GET_TODO_BY_ID_USECASE, GET_TODOS_USECASE, PRISMA_TODO_REPOSITORY, TODO_SERVICE, UPDATE_TODO_USECASE } from "@modules/todo/domain/tokens/todo.tokens";
import { PrismaTodoRepository } from "@modules/todo/infrastructure/prisma-todo.repository";
import { AddTodoUseCase } from "@modules/todo/application/usecases/add-todo.usecase";
import { TodoService } from "@modules/todo/application/services/todo.service";
import { GetTodosUseCase } from "@modules/todo/application/usecases/get-todos.usecase";
import { GetTodoByIdUseCase } from "@modules/todo/application/usecases/get-todo-by-id.usecase";
import { UpdateTodoUseCase } from "@modules/todo/application/usecases/update-todo.usecase";
import { ChangeTodoStatusUseCase } from "@modules/todo/application/usecases/change-todo-status.usecase";
import { DeleteTodoUseCase } from "@modules/todo/application/usecases/delete-todo.usecase";

container.register(PRISMA_TODO_REPOSITORY, {
  useClass: PrismaTodoRepository
})

container.register(ADD_TODO_USECASE, {
  useClass: AddTodoUseCase
})

container.register(TODO_SERVICE, {
  useClass: TodoService
})

container.register(GET_TODOS_USECASE, {
  useClass: GetTodosUseCase
})

container.register(GET_TODO_BY_ID_USECASE, {
  useClass: GetTodoByIdUseCase
})

container.register(UPDATE_TODO_USECASE, {
  useClass: UpdateTodoUseCase
})

container.register(CHANGE_TODO_STATUS_USECASE, {
  useClass: ChangeTodoStatusUseCase
})

container.register(DELETE_TODO_USECASE, {
  useClass: DeleteTodoUseCase
})