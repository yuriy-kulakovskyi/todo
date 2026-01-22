import z from "zod";

export const GetTodoByIdDto = z.object({
  params: z.object({
    id: z.string().min(1, "Todo ID is required"),
  })
})