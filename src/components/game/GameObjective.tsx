import React from 'react';

interface GameObjectiveProps {
  targetTower: number;
  className?: string;
}

const GameObjective: React.FC<GameObjectiveProps> = ({
  targetTower,
  className = '',
}) => {
  return (
    <div className={`text-center mb-1 ${className}`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg text-sm text-muted-foreground border-none">
        <span className="font-medium">🎯 Цель:</span>
        <span>Переместить все диски на башню {targetTower + 1}</span>
      </div>
    </div>
  );
};

export default GameObjective;
