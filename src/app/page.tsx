'use client';

import React from 'react';
import { useGame } from '@/hooks/useGame';
import { useTheme } from '@/hooks/useTheme';
import { useSound } from '@/hooks/useSound';
import GameBoard from '@/components/game/GameBoard';
import GameControls from '@/components/game/GameControls';
import GameObjective from '@/components/game/GameObjective';
import GameRules from '@/components/game/GameRules';
import Stats from '@/components/ui/Stats';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';

export default function Home() {
  const {
    gameState,
    startGame,
    resetGame,
    selectTower,
    setDiscCount,
    getMinMoves,
    getEfficiency,
    getGameTime,
  } = useGame(4);

  const { theme, toggleTheme } = useTheme();
  const { 
    soundEnabled, 
    toggleSound, 
    playError, 
    playVictory, 
    playClick, 
    playSelect, 
    playDrop, 
    playStart, 
    playReset 
  } = useSound();

  const [showVictoryModal, setShowVictoryModal] = React.useState(false);
  const victoryModalShownRef = React.useRef(false);

  // Функция для закрытия модалки победы без сброса игры
  const closeVictoryModal = React.useCallback(() => {
    setShowVictoryModal(false);
  }, []);

  // Обработка клика по башне
  const handleTowerClick = React.useCallback((towerIndex: number) => {
    const success = selectTower(towerIndex);
    if (success) {
      // Проверяем, был ли это выбор башни или перемещение
      if (gameState.selectedTower === null) {
        playSelect(); // Звук выбора башни
      } else {
        playDrop(); // Звук размещения диска
      }
    } else {
      playError();
    }
  }, [selectTower, playSelect, playDrop, playError, gameState.selectedTower]);


  // Клавиатурное управление
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Управление башнями клавишами 1, 2, 3 (только во время игры)
      if ((key === '1' || key === '2' || key === '3') && gameState.gameStarted && !gameState.gameCompleted) {
        const towerIndex = parseInt(key) - 1;
        handleTowerClick(towerIndex);
      }
      
      // Дополнительные клавиши (всегда доступны)
      if (key === 'r' || key === 'R') {
        playReset();
        resetGame();
      }
      if (key === 'n' || key === 'N') {
        playStart();
        startGame();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameStarted, gameState.gameCompleted, handleTowerClick, resetGame, startGame, playReset, playStart]);

  // Показ модального окна победы
  React.useEffect(() => {
    if (gameState.gameCompleted && !showVictoryModal && !victoryModalShownRef.current) {
      setShowVictoryModal(true);
      victoryModalShownRef.current = true;
      playVictory();
    }
  }, [gameState.gameCompleted, showVictoryModal, playVictory]);

  // Сброс флага показа модалки при новой игре
  React.useEffect(() => {
    if (!gameState.gameStarted) {
      victoryModalShownRef.current = false;
    }
  }, [gameState.gameStarted]);

  // Сброс флага показа модалки при начале новой игры
  React.useEffect(() => {
    if (gameState.gameStarted && !gameState.gameCompleted) {
      victoryModalShownRef.current = false;
    }
  }, [gameState.gameStarted, gameState.gameCompleted]);

  const minMoves = getMinMoves();
  const efficiency = getEfficiency();
  const gameTime = getGameTime();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <Header
          title="Ханойская башня"
          onToggleTheme={toggleTheme}
          onToggleSound={toggleSound}
          theme={theme}
          soundEnabled={soundEnabled}
        />

        {/* Game Area */}
        <div className="max-w-6xl mx-auto">
          {/* Stats - над башнями по центру (только во время игры) */}
          {gameState.gameStarted && (
            <div className="mb-2 sm:mb-4 flex justify-center">
              <Stats
                moveCount={gameState.moveCount}
                minMoves={minMoves}
                efficiency={efficiency}
                gameTime={gameTime}
              />
            </div>
          )}

          {/* Game Objective - над башнями (только во время игры) */}
          {gameState.gameStarted && gameState.targetTower !== 0 && (
            <GameObjective targetTower={gameState.targetTower} />
          )}

          {/* Game Board */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <GameBoard
              gameState={gameState}
              onTowerClick={handleTowerClick}
            />
          </div>
          
          {/* Game Rules */}
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div className="w-full max-w-md">
              <GameRules />
            </div>
          </div>
          
          {/* Keyboard Controls Info - скрыть на мобильных */}
          <div className="mb-4 sm:mb-6 text-center hidden sm:block">
            <div className="inline-flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 bg-card/50 rounded-lg text-xs sm:text-sm text-muted-foreground">
              <span className="font-medium">Клавиатурное управление:</span>
              <span>1,2,3 - башни</span>
              <span>R - сброс</span>
              <span>N - новая игра</span>
            </div>
          </div>

          {/* Controls - по центру под башнями */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <GameControls
                gameState={gameState}
                onStartGame={startGame}
                onResetGame={resetGame}
                onSetDiscCount={setDiscCount}
                onPlayClick={playClick}
              />
            </div>
          </div>
        </div>

        {/* Victory Modal */}
        <Modal
          isOpen={showVictoryModal}
          onClose={closeVictoryModal}
          title="🎉 Поздравляем!"
          size="md"
        >
          <div className="text-center">
            <p className="text-lg text-gray-900 dark:text-gray-100 mb-6">
              Вы успешно решили головоломку за <strong>{gameState.moveCount}</strong> ходов!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Минимальное количество ходов: <strong>{minMoves}</strong><br />
              Эффективность: <strong>{efficiency}%</strong>
            </p>
            <div className="flex justify-center">
              <Button
                onClick={closeVictoryModal}
                variant="primary"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
