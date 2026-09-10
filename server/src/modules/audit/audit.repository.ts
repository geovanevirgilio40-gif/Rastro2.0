import { pool } from "../../config/database";

interface AuditLogInput {
  userId?: string | null;
  action: string;
  details?: Record<string, unknown> | null;
  ipAddress?: string | null;
}

export async function createAuditLog(
  input: AuditLogInput
): Promise<void> {
  await pool.query(
    `
      INSERT INTO audit_logs (
        user_id,
        action,
        details,
        ip_address
      )
      VALUES ($1, $2, $3, $4)
    `,
    [
      input.userId ?? null,
      input.action,
      input.details ?? null,
      input.ipAddress ?? null,
    ]
  );
}
