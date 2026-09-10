import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(100, "O nome é demasiado longo."),

  email: z
    .string()
    .trim()
    .email("E-mail inválido.")
    .max(255, "O e-mail é demasiado longo."),

  password: z
    .string()
    .min(8, "A password deve ter pelo menos 8 caracteres.")
    .max(128, "A password é demasiado longa."),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("E-mail inválido.")
    .max(255, "O e-mail é demasiado longo."),

  password: z
    .string()
    .min(1, "A password é obrigatória.")
    .max(128, "A password é demasiado longa."),
});
