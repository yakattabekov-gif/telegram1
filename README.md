# 🤖 Telegram Business Bot

Автоответчик для Telegram Business аккаунта на базе **Gemini 2.5 Flash Lite**.

## Возможности

- 🧠 **Gemini AI** — генерация ответов с поддержкой фото, видео, аудио, голосовых
- 🎭 **Имитация человека** — прочитано (✅✅), "печатает...", "слушает аудио", опечатки
- 🖼 **Умные стикеры** — Gemini выбирает подходящий стикер по контексту (не рандом!)
- ⏸ **Кулдаун** — если вы ответили клиенту, бот молчит 8 минут
- ⚙️ **Настраиваемый промпт** — задайте как бот должен общаться
- 🧠 **Обучение на истории** — загрузите переписку и бот скопирует ваш стиль
- 🔒 **Защита от зацикливания** — бот не отвечает на свои сообщения
- 🛡️ **Prompt injection защита** — фильтрация попыток взлома промпта

## Стек

- **Runtime:** Deno (Supabase Edge Functions)
- **Bot Framework:** grammY v1.43
- **AI:** Google Gemini 2.5 Flash Lite
- **Database:** PostgreSQL (Supabase)
- **Deploy:** Supabase + Webhook

## Быстрый старт

### 1. Создайте проект в Supabase

1. [app.supabase.com](https://app.supabase.com) → New Project
2. Запишите **Project URL**, **Service Role Key**, **Project Ref**

### 2. Создайте таблицы

1. SQL Editor → вставьте содержимое `supabase/migrations/001_initial_schema.sql` → Run

### 3. Установите секреты

```bash
supabase login
supabase link --project-ref ВАШ_PROJECT_REF

supabase secrets set BOT_TOKEN="токен_от_BotFather"
supabase secrets set GEMINI_API_KEY="ключ_из_aistudio"
supabase secrets set SUPABASE_URL="https://ваш-проект.supabase.co"
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="ваш_service_role_ключ"
supabase secrets set SYSTEM_PROMPT="Ты обычный человек, общаешься в Telegram..."
```

### 4. Задеплойте Edge Function

```bash
supabase functions deploy telegram-bot --no-verify-jwt
```

### 5. Установите Webhook

```bash
curl "https://api.telegram.org/botВАШ_BOT_TOKEN/setWebhook?url=https://ВАШ_PROJECT_REF.supabase.co/functions/v1/telegram-bot"
```

### 6. Подключите Telegram Business

1. Telegram → Настройки → Telegram Business
2. Подключите вашего бота как бизнес-бота

## Управление ботом

Отправьте `/start` вашему боту в личке. Доступные функции:

| Кнопка | Действие |
|--------|----------|
| ⚙️ Изменить промпт | Задать новый системный промпт |
| 🧠 Обучить на истории | Загрузить JSON-экспорт переписки |
| 🖼 Мои стикеры | Посмотреть количество стикеров |
| ❌ Очистить стикеры | Удалить все стикеры |
| 🧹 Очистить чат клиента | Очистить историю конкретного чата |
| 🗑 Очистить всю историю | Очистить всю историю |
| ⏸ Кулдаун | Вкл/выкл кулдаун (8 мин) |

**Добавление стикеров:** просто отправьте любой стикер боту — он загрузит весь стикерпак.

## Защита от багов

| Проблема | Решение |
|----------|---------|
| Бот отвечает сам себе (зацикливание) | `message.from.is_bot` → пропуск |
| Двойная обработка в serverless | Таблица `processed_messages` с уникальным ключом |
| Бот отвечает когда вы сами пишете | Кулдаун 8 минут после вашего сообщения |
| Потеря connection_id | Self-healing: автовосстановление связи |
| Gemini упал | Fallback: "Ой, что-то со связью..." |
| Файл не скачался | Продолжает без медиа |
| Стикер не отправился | Молча пропускает |
| Webhook timeout | Всегда возвращает 200 OK |
