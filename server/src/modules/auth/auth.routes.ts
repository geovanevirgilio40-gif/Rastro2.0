import { Router } from "express";
import { loginUser, registerUser } from "./auth.service";
import { requireAuth } from "../../middleware/auth.middleware";
import { registerSchema, loginSchema } from "./auth.schemas";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Dados de registo inválidos.",
      });
    }

    const result = await registerUser(parsed.data);

    return res.status(201).json(result);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "E-mail já está registado."
    ) {
      return res.status(409).json({
        error: "E-mail já está registado.",
      });
    }

    console.error("❌ Erro interno no registo:", error);

    return res.status(500).json({
      error: "Não foi possível criar a conta.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Dados de login inválidos.",
      });
    }

    const result = await loginUser(parsed.data, req.ip);

    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Erro no login:", error);

    return res.status(401).json({
      error: "E-mail ou password inválidos.",
    });
  }
});

router.get("/me", requireAuth, (_req, res) => {
  return res.status(200).json({
    user: res.locals.authUser,
  });
});

export default router;
