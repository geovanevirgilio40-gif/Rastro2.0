import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({
  path: "server/.env",
  override: true,
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL não encontrada em server/.env");
  process.exit(1);
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testDatabase() {
  try {
    const result = await pool.query("SELECT NOW() AS server_time");

    console.log("✅ PostgreSQL conectado!");
    console.log("🕐 Hora do servidor:", result.rows[0].server_time);
    console.log("✅ Teste concluído.");
  } catch (error) {
    console.error("❌ Erro ao conectar ao PostgreSQL:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

testDatabase();
