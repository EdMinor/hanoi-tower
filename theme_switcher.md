# Реализация смены темы (dark/light) в Next.js с Tailwind CSS и next-themes

## Описание подхода

В проекте используется библиотека [next-themes](https://github.com/pacocoursey/next-themes) для управления темой, Tailwind CSS с поддержкой custom properties (CSS переменных) для стилизации, и переключатель темы на клиенте.

---

## Требования

- Next.js 13+ (желательно App Router)
- Tailwind CSS
- next-themes
- CSS custom properties для цветов

---

## Пошаговая инструкция

### 1. Установка зависимостей

```sh
npm install tailwindcss next-themes
```

---

### 2. Настройка Tailwind

В `tailwind.config.js`:

```js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        // ...другие переменные
      },
    },
  },
  // ...
}
```

---

### 3. Определение CSS переменных

В глобальном CSS (например, `src/app/globals.css`):

```css
:root {
  --background: #fafafa;
  --foreground: #18181b;
  --accent: #E53935;
  /* ...другие переменные */
}

.dark {
  --background: #1a1a1a;
  --foreground: #fafafa;
  --accent: #E53935;
  /* ... */
}
```

---

### 4. Подключение ThemeProvider

В корневом layout (например, `src/app/layout.tsx`):

```tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### 5. Реализация переключателя темы

Пример компонента `ThemeToggle.tsx`:

```tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
```

---

### 6. Использование Tailwind классов с переменными

```tsx
<div className="bg-background text-foreground border border-border">
  Контент
</div>
```

---

## Как это работает

- **next-themes** управляет классом `.dark` на html/body.
- **CSS переменные** определяют цвета для каждой темы.
- **Tailwind** использует эти переменные для своих классов.
- **ThemeToggle** меняет тему, вызывая `setTheme('dark'|'light')`.

---

## Итог

- Переключение темы без перезагрузки страницы.
- Единый источник правды для цветов (CSS custom properties).
- Tailwind классы автоматически подхватывают нужные цвета.
- Поддержка системной темы пользователя.

---