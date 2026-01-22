import z from "zod";

export const ChangeTodoStatusDto = z.object({
  params: z.object({
    id: z.string().min(1, "Todo ID is required"),
  }),
  body: z.object({
    completed: z.boolean(),
  })
});