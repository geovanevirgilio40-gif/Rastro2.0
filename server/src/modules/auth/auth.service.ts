import { createUser, findUserByEmail } from "./auth.repository";
import { hashPassword, verifyPassword } from "./password.service";
import { generateAccessToken } from "./jwt.service";
import {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from "./auth.types";

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

export async function loginUser(
  input: LoginInput
): Promise<AuthResponse> {
  const email = input.email.trim().toLowerCase();

  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("E-mail ou password inválidos.");
  }

  const passwordValid = await verifyPassword(
    input.password,
    user.password_hash
  );

  if (!passwordValid) {
    throw new Error("E-mail ou password inválidos.");
  }

  const authUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = generateAccessToken(authUser);

  return {
    user: authUser,
    token,
  };
}
