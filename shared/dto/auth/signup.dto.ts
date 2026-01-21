import { z } from 'zod';

export const SignupDto = z.object({
  body: z.object({
    email: z.string(),
    password: z.string().min(6),
    name: z.string().min(2),
  })
});