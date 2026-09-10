import { createUser, findUserByEmail } from "./auth.repository";
import { hashPassword } from "./password.service";
import { generateAccessToken } from "./jwt.service";
import { AuthResponse, RegisterInput } from "./auth.types";

export async function registerUser(
  input: RegisterInput
): Promise<AuthResponse> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  if (!name) {
    throw new Error("Nome é obrigatório.");
  }

  if (!email) {
    throw new Error("E-mail é obrigatório.");
  }

  if (!input.password || input.password.length < 8) {
    throw new Error("A password deve ter pelo menos 8 caracteres.");
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("E-mail já está registado.");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await createUser(name, email, passwordHash);

  const token = generateAccessToken(user);

  return {
    user,
    token,
  };
}
