# 💬 ChatFront
https://simmona-hub.github.io/chatfront
<div align="center"> 

![ChatFront Logo](https://img.shields.io/badge/ChatFront-AI%20Powered-blue?style=for-the-badge&logo=react)

**Современный AI чат-интерфейс с поддержкой OpenAI GPT**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-success?style=for-the-badge)](https://simmona-hub.github.io/chatfront)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/SIMMONA-hub/chatfront)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## ✨ Особенности

🤖 **AI-ассистент** - Интеграция с OpenAI GPT-4o-mini  
💬 **Множественные чаты** - AI помощник и персональные контакты  
🎨 **Современный UI** - Tailwind CSS с темной темой  
⚡ **Быстрая работа** - Vite + React 19  
💾 **Сохранение истории** - LocalStorage для персистентности  
📱 **Адаптивный дизайн** - Работает на всех устройствах  
🔒 **Безопасность** - Поддержка переменных окружения  

---

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- npm или yarn
- OpenAI API ключ

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/SIMMONA-hub/chatfront.git
cd chatfront

# Установка зависимостей
npm install

# Создание .env файла
echo "VITE_OPENAI_API_KEY=your_openai_api_key_here" > .env

# Запуск в режиме разработки
npm run dev
```

### Получение OpenAI API ключа

1. Зарегистрируйтесь на [OpenAI Platform](https://platform.openai.com/)
2. Перейдите в [API Keys](https://platform.openai.com/api-keys)
3. Создайте новый ключ
4. Добавьте его в `.env` файл

---

## 🛠️ Технологический стек

| Технология | Версия | Описание |
|------------|--------|----------|
| **React** | 19.1.0 | UI библиотека |
| **TypeScript** | 5.8.3 | Типизация |
| **Vite** | 6.3.5 | Сборщик |
| **Tailwind CSS** | 4.1.8 | Стилизация |
| **OpenAI SDK** | 5.1.0 | AI интеграция |
| **Framer Motion** | 12.16.0 | Анимации |
| **Lucide React** | 0.513.0 | Иконки |

---

## 🏗️ Архитектура проекта

```
chatfront/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 Layout/
│   │   │   └── MainLayout.tsx      # Основной компонент
│   │   └── 📁 ChatList/
│   │       └── ChatList.tsx        # Список чатов
│   ├── 📁 types/
│   │   └── index.ts               # TypeScript типы
│   ├── App.tsx                    # Корневой компонент
│   └── main.tsx                   # Точка входа
├── 📁 public/                     # Статические файлы
├── 📄 package.json                # Зависимости
├── 📄 vite.config.ts             # Конфигурация Vite
├── 📄 tailwind.config.js         # Конфигурация Tailwind
└── 📄 README.md                   # Этот файл
```

---

## 🎯 Основные функции

### 🤖 AI Ассистент
- Интеграция с OpenAI GPT-4o-mini
- Поддержка длинных диалогов
- Сохранение контекста разговора
- Индикаторы загрузки и статуса

### 💬 Система чатов
- Переключение между AI и персональными чатами
- Сохранение истории сообщений
- Автоскролл к новым сообщениям
- Timestamps для всех сообщений

### 🎨 Пользовательский интерфейс
- Темная тема по умолчанию
- Адаптивный дизайн
- Плавные анимации
- Интуитивная навигация

---

## ⚙️ Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Настройка OpenAI

В `src/components/Layout/MainLayout.tsx`:

```typescript
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
```

---

## 🚀 Деплой

### GitHub Pages

```bash
# Сборка и деплой
npm run build
npm run deploy
```

### Vercel

```bash
# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel
```

### Netlify

```bash
# Сборка
npm run build

# Загрузите папку dist на Netlify
```

---

## 🤝 Участие в разработке

Мы приветствуем вклад в развитие проекта! 

### Как внести свой вклад:

1. **Fork** репозитория
2. Создайте **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** изменения (`git commit -m 'Add amazing feature'`)
4. **Push** в branch (`git push origin feature/amazing-feature`)
5. Откройте **Pull Request**

### Стандарты кода:

- Используйте TypeScript
- Следуйте ESLint правилам
- Добавляйте комментарии к сложной логике
- Пишите описательные commit сообщения

---

## 📋 TODO

- [ ] 🔐 Аутентификация пользователей
- [ ] 📁 Экспорт/импорт чатов
- [ ] 🎨 Кастомизация тем
- [ ] 🔊 Голосовые сообщения
- [ ] 📸 Поддержка изображений
- [ ] 🌐 Мультиязычность
- [ ] 📊 Аналитика использования
- [ ] 🔄 Real-time синхронизация

---

## 🐛 Известные проблемы

- API ключи видны в production build (используйте proxy для production)
- LocalStorage ограничен размером (планируется IndexedDB)
- Нет обработки rate limiting OpenAI API

---

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. Подробности в файле [LICENSE](LICENSE).

---

## 👨‍💻 Автор

**SIMMONA**

- 💻 GitHub: [@SIMMONA-hub](https://github.com/SIMMONA-hub)
- 🌐 Live Demo: [ChatFront](https://simmona-hub.github.io/chatfront)

---

## 🙏 Благодарности

- [OpenAI](https://openai.com/) за потрясающий API
- [React Team](https://reactjs.org/) за великолепную библиотеку
- [Tailwind CSS](https://tailwindcss.com/) за современные стили
- [Vite](https://vitejs.dev/) за быструю сборку

---

<div align="center">

**⭐ Если проект понравился, поставьте звезду!**

*Сделано с ❤️ и кофе ☕*

</div>
