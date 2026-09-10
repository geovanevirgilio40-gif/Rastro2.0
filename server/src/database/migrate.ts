import dotenv from "dotenv";
import { Pool, PoolClient } from "pg";

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

async function migrate() {
  let client: PoolClient | undefined;

  try {
    console.log("🔄 A conectar ao PostgreSQL...");

    client = await pool.connect();

    console.log("✅ PostgreSQL conectado!");
    console.log("🔄 A iniciar migration...");

    await client.query("BEGIN");

    await client.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log("✅ Tabela users criada/verificada.");

    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(100) NOT NULL,
        details JSONB,
        ip_address INET,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log("✅ Tabela audit_logs criada/verificada.");

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id
      ON audit_logs(user_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at
      ON audit_logs(created_at);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS auth_rate_limits (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        key TEXT UNIQUE NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
        window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        blocked_until TIMESTAMPTZ,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_auth_rate_limits_blocked_until
      ON auth_rate_limits(blocked_until);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_auth_rate_limits_updated_at
      ON auth_rate_limits(updated_at);
    `);

    await client.query("ALTER TABLE auth_rate_limits ENABLE ROW LEVEL SECURITY");

    await client.query(`
      DROP POLICY IF EXISTS deny_public_auth_rate_limits
      ON auth_rate_limits;
    `);

    await client.query(`
      CREATE POLICY deny_public_auth_rate_limits
      ON auth_rate_limits
      FOR ALL TO anon
      USING (false)
      WITH CHECK (false);
    `);

    await client.query(`
      DROP POLICY IF EXISTS deny_authenticated_auth_rate_limits
      ON auth_rate_limits;
    `);

    await client.query(`
      CREATE POLICY deny_authenticated_auth_rate_limits
      ON auth_rate_limits
      FOR ALL TO authenticated
      USING (false)
      WITH CHECK (false);
    `);

    console.log("✅ Tabela auth_rate_limits criada/verificada.");

    console.log("✅ Índices criados/verificados.");

    await client.query("COMMIT");

    console.log("🎉 MIGRATION EXECUTADA COM SUCESSO!");
  } catch (error) {
    if (client) {
      try {
        await client.query("ROLLBACK");
      } catch {}
    }

    console.error("❌ Erro na migration:");
    console.error(error);

    process.exitCode = 1;
  } finally {
    if (client) {
      client.release();
    }

    await pool.end();
  }
}

migrate();
