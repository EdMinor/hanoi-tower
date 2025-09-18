// Основные типы для игры Ханойская башня

export interface GameState {
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

export interface Move {
  from: number;
  to: number;
  disc: number;
  timestamp: Date;
}

export interface GameConfig {
  discCount: number;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
  animationsEnabled: boolean;
}

export interface TowerProps {
  towerIndex: number;
  discs: number[];
  isSelected: boolean;
  isTarget: boolean;
  onClick: (towerIndex: number) => void;
  onHover?: (towerIndex: number) => void;
  onLeave?: (towerIndex: number) => void;
  className?: string;
}

export interface DiscProps {
  size: number;
  color?: string;
  isAnimating?: boolean;
  animationDelay?: number;
  className?: string;
}

export interface GameBoardProps {
  gameState: GameState;
  onTowerClick: (towerIndex: number) => void;
  onTowerHover?: (towerIndex: number) => void;
  onTowerLeave?: (towerIndex: number) => void;
  className?: string;
}

export interface GameControlsProps {
  gameState: GameState;
  onStartGame: () => void;
  onResetGame: () => void;
  onSetDiscCount: (count: number) => void;
  onPlayClick?: () => void;
  className?: string;
}

export interface GameStatsProps {
  moveCount: number;
  minMoves: number;
  targetTower: number;
  gameTime?: number;
  efficiency?: number;
  className?: string;
}
