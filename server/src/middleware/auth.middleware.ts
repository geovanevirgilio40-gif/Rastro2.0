import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../modules/auth/jwt.service";
import { UserRole } from "../modules/auth/auth.types";

const allowedRoles: UserRole[] = [
  "user",
  "admin",
  "super_admin",
];

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Não autenticado.",
    });
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      error: "Não autenticado.",
    });
  }

  try {
    const payload = verifyAccessToken(token);

    if (
      typeof payload.sub !== "string" ||
      typeof payload.role !== "string" ||
      !allowedRoles.includes(payload.role as UserRole)
    ) {
      return res.status(401).json({
        error: "Token inválido.",
      });
    }

    res.locals.authUser = {
      id: payload.sub,
      role: payload.role as UserRole,
    };

    return next();
  } catch {
    return res.status(401).json({
      error: "Token inválido ou expirado.",
    });
  }
}
