import z from "zod";

export const VerifyTokenDto = z.object({
  headers: z.object({
    authorization: z.string(),
  })
})