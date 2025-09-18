import React from 'react';
import { SoundToggleProps } from '@/types/ui';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle: React.FC<SoundToggleProps> = ({
  soundEnabled,
  onToggle,
  className = '',
}) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none ${className}`}
      aria-label={`${soundEnabled ? 'Отключить' : 'Включить'} звук`}
    >
      {soundEnabled ? (
        <Volume2 size={20} />
      ) : (
        <VolumeX size={20} />
      )}
    </button>
  );
};

export default SoundToggle;
