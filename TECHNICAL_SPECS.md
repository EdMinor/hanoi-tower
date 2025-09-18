# 🔧 Технические спецификации - Ханойская башня

## 📋 Технический стек

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.0+
- **Styling:** Tailwind CSS 3.4+
- **Animations:** Framer Motion 11.0+
- **Icons:** Lucide React 0.400+
- **State Management:** React Hooks + Context API

### Development Tools
- **Package Manager:** npm 10.0+
- **Linting:** ESLint 8.0+ + Prettier 3.0+
- **Type Checking:** TypeScript Compiler
- **Testing:** Jest 29.0+ + React Testing Library 14.0+
- **E2E Testing:** Playwright 1.40+

### Deployment
- **Platform:** Vercel
- **CDN:** Vercel Edge Network
- **Domain:** Custom domain (hanoi.yourportfolio.com)
- **SSL:** Automatic Let's Encrypt

## 🏗️ Архитектура компонентов

### Иерархия компонентов
```
App
├── Layout
│   ├── Header
│   ├── Navigation
│   └── Footer
├── GamePage
│   ├── GameBoard
│   │   ├── Tower (×3)
│   │   │   └── Disc (×n)
│   │   └── GameArea
│   ├── GameControls
│   │   ├── DiscSelector
│   │   ├── ActionButtons
│   │   └── ThemeToggle
│   ├── GameStats
│   │   ├── MoveCounter
│   │   ├── MinMoves
│   │   └── Efficiency
│   └── VictoryModal
└── AboutPage
    ├── GameDescription
    ├── AlgorithmExplanation
    └── DeveloperInfo
```

## 🎮 Игровая логика

### Состояние игры
```typescript
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
```

### Алгоритм валидации ходов
```typescript
function isValidMove(from: number, to: number, towers: number[][]): boolean {
  // Проверка на пустую исходную башню
  if (towers[from].length === 0) return false;
  
  // Получение верхнего диска
  const disc = towers[from][towers[from].length - 1];
  
  // Проверка на пустую целевую башню
  if (towers[to].length === 0) return true;
  
  // Проверка размера диска
  const topDisc = towers[to][towers[to].length - 1];
  return disc < topDisc;
}
```

### Алгоритм оптимального решения
```typescript
function getOptimalMoves(n: number): Move[] {
  const moves: Move[] = [];
  
  function hanoi(n: number, from: number, to: number, aux: number) {
    if (n === 1) {
      moves.push({ from, to, disc: 1 });
      return;
    }
    
    hanoi(n - 1, from, aux, to);
    moves.push({ from, to, disc: n });
    hanoi(n - 1, aux, to, from);
  }
  
  hanoi(n, 0, 2, 1);
  return moves;
}
```

## 🎨 Дизайн система

### Цветовая палитра
```css
:root {
  /* Primary Colors */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  
  /* Semantic Colors */
  --success-500: #10b981;
  --warning-500: #f59e0b;
  --danger-500: #ef4444;
  --info-500: #06b6d4;
  
  /* Neutral Colors */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-500: #6b7280;
  --gray-900: #111827;
}
```

### Типографика
```css
/* Font Stack */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Spacing System
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px;   /* Small devices */
md: 768px;   /* Medium devices */
lg: 1024px;  /* Large devices */
xl: 1280px;  /* Extra large devices */
2xl: 1536px; /* 2X large devices */
```

### Grid System
```css
/* Game Board Layout */
.game-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .game-container {
    gap: 1rem;
    grid-template-columns: 1fr;
  }
}
```

## 🔊 Звуковая система

### Web Audio API
```typescript
class SoundManager {
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
}
```

## 🎭 Анимации

### Framer Motion конфигурация
```typescript
// Анимация диска
const discVariants = {
  initial: { scale: 1, y: 0 },
  animate: { 
    scale: [1, 1.1, 1],
    y: [0, -10, 0],
    transition: { duration: 0.3 }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Анимация башни
const towerVariants = {
  idle: { scale: 1, backgroundColor: "rgba(0,0,0,0)" },
  selected: { 
    scale: 1.05, 
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    transition: { duration: 0.2 }
  },
  target: {
    borderColor: "#f59e0b",
    backgroundColor: "rgba(245, 158, 11, 0.1)"
  }
};
```

### CSS анимации
```css
@keyframes discMove {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.1); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.disc-moving {
  animation: discMove 0.5s ease-in-out;
}

.tower-pulse {
  animation: pulse 1s infinite;
}
```

## 🧪 Тестирование

### Unit тесты
```typescript
// Game Logic Tests
describe('Game Logic', () => {
  test('should validate move correctly', () => {
    const towers = [[3, 2, 1], [], []];
    expect(isValidMove(0, 1, towers)).toBe(true);
    expect(isValidMove(0, 2, towers)).toBe(true);
  });
  
  test('should reject invalid move', () => {
    const towers = [[3, 2], [1], []];
    expect(isValidMove(0, 1, towers)).toBe(false);
  });
});
```

### Integration тесты
```typescript
// Component Integration Tests
describe('GameBoard Integration', () => {
  test('should handle complete game flow', async () => {
    render(<GameBoard />);
    
    // Start game
    fireEvent.click(screen.getByText('Начать игру'));
    
    // Make moves
    fireEvent.click(screen.getByTestId('tower-0'));
    fireEvent.click(screen.getByTestId('tower-1'));
    
    // Check victory
    await waitFor(() => {
      expect(screen.getByText('Поздравляем!')).toBeInTheDocument();
    });
  });
});
```

### E2E тесты
```typescript
// Playwright E2E Tests
test('complete game flow', async ({ page }) => {
  await page.goto('/');
  
  // Start game
  await page.click('[data-testid="start-button"]');
  
  // Make moves
  await page.click('[data-testid="tower-0"]');
  await page.click('[data-testid="tower-1"]');
  
  // Check victory modal
  await expect(page.locator('[data-testid="victory-modal"]')).toBeVisible();
});
```

## 📊 Performance

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run analyze

# Lighthouse CI
npm run lighthouse
```

### Оптимизации
- **Code Splitting:** Динамический импорт компонентов
- **Tree Shaking:** Удаление неиспользуемого кода
- **Image Optimization:** Next.js Image компонент
- **Font Optimization:** Next.js Font компонент
- **CSS Optimization:** Tailwind CSS purging

### Метрики производительности
```typescript
// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      console.log('Page Load Time:', entry.loadEventEnd - entry.loadEventStart);
    }
  }
});

performanceObserver.observe({ entryTypes: ['navigation'] });
```

## 🔒 Безопасность

### Content Security Policy
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];
```

### Input Validation
```typescript
// Validate user input
function validateDiscCount(count: number): boolean {
  return Number.isInteger(count) && count >= 3 && count <= 9;
}

function validateTowerIndex(index: number): boolean {
  return Number.isInteger(index) && index >= 0 && index < 3;
}
```

## 🌐 SEO и Accessibility

### Meta Tags
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Ханойская башня - Классическая головоломка онлайн',
  description: 'Играйте в Ханойскую башню онлайн. Бесплатная головоломка с современным интерфейсом и анимациями.',
  keywords: 'ханойская башня, головоломка, игра, логика, puzzle',
  openGraph: {
    title: 'Ханойская башня',
    description: 'Классическая головоломка онлайн',
    type: 'website',
    url: 'https://hanoi.yourportfolio.com',
    images: ['/og-image.jpg']
  }
};
```

### Accessibility
```typescript
// ARIA labels and roles
<div 
  role="button" 
  tabIndex={0}
  aria-label={`Башня ${index + 1}, ${discs.length} дисков`}
  onKeyDown={handleKeyDown}
>
  {/* Tower content */}
</div>
```

## 📱 PWA Configuration

### Service Worker
```typescript
// public/sw.js
const CACHE_NAME = 'hanoi-tower-v1.0.0';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### Web App Manifest
```json
{
  "name": "Ханойская башня",
  "short_name": "Hanoi Tower",
  "description": "Классическая головоломка с современным интерфейсом",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3b82f6",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🚀 Deployment

### Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://hanoi.yourportfolio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

**Версия документа:** 1.0  
**Последнее обновление:** $(date)  
**Статус:** В разработке
