CREATE TABLE IF NOT EXISTS auth_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  blocked_until TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_auth_rate_limits_blocked_until
ON auth_rate_limits(blocked_until);

CREATE INDEX IF NOT EXISTS idx_auth_rate_limits_updated_at
ON auth_rate_limits(updated_at);

ALTER TABLE auth_rate_limits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS deny_public_auth_rate_limits
ON auth_rate_limits;

CREATE POLICY deny_public_auth_rate_limits
ON auth_rate_limits
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS deny_authenticated_auth_rate_limits
ON auth_rate_limits;

CREATE POLICY deny_authenticated_auth_rate_limits
ON auth_rate_limits
FOR ALL
TO authenticated
USING (false)
WITH CHECK (false);
