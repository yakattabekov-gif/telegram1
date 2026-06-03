-- ============================================================
-- Avatar Rotation Schema
-- ============================================================

CREATE TABLE IF NOT EXISTS user_avatars (
    id BIGSERIAL PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_avatars_owner ON user_avatars (owner_id);

-- Create bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', false) 
ON CONFLICT DO NOTHING;

-- Policies for storage (allow edge functions to access)
-- Since Edge Functions use service_role, RLS is bypassed. 
-- We enable RLS on the table.
ALTER TABLE user_avatars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON user_avatars
    FOR ALL USING (true) WITH CHECK (true);
