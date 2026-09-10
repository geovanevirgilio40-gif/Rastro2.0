import { Router } from "express";
import { loginUser, registerUser } from "./auth.service";

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
                                                    error:
                                                            error instanceof Error
                                                                      ? error.message
                                                                                : "Erro ao criar utilizador.",
                                                                                    });
                                                                                      }
                                                                                      });

                                                                                      router.post("/login", async (req, res) => {
                                                                                        try {
                                                                                            const { email, password } = req.body;

                                                                                                const result = await loginUser({
                                                                                                      email,
                                                                                                            password,
                                                                                                                });

                                                                                                                    return res.status(200).json(result);
                                                                                                                      } catch (error) {
                                                                                                                          console.error("❌ Erro no login:", error);

                                                                                                                              return res.status(401).json({
                                                                                                                                    error: "E-mail ou password inválidos.",
                                                                                                                                        });
                                                                                                                                          }
                                                                                                                                          });

                                                                                                                                          export default router;