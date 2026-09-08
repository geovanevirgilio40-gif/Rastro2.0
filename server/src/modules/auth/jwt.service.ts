import jwt, { SignOptions } from "jsonwebtoken";
import { AuthUser } from "./auth.types";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("❌ JWT_SECRET não configurada.");
}

const jwtExpiresIn = "15m";

export function generateAccessToken(user: AuthUser): string {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const options: SignOptions = {
    expiresIn: jwtExpiresIn,
  };

  return jwt.sign(payload, jwtSecret, options);
}

export function verifyAccessToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, jwtSecret) as jwt.JwtPayload;
}
