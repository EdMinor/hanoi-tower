import React from 'react';
import { ThemeToggleProps } from '@/types/ui';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
}) => {
  const handleToggle = () => {
    console.log('ThemeToggle clicked, current theme:', theme);
    console.log('HTML classes before toggle:', document.documentElement.className);
    onToggle();
    setTimeout(() => {
      console.log('HTML classes after toggle:', document.documentElement.className);
    }, 100);
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      aria-label={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
