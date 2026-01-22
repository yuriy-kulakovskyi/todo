import z from "zod";

export const UpdateTodoDto = z.object({
  params: z.object({
    id: z.string().min(1, "Todo ID is required"),
  }),
  body: z.object({
    title: z.string().min(1, "Title is required"),
  })
});