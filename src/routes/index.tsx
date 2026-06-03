import { createFileRoute } from '@tanstack/react-router'
import { Bot, Zap, Shield, MessageCircle, Sticker, Clock, Mic, Eye, Sparkles } from "lucide-react";

export const Route = createFileRoute('/')({
  component: Index,
})

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Gemini 2.5 Flash Lite",
    desc: "ИИ от Google генерирует ответы, понимает фото, видео, аудио и голосовые",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Прочитано ✅✅",
    desc: 'Бот отмечает сообщения как прочитанные — две синие галочки',
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: '"Печатает..."',
    desc: "Статус набора текста с задержкой, пропорциональной длине ответа",
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: '"Слушает аудио"',
    desc: "При голосовых сообщениях показывает статус прослушивания",
  },
  {
    icon: <Sticker className="w-6 h-6" />,
    title: "Умные стикеры",
    desc: "Gemini выбирает подходящий стикер по контексту — не рандом!",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Кулдаун 8 минут",
    desc: "Если вы ответили сами — бот молчит 8 минут, не вмешивается",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Защита от зацикливания",
    desc: "Дедупликация, anti-loop, prompt injection защита",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Обучение на стиле",
    desc: "Загрузите историю переписки и бот скопирует ваш стиль общения",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Webhook + Supabase",
    desc: "Serverless на Supabase Edge Functions — быстро, надёжно, бесплатно",
  },
];

const steps = [
  {
    num: "01",
    title: "Создайте Supabase проект",
    desc: "Зарегистрируйтесь на supabase.com и создайте новый проект",
  },
  {
    num: "02",
    title: "Выполните SQL миграцию",
    desc: "Запустите SQL из migrations/001_initial_schema.sql в SQL Editor",
  },
  {
    num: "03",
    title: "Установите секреты",
    desc: "BOT_TOKEN, GEMINI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY",
  },
  {
    num: "04",
    title: "Задеплойте Edge Function",
    desc: "supabase functions deploy telegram-bot --no-verify-jwt",
  },
  {
    num: "05",
    title: "Установите Webhook",
    desc: "curl setWebhook с URL вашей Edge Function",
  },
  {
    num: "06",
    title: "Подключите Telegram Business",
    desc: "В настройках Telegram подключите бота к бизнес-аккаунту",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Powered by Gemini 2.5 Flash Lite
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
              Telegram Business
            </span>
            <br />
            <span className="text-slate-100">AI Автоответчик</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Бот отвечает клиентам от вашего имени, имитируя поведение живого человека.
            Поддерживает фото, видео, аудио, стикеры и настраиваемый промпт.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/BotFather"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              <Bot className="w-5 h-5" />
              Создать бота в BotFather
            </a>
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-50 font-semibold transition-all duration-200 border border-slate-700 hover:-translate-y-0.5"
            >
              <Zap className="w-5 h-5" />
              Supabase Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Возможности</h2>
          <p className="text-slate-400 text-lg">Всё что нужно для автоматизации бизнес-чатов</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как настроить</h2>
          <p className="text-slate-400 text-lg">6 простых шагов до работающего бота</p>
        </div>
        
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex gap-5 items-start p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/20 transition-all duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center font-bold text-sm">
                {s.num}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-slate-400 text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bot commands */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Управление ботом</h2>
          <p className="text-slate-400 text-lg">Отправьте /start боту для доступа к панели</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { btn: "⚙️ Изменить промпт", desc: "Задать новый системный промпт" },
            { btn: "🧠 Обучить на истории", desc: "Загрузить JSON-экспорт переписки" },
            { btn: "🖼 Мои стикеры", desc: "Посмотреть количество стикеров" },
            { btn: "❌ Очистить стикеры", desc: "Удалить все стикеры из базы" },
            { btn: "🧹 Очистить чат", desc: "Очистить историю конкретного чата" },
            { btn: "⏸ Кулдаун", desc: "Вкл/выкл кулдаун (8 минут)" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-base font-medium whitespace-nowrap">{c.btn}</span>
              <span className="text-sm text-slate-400">{c.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" />
            <span>Telegram Business Bot</span>
          </div>
          <div>Gemini 2.5 Flash Lite • Supabase • grammY</div>
        </div>
      </footer>
    </div>
  );
}
