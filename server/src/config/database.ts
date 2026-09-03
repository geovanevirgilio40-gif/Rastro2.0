import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({
  path: "server/.env",
    override: true,
    });

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error("❌ DATABASE_URL não encontrada em server/.env");
      }

      export const pool = new Pool({
        connectionString: databaseUrl,
          ssl: {
              rejectUnauthorized: false,
                },
                });