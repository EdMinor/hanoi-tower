// UI типы для компонентов

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
  className?: string;
}

export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

export interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
  className?: string;
}

export interface StatsProps {
  moveCount: number;
  minMoves: number;
  efficiency: number;
  gameTime?: number;
  className?: string;
}

export interface HeaderProps {
  title: string;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  className?: string;
}
