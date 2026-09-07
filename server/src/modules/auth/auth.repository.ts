import { pool } from "../../config/database";
import { AuthUser, UserRole } from "./auth.types";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
}

export async function findUserByEmail(
  email: string
): Promise<UserRecord | null> {
  const result = await pool.query<UserRecord>(
    `
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [email]
  );

  return result.rows[0] ?? null;
}

export async function createUser(
  name: string,
  email: string,
  passwordHash: string
): Promise<AuthUser> {
  const result = await pool.query<AuthUser>(
    `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, role
    `,
    [name, email, passwordHash]
  );

  return result.rows[0];
}
