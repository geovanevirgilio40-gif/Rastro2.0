import { Router } from "express";
import { registerUser } from "./auth.service";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerUser({
      name,
      email,
      password,
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error("❌ Erro no registo:", error);

    return res.status(400).json({
      error: error instanceof Error
        ? error.message
        : "Erro ao criar utilizador.",
    });
  }
});

export default router;
