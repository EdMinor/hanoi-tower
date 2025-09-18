import { useState, useCallback, useEffect } from 'react';
import { GameState, Move } from '@/types/game';

export const useGame = (initialDiscCount: number = 4) => {
  const [gameState, setGameState] = useState<GameState>({
    towers: [[], [], []],
    selectedTower: null,
    moveCount: 0,
    targetTower: 0, // Будет случайно выбрана при запуске игры
    gameStarted: false,
    gameCompleted: false,
    moveHistory: [],
    discCount: initialDiscCount,
    startTime: null,
    endTime: null,
  });

  // Инициализация игры
  const startGame = useCallback(() => {
    const newTowers: number[][] = [[], [], []];
    
    // Случайный выбор башни для размещения дисков (0, 1 или 2)
    const randomStartTower = Math.floor(Math.random() * 3);
    
    // Размещаем диски на случайной башне
    for (let i = gameState.discCount; i > 0; i--) {
      newTowers[randomStartTower].push(i);
    }
    
    // Случайный выбор целевой башни (не та, где диски)
    const availableTargets = [0, 1, 2].filter(tower => tower !== randomStartTower);
    const randomTargetTower = availableTargets[Math.floor(Math.random() * availableTargets.length)];
    
    setGameState(prev => ({
      ...prev,
      towers: newTowers,
      moveCount: 0,
      gameStarted: true,
      gameCompleted: false,
      moveHistory: [],
      selectedTower: null,
      targetTower: randomTargetTower,
      startTime: new Date(),
      endTime: null,
    }));
  }, [gameState.discCount]);

  // Сброс игры
  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      towers: [[], [], []],
      moveCount: 0,
      gameStarted: false,
      gameCompleted: false,
      moveHistory: [],
      selectedTower: null,
      targetTower: 1, // Будет случайно выбрана при следующем запуске
      startTime: null,
      endTime: null,
    }));
  }, []);

  // Валидация хода
  const isValidMove = useCallback((from: number, to: number, towers: number[][]): boolean => {
    if (towers[from].length === 0) return false;
    
    const disc = towers[from][towers[from].length - 1];
    
    if (towers[to].length === 0) return true;
    
    const topDisc = towers[to][towers[to].length - 1];
    return disc < topDisc;
  }, []);

  // Выполнение хода
  const makeMove = useCallback((from: number, to: number): boolean => {
    if (!gameState.gameStarted || gameState.gameCompleted) return false;
    
    if (!isValidMove(from, to, gameState.towers)) return false;

    const disc = gameState.towers[from][gameState.towers[from].length - 1];
    const newMove: Move = {
      from,
      to,
      disc,
      timestamp: new Date(),
    };

    setGameState(prev => {
      const newTowers = [...prev.towers];
      newTowers[from] = [...newTowers[from]];
      newTowers[to] = [...newTowers[to]];
      
      newTowers[from].pop();
      newTowers[to].push(disc);
      
      return {
        ...prev,
        towers: newTowers,
        moveCount: prev.moveCount + 1,
        moveHistory: [...prev.moveHistory, newMove],
        selectedTower: null,
      };
    });

    return true;
  }, [gameState.gameStarted, gameState.gameCompleted, gameState.towers, isValidMove]);

  // Выбор башни
  const selectTower = useCallback((towerIndex: number): boolean => {
    if (!gameState.gameStarted || gameState.gameCompleted) return false;

    if (gameState.selectedTower === null) {
      // Выбираем башню, если она не пустая
      if (gameState.towers[towerIndex].length > 0) {
        setGameState(prev => ({
          ...prev,
          selectedTower: towerIndex,
        }));
        return true;
      }
      return false;
    } else {
      // Пытаемся сделать ход
      if (gameState.selectedTower !== towerIndex) {
        return makeMove(gameState.selectedTower, towerIndex);
      } else {
        // Отменяем выбор, если кликнули на ту же башню
        setGameState(prev => ({
          ...prev,
          selectedTower: null,
        }));
        return false;
      }
    }
  }, [gameState.gameStarted, gameState.gameCompleted, gameState.selectedTower, gameState.towers, makeMove]);

  // Очистка выбора
  const clearSelection = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      selectedTower: null,
    }));
  }, []);

  // Установка количества дисков
  const setDiscCount = useCallback((count: number) => {
    if (count < 3 || count > 9) return;
    
    setGameState(prev => ({
      ...prev,
      discCount: count,
    }));
  }, []);

  // Установка целевой башни
  const setTargetTower = useCallback((towerIndex: number) => {
    if (towerIndex < 0 || towerIndex > 2) return;
    
    setGameState(prev => ({
      ...prev,
      targetTower: towerIndex,
    }));
  }, []);

  // Получение минимального количества ходов
  const getMinMoves = useCallback((): number => {
    return Math.pow(2, gameState.discCount) - 1;
  }, [gameState.discCount]);

  // Вычисление эффективности
  const getEfficiency = useCallback((): number => {
    const minMoves = getMinMoves();
    if (gameState.moveCount === 0) return 0;
    return Math.round((minMoves / gameState.moveCount) * 100);
  }, [gameState.moveCount, getMinMoves]);

  // Получение времени игры
  const getGameTime = useCallback((): number => {
    if (!gameState.startTime) return 0;
    const endTime = gameState.endTime || new Date();
    return Math.floor((endTime.getTime() - gameState.startTime.getTime()) / 1000);
  }, [gameState.startTime, gameState.endTime]);

  // Отмена последнего хода
  const undoMove = useCallback((): boolean => {
    if (gameState.moveHistory.length === 0) return false;

    const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];
    
    setGameState(prev => {
      const newTowers = [...prev.towers];
      newTowers[lastMove.to] = [...newTowers[lastMove.to]];
      newTowers[lastMove.from] = [...newTowers[lastMove.from]];
      
      newTowers[lastMove.to].pop();
      newTowers[lastMove.from].push(lastMove.disc);
      
      return {
        ...prev,
        towers: newTowers,
        moveCount: prev.moveCount - 1,
        moveHistory: prev.moveHistory.slice(0, -1),
        selectedTower: null,
      };
    });

    return true;
  }, [gameState.moveHistory]);

  // Получение подсказки (следующий оптимальный ход)
  const getHint = useCallback((): { from: number; to: number } | null => {
    if (!gameState.gameStarted || gameState.gameCompleted) return null;

    // Простой алгоритм подсказки - найти диск, который можно переместить
    for (let from = 0; from < 3; from++) {
      if (gameState.towers[from].length === 0) continue;
      
      for (let to = 0; to < 3; to++) {
        if (from === to) continue;
        
        if (isValidMove(from, to, gameState.towers)) {
          return { from, to };
        }
      }
    }
    
    return null;
  }, [gameState.gameStarted, gameState.gameCompleted, gameState.towers, isValidMove]);

  // Проверка победы
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameCompleted) return;

    const targetTower = gameState.towers[gameState.targetTower];
    if (targetTower.length === gameState.discCount) {
      // Проверяем, что диски расположены в правильном порядке
      let isCorrect = true;
      for (let i = 0; i < targetTower.length - 1; i++) {
        if (targetTower[i] <= targetTower[i + 1]) {
          isCorrect = false;
          break;
        }
      }

      if (isCorrect) {
        setGameState(prev => ({
          ...prev,
          gameCompleted: true,
          endTime: new Date(),
        }));
      }
    }
  }, [gameState.towers, gameState.targetTower, gameState.discCount, gameState.gameStarted, gameState.gameCompleted]);

  return {
    // Состояние игры
    gameState,
    
    // Действия
    startGame,
    resetGame,
    makeMove,
    selectTower,
    clearSelection,
    
    // Настройки
    setDiscCount,
    setTargetTower,
    
    // Статистика
    getMinMoves,
    getEfficiency,
    getGameTime,
    
    // История
    undoMove,
    getMoveHistory: () => gameState.moveHistory,
    
    // Подсказки
    getHint,
  };
};
