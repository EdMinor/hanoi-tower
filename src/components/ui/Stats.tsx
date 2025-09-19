import React from 'react';
import { StatsProps } from '@/types/ui';

const Stats: React.FC<StatsProps> = ({
  moveCount,
  minMoves,
  efficiency,
  gameTime,
  className = '',
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-card text-card-foreground rounded-lg p-2 sm:p-3 shadow-md border ${className}`}>
      <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            {moveCount}
          </div>
          <div className="text-xs text-muted-foreground">
            Ходов
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
            {minMoves}
          </div>
          <div className="text-xs text-muted-foreground">
            Минимум
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">
            {efficiency}%
          </div>
          <div className="text-xs text-muted-foreground">
            Эффективность
          </div>
        </div>
        
        {gameTime !== undefined && (
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400">
              {formatTime(gameTime)}
            </div>
            <div className="text-xs text-muted-foreground">
              Время
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
