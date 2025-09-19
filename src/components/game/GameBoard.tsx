import React from 'react';
import { motion } from 'framer-motion';
import { GameBoardProps } from '@/types/game';
import Tower from './Tower';

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onTowerClick,
  onTowerHover,
  onTowerLeave,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const towerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex justify-center items-end gap-2 sm:gap-4 md:gap-6 lg:gap-8 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] p-4 sm:p-8 md:p-12 lg:p-20 ${className}`}
    >
      {gameState.towers.map((tower, index) => (
        <motion.div
          key={index}
          variants={towerVariants}
        >
          <Tower
            towerIndex={index}
            discs={tower}
            isSelected={gameState.selectedTower === index}
            isTarget={gameState.targetTower === index}
            onClick={onTowerClick}
            onHover={onTowerHover}
            onLeave={onTowerLeave}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GameBoard;
