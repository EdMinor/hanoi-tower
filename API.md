# 📚 API Документация - Ханойская башня

## 🎮 Game API

### Типы данных

```typescript
// Основные типы игры
interface GameState {
  towers: number[][];
  selectedTower: number | null;
  moveCount: number;
  targetTower: number;
  gameStarted: boolean;
  gameCompleted: boolean;
  moveHistory: Move[];
  discCount: number;
  startTime: Date | null;
  endTime: Date | null;
}

interface Move {
  from: number;
  to: number;
  disc: number;
  timestamp: Date;
}

interface GameConfig {
  discCount: number;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
  animationsEnabled: boolean;
}
```

### Хуки (Hooks)

#### useGame
Основной хук для управления игровым состоянием.

```typescript
const useGame = (initialDiscCount: number = 4) => {
  // Возвращает:
  return {
    // Состояние игры
    gameState: GameState;
    
    // Действия
    startGame: () => void;
    resetGame: () => void;
    makeMove: (from: number, to: number) => boolean;
    selectTower: (towerIndex: number) => void;
    clearSelection: () => void;
    
    // Настройки
    setDiscCount: (count: number) => void;
    setTargetTower: (towerIndex: number) => void;
    
    // Статистика
    getMinMoves: () => number;
    getEfficiency: () => number;
    getGameTime: () => number;
    
    // История
    undoMove: () => boolean;
    getMoveHistory: () => Move[];
  };
};
```

**Пример использования:**
```typescript
const {
  gameState,
  startGame,
  makeMove,
  selectTower,
  clearSelection,
  getMinMoves
} = useGame(5);

// Запуск игры
startGame();

// Выбор башни
selectTower(0);

// Перемещение диска
const success = makeMove(0, 1);
```

#### useSound
Хук для управления звуковыми эффектами.

```typescript
const useSound = () => {
  return {
    // Настройки
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
    
    // Звуки
    playMove: () => void;
    playError: () => void;
    playVictory: () => void;
    playClick: () => void;
    
    // Управление
    mute: () => void;
    unmute: () => void;
  };
};
```

**Пример использования:**
```typescript
const { playMove, playError, soundEnabled } = useSound();

// Воспроизведение звука при перемещении
if (makeMove(from, to)) {
  playMove();
} else {
  playError();
}
```

#### useTheme
Хук для управления темой приложения.

```typescript
const useTheme = () => {
  return {
    // Состояние
    theme: 'light' | 'dark';
    isDark: boolean;
    
    // Действия
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
    
    // Утилиты
    getThemeClass: () => string;
  };
};
```

**Пример использования:**
```typescript
const { theme, toggleTheme, isDark } = useTheme();

return (
  <button onClick={toggleTheme}>
    {isDark ? '☀️' : '🌙'}
  </button>
);
```

#### useLocalStorage
Хук для работы с localStorage.

```typescript
const useLocalStorage = <T>(key: string, initialValue: T) => {
  return {
    value: T;
    setValue: (value: T) => void;
    removeValue: () => void;
    clearAll: () => void;
  };
};
```

**Пример использования:**
```typescript
const { value: settings, setValue: setSettings } = useLocalStorage('game-settings', {
  discCount: 4,
  soundEnabled: true,
  theme: 'light'
});
```

## 🎯 Компоненты API

### GameBoard
Основной компонент игрового поля.

```typescript
interface GameBoardProps {
  gameState: GameState;
  onTowerClick: (towerIndex: number) => void;
  onTowerHover?: (towerIndex: number) => void;
  onTowerLeave?: (towerIndex: number) => void;
  className?: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onTowerClick,
  onTowerHover,
  onTowerLeave,
  className
}) => {
  // Реализация компонента
};
```

**Пропсы:**
- `gameState` - текущее состояние игры
- `onTowerClick` - обработчик клика по башне
- `onTowerHover` - обработчик наведения на башню (опционально)
- `onTowerLeave` - обработчик ухода с башни (опционально)
- `className` - дополнительные CSS классы

### Tower
Компонент отдельной башни.

```typescript
interface TowerProps {
  towerIndex: number;
  discs: number[];
  isSelected: boolean;
  isTarget: boolean;
  onClick: (towerIndex: number) => void;
  onHover?: (towerIndex: number) => void;
  onLeave?: (towerIndex: number) => void;
  className?: string;
}

const Tower: React.FC<TowerProps> = ({
  towerIndex,
  discs,
  isSelected,
  isTarget,
  onClick,
  onHover,
  onLeave,
  className
}) => {
  // Реализация компонента
};
```

### Disc
Компонент отдельного диска.

```typescript
interface DiscProps {
  size: number;
  color: string;
  isAnimating?: boolean;
  animationDelay?: number;
  className?: string;
}

const Disc: React.FC<DiscProps> = ({
  size,
  color,
  isAnimating = false,
  animationDelay = 0,
  className
}) => {
  // Реализация компонента
};
```

### GameControls
Панель управления игрой.

```typescript
interface GameControlsProps {
  gameState: GameState;
  onStartGame: () => void;
  onResetGame: () => void;
  onSetDiscCount: (count: number) => void;
  onShowHint: () => void;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  className?: string;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  onStartGame,
  onResetGame,
  onSetDiscCount,
  onShowHint,
  onToggleTheme,
  onToggleSound,
  className
}) => {
  // Реализация компонента
};
```

### GameStats
Компонент статистики игры.

```typescript
interface GameStatsProps {
  moveCount: number;
  minMoves: number;
  targetTower: number;
  gameTime?: number;
  efficiency?: number;
  className?: string;
}

const GameStats: React.FC<GameStatsProps> = ({
  moveCount,
  minMoves,
  targetTower,
  gameTime,
  efficiency,
  className
}) => {
  // Реализация компонента
};
```

## 🎨 UI Компоненты API

### Button
Универсальный компонент кнопки.

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  className
}) => {
  // Реализация компонента
};
```

**Примеры использования:**
```typescript
// Основная кнопка
<Button onClick={startGame}>
  Начать игру
</Button>

// Кнопка с иконкой
<Button 
  variant="secondary" 
  icon={<RotateCcw size={16} />}
  onClick={resetGame}
>
  Сброс
</Button>

// Загружающаяся кнопка
<Button 
  loading={isLoading}
  disabled={isLoading}
>
  Сохранение...
</Button>
```

### Modal
Компонент модального окна.

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closable = true,
  className
}) => {
  // Реализация компонента
};
```

**Пример использования:**
```typescript
<Modal 
  isOpen={showVictory}
  onClose={() => setShowVictory(false)}
  title="🎉 Поздравляем!"
  size="md"
>
  <div className="text-center">
    <p>Вы решили головоломку за {moveCount} ходов!</p>
    <Button onClick={playAgain}>
      Играть снова
    </Button>
  </div>
</Modal>
```

### ThemeToggle
Переключатель темы.

```typescript
interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className
}) => {
  // Реализация компонента
};
```

## 🎭 Анимации API

### Framer Motion конфигурация

```typescript
// Анимации дисков
export const discVariants = {
  initial: { 
    scale: 1, 
    y: 0,
    opacity: 1
  },
  animate: { 
    scale: [1, 1.1, 1],
    y: [0, -10, 0],
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: { 
      duration: 0.2 
    }
  },
  move: {
    y: -20,
    scale: 1.1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

// Анимации башен
export const towerVariants = {
  idle: { 
    scale: 1, 
    backgroundColor: "rgba(0,0,0,0)" 
  },
  selected: { 
    scale: 1.05, 
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    transition: { 
      duration: 0.2 
    }
  },
  target: {
    borderColor: "#f59e0b",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(0,0,0,0.05)",
    transition: {
      duration: 0.2
    }
  }
};
```

### Использование анимаций

```typescript
import { motion } from 'framer-motion';
import { discVariants, towerVariants } from '@/utils/animations';

// Анимированный диск
<motion.div
  variants={discVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  whileHover="hover"
  className="disc"
>
  {disc}
</motion.div>

// Анимированная башня
<motion.div
  variants={towerVariants}
  animate={isSelected ? "selected" : "idle"}
  whileHover="hover"
  className="tower"
>
  {/* Содержимое башни */}
</motion.div>
```

## 🔧 Утилиты API

### Игровая логика

```typescript
// Валидация хода
export const isValidMove = (
  from: number, 
  to: number, 
  towers: number[][]
): boolean => {
  if (towers[from].length === 0) return false;
  
  const disc = towers[from][towers[from].length - 1];
  
  if (towers[to].length === 0) return true;
  
  const topDisc = towers[to][towers[to].length - 1];
  return disc < topDisc;
};

// Получение оптимального количества ходов
export const getMinMoves = (discCount: number): number => {
  return Math.pow(2, discCount) - 1;
};

// Вычисление эффективности
export const getEfficiency = (moves: number, minMoves: number): number => {
  return Math.round((minMoves / moves) * 100);
};

// Алгоритм решения
export const solveHanoi = (n: number): Move[] => {
  const moves: Move[] = [];
  
  const hanoi = (n: number, from: number, to: number, aux: number) => {
    if (n === 1) {
      moves.push({ from, to, disc: 1, timestamp: new Date() });
      return;
    }
    
    hanoi(n - 1, from, aux, to);
    moves.push({ from, to, disc: n, timestamp: new Date() });
    hanoi(n - 1, aux, to, from);
  };
  
  hanoi(n, 0, 2, 1);
  return moves;
};
```

### Звуковые эффекты

```typescript
// Менеджер звуков
export class SoundManager {
  private audioContext: AudioContext;
  private sounds: Map<string, () => void> = new Map();
  
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.initializeSounds();
  }
  
  private initializeSounds() {
    this.sounds.set('move', this.createSound(800, 0.1));
    this.sounds.set('error', this.createSound(200, 0.2));
    this.sounds.set('victory', this.createSound(1000, 0.5));
    this.sounds.set('click', this.createSound(600, 0.1));
  }
  
  private createSound(frequency: number, duration: number) {
    return () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    };
  }
  
  play(soundName: string) {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound();
    }
  }
}
```

### Локальное хранилище

```typescript
// Утилиты для работы с localStorage
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    localStorage.clear();
  }
};

// Ключи для хранения
export const STORAGE_KEYS = {
  GAME_SETTINGS: 'hanoi-game-settings',
  THEME: 'hanoi-theme',
  SOUND_ENABLED: 'hanoi-sound-enabled',
  GAME_STATS: 'hanoi-game-stats'
} as const;
```

## 🧪 Тестирование API

### Тестовые утилиты

```typescript
// Тестовые данные
export const createTestGameState = (discCount: number = 4): GameState => ({
  towers: [Array.from({ length: discCount }, (_, i) => discCount - i), [], []],
  selectedTower: null,
  moveCount: 0,
  targetTower: 2,
  gameStarted: true,
  gameCompleted: false,
  moveHistory: [],
  discCount,
  startTime: new Date(),
  endTime: null
});

// Моки для тестов
export const mockGameActions = {
  startGame: jest.fn(),
  resetGame: jest.fn(),
  makeMove: jest.fn(),
  selectTower: jest.fn(),
  clearSelection: jest.fn()
};
```

### Примеры тестов

```typescript
// Тест игровой логики
describe('Game Logic', () => {
  test('should validate moves correctly', () => {
    const towers = [[3, 2, 1], [], []];
    
    expect(isValidMove(0, 1, towers)).toBe(true);
    expect(isValidMove(0, 2, towers)).toBe(true);
    expect(isValidMove(1, 0, towers)).toBe(false);
  });
  
  test('should calculate minimum moves', () => {
    expect(getMinMoves(3)).toBe(7);
    expect(getMinMoves(4)).toBe(15);
    expect(getMinMoves(5)).toBe(31);
  });
});

// Тест компонентов
describe('GameBoard Component', () => {
  test('should render towers correctly', () => {
    const gameState = createTestGameState(3);
    
    render(
      <GameBoard 
        gameState={gameState}
        onTowerClick={jest.fn()}
      />
    );
    
    expect(screen.getAllByTestId(/tower-/)).toHaveLength(3);
  });
});
```

---

**Версия API:** 1.0  
**Последнее обновление:** $(date)  
**Статус:** В разработке
