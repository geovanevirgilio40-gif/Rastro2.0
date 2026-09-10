import crypto from "crypto";
import { pool } from "../../config/database";
import { jwtSecret } from "../../config/env";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const BLOCK_MS = 15 * 60 * 1000;

function createRateLimitKey(ipAddress: string, email: string): string {
  const normalizedEmail = email.trim().toLowerCase();

  return crypto
    .createHmac("sha256", jwtSecret)
    .update(`${ipAddress}|${normalizedEmail}`)
    .digest("hex");
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export async function checkLoginRateLimit(
  ipAddress: string,
  email: string
): Promise<RateLimitResult> {
  const key = createRateLimitKey(ipAddress, email);

  const result = await pool.query<{
    attempts: number;
    window_started_at: Date;
    blocked_until: Date | null;
  }>(
    `
      SELECT attempts, window_started_at, blocked_until
      FROM auth_rate_limits
      WHERE key = $1
      LIMIT 1
    `,
    [key]
  );

  if (result.rows.length === 0) {
    return { allowed: true };
  }

  const record = result.rows[0];
  const now = Date.now();

  if (
    record.blocked_until &&
    record.blocked_until.getTime() > now
  ) {
    const retryAfterSeconds = Math.ceil(
      (record.blocked_until.getTime() - now) / 1000
    );

    return {
      allowed: false,
      retryAfterSeconds,
    };
  }

  if (
    now - record.window_started_at.getTime() >= WINDOW_MS
  ) {
    return { allowed: true };
  }

  return {
    allowed: record.attempts < MAX_ATTEMPTS,
  };
}

export async function recordLoginFailure(
  ipAddress: string,
  email: string
): Promise<void> {
  const key = createRateLimitKey(ipAddress, email);

  await pool.query(
    `
      INSERT INTO auth_rate_limits (
        key,
        attempts,
        window_started_at,
        blocked_until,
        updated_at
      )
      VALUES ($1, 1, NOW(), NULL, NOW())

      ON CONFLICT (key)
      DO UPDATE SET
        attempts = CASE
          WHEN auth_rate_limits.window_started_at
            <= NOW() - INTERVAL '15 minutes'
          THEN 1
          ELSE auth_rate_limits.attempts + 1
        END,

        window_started_at = CASE
          WHEN auth_rate_limits.window_started_at
            <= NOW() - INTERVAL '15 minutes'
          THEN NOW()
          ELSE auth_rate_limits.window_started_at
        END,

        blocked_until = CASE
          WHEN auth_rate_limits.window_started_at
            > NOW() - INTERVAL '15 minutes'
            AND auth_rate_limits.attempts + 1 >= $2
          THEN NOW() + INTERVAL '15 minutes'
          ELSE NULL
        END,

        updated_at = NOW()
    `,
    [key, MAX_ATTEMPTS]
  );
}
