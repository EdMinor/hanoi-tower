import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Убеждаемся, что компонент смонтирован
  useEffect(() => {
    setMounted(true);
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    console.log('Current theme before toggle:', theme);
    if (theme === 'light') {
      setTheme('dark');
      console.log('Setting theme to dark');
    } else {
      setTheme('light');
      console.log('Setting theme to light');
    }
  };

  // Установка конкретной темы
  const setThemeValue = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  // Получение CSS класса для темы
  const getThemeClass = () => {
    return theme === 'dark' ? 'dark' : 'light';
  };

  // Возвращаем значения только после монтирования
  if (!mounted) {
    return {
      theme: 'light' as const,
      isDark: false,
      toggleTheme,
      setTheme: setThemeValue,
      getThemeClass: () => 'light',
    };
  }

  return {
    theme: theme as 'light' | 'dark',
    isDark: theme === 'dark',
    toggleTheme,
    setTheme: setThemeValue,
    getThemeClass,
  };
};
