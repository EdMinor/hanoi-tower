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
    <header className={`text-center mb-8 ${className}`}>
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Left side - empty for balance */}
        <div className="w-16"></div>
        
        {/* Center - Title */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">
            Классическая головоломка с современным интерфейсом
          </p>
        </div>
        
        {/* Right side - Controls */}
        <div className="flex items-center gap-3">
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
