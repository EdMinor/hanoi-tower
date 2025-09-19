import React from 'react';
import { GameControlsProps } from '@/types/game';
import Button from '../ui/Button';
import { Play, RotateCcw } from 'lucide-react';

const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  onStartGame,
  onResetGame,
  onSetDiscCount,
  onPlayClick,
  className = '',
}) => {
  const discCountOptions = [3, 4, 5, 6];

  return (
    <div className={`bg-card text-card-foreground rounded-lg p-4 sm:p-6 shadow-md border ${className}`}>
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Main Controls - горизонтально */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          <Button
            onClick={() => {
              onPlayClick?.();
              onStartGame();
            }}
            disabled={gameState.gameStarted && !gameState.gameCompleted}
            icon={<Play size={16} />}
            variant="primary"
          >
            {gameState.gameStarted ? 'Новая игра' : 'Начать игру'}
          </Button>
          
          <Button
            onClick={() => {
              onPlayClick?.();
              onResetGame();
            }}
            disabled={!gameState.gameStarted}
            icon={<RotateCcw size={16} />}
            variant="secondary"
          >
            Сброс
          </Button>
          
        </div>

        {/* Settings - под кнопками */}
        {!gameState.gameStarted && (
          <div className="flex flex-col gap-2 items-center">
            <label className="text-xs sm:text-sm font-medium text-card-foreground text-center">
              Количество дисков:
            </label>
            <div className="flex gap-1 sm:gap-2">
              {discCountOptions.map(count => (
                <Button
                  key={count}
                  onClick={() => {
                    onPlayClick?.();
                    onSetDiscCount(count);
                  }}
                  variant={gameState.discCount === count ? 'primary' : 'secondary'}
                  size="sm"
                  className="min-w-[36px] sm:min-w-[40px] text-xs sm:text-sm"
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>


      {/* Victory Message */}
      {gameState.gameCompleted && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              🎉 Поздравляем!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Вы решили головоломку за {gameState.moveCount} ходов!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;
