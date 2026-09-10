import jwt, { SignOptions } from "jsonwebtoken";
import { jwtSecret } from "../../config/env";
import { AuthUser } from "./auth.types";

const jwtExpiresIn = "15m";

export function generateAccessToken(user: AuthUser): string {
  const payload = {
    sub: user.id,
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
