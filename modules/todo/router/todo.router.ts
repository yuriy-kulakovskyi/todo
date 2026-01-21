import express from "express";
import { authMiddleware } from "@presentation/auth.guard";
import { RequestWithUser } from "@shared/interfaces/decoded-token-payload.interface";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({ message: `
    Hello, ${(req as RequestWithUser).user.name}! Here are your todos.
  `.trim() });
});

export { router as todoRouter };