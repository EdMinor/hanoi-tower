import React from 'react';
import { HeaderProps } from '@/types/ui';
import ThemeToggle from '../ui/ThemeToggle';
import SoundToggle from '../ui/SoundToggle';
import AboutModal from '../ui/AboutModal';

const Header: React.FC<HeaderProps> = ({
  title,
  onToggleTheme,
  onToggleSound,
  theme,
  soundEnabled,
  className = '',
}) => {
  const [showAbout, setShowAbout] = React.useState(false);
  return (
    <header className={`text-center mb-4 sm:mb-6 md:mb-8 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto gap-4">
        {/* Center - Title */}
        <div className="flex-1 order-2 sm:order-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground hidden sm:block">
            Классическая головоломка онлайн
          </p>
        </div>
        
        {/* Right side - Controls */}
        <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2">
          <button
            onClick={() => setShowAbout(true)}
            className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xs sm:text-sm"
            aria-label="Открыть информацию о проекте"
          >
            О проекте
          </button>
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
      
      {/* About Modal */}
      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />
    </header>
  );
};

export default Header;
