-- ============================================================
-- Telegram Business Bot — Supabase PostgreSQL Schema
-- Version 2.0 — QA-tested, production-ready
-- ============================================================

-- 1. История сообщений (контекст для Gemini)
CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    chat_id BIGINT NOT NULL,
    connection_id TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL CHECK (role IN ('user', 'model')),
    content TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_chat_connection 
    ON messages (chat_id, connection_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at 
    ON messages (created_at);

-- 2. Бизнес-соединения (маппинг connection_id → owner_id)
CREATE TABLE IF NOT EXISTS connections (
    connection_id TEXT PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_connections_owner 
    ON connections (owner_id);

-- 3. Настройки владельца (промпт, сессия, конфиги)
CREATE TABLE IF NOT EXISTS owner_settings (
    owner_id BIGINT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (owner_id, key)
);

-- 4. Паузы чатов (кулдаун после ответа владельца)
CREATE TABLE IF NOT EXISTS paused_chats (
    chat_id BIGINT PRIMARY KEY,
    paused_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Стикеры с эмодзи для умного выбора
CREATE TABLE IF NOT EXISTS stickers (
    id BIGSERIAL PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    file_id TEXT NOT NULL,
    emoji TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (owner_id, file_id)
);

CREATE INDEX IF NOT EXISTS idx_stickers_owner 
    ON stickers (owner_id);

-- 6. Лог обработанных сообщений (защита от дублей в serverless)
-- При параллельных вебхук-вызовах предотвращает двойную обработку
CREATE TABLE IF NOT EXISTS processed_messages (
    message_id BIGINT NOT NULL,
    chat_id BIGINT NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (message_id, chat_id)
);

-- Автоочистка старых записей (старше 1 часа) — можно вызывать по cron
CREATE OR REPLACE FUNCTION cleanup_processed_messages()
RETURNS void AS $$
BEGIN
    DELETE FROM processed_messages WHERE processed_at < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Row Level Security
-- Edge Functions используют service_role key → RLS не блокирует
-- ============================================================

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE paused_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE stickers ENABLE ROW LEVEL SECURITY;
ALTER TABLE processed_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON messages
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON connections
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON owner_settings
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON paused_chats
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON stickers
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON processed_messages
    FOR ALL USING (true) WITH CHECK (true);
