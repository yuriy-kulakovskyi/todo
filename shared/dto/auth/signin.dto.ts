import z from "zod";

export const SigninDto = z.object({
  body: z.object({
    email: z.string(),
    password: z.string().min(6),
  })
})