import z from "zod";

export const GetAccessTokenDto = z.object({
  body: z.object({
    refreshToken: z.string().min(1),
  })
});