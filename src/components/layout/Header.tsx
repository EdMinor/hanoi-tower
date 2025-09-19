import React from 'react';
import { HeaderProps } from '@/types/ui';
import ThemeToggle from '../ui/ThemeToggle';
import SoundToggle from '../ui/SoundToggle';

const Header: React.FC<HeaderProps> = ({
  title,
  onToggleTheme,
  onToggleSound,
  theme,
  soundEnabled,
  className = '',
}) => {
  return (
    <header className={`text-center mb-4 sm:mb-6 md:mb-8 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto gap-4">
        {/* Center - Title */}
        <div className="flex-1 order-2 sm:order-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground hidden sm:block">
            Классическая головоломка с современным интерфейсом
          </p>
        </div>
        
        {/* Right side - Controls */}
        <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2">
          <ThemeToggle
            theme={theme}
            onToggle={onToggleTheme}
          />
          <SoundToggle
            soundEnabled={soundEnabled}
            onToggle={onToggleSound}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
