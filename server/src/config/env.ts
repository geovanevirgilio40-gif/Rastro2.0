import dotenv from "dotenv";

dotenv.config({
  path: "server/.env",
  override: true,
});

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("❌ JWT_SECRET não configurada em server/.env");
}

export { jwtSecret };
