import React from 'react';
import { motion } from 'framer-motion';
import { TowerProps } from '@/types/game';
import Disc from './Disc';

const Tower: React.FC<TowerProps> = ({
  towerIndex,
  discs,
  isSelected,
  isTarget,
  onClick,
  onHover,
  onLeave,
  className = '',
}) => {
  const towerVariants = {
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

  const getTowerState = () => {
    if (isSelected) return 'selected';
    if (isTarget) return 'target';
    return 'idle';
  };

  return (
    <motion.div
      variants={towerVariants}
      animate={getTowerState()}
      whileHover="hover"
      onClick={() => onClick(towerIndex)}
      onMouseEnter={() => onHover?.(towerIndex)}
      onMouseLeave={() => onLeave?.(towerIndex)}
      className={`
        relative flex flex-col-reverse items-center cursor-pointer p-2 sm:p-4 rounded-lg transition-all duration-200
        ${isSelected ? 'ring-2 sm:ring-4 ring-blue-400 ring-opacity-50' : ''}
        ${isTarget ? 'ring-1 sm:ring-2 ring-yellow-400' : ''}
        hover:bg-muted
        ${className}
      `}
      data-testid={`tower-${towerIndex}`}
    >
      {/* Tower Base */}
      <div className="w-16 sm:w-20 md:w-24 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded shadow-lg"></div>
      <div className="w-2 h-32 sm:h-40 md:h-48 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t shadow-lg"></div>
      
      {/* Tower Label */}
      <div className="absolute -bottom-6 sm:-bottom-8 text-xs sm:text-sm font-medium text-muted-foreground">
        Башня {towerIndex + 1}
      </div>
      
      {/* Discs */}
      <div className="absolute bottom-2 flex flex-col-reverse items-center space-y-1">
        {discs.map((disc, discIndex) => (
          <Disc
            key={`${towerIndex}-${discIndex}`}
            size={disc}
            isAnimating={isSelected && discIndex === discs.length - 1}
            animationDelay={discIndex * 0.1}
          />
        ))}
      </div>
      
    </motion.div>
  );
};

export default Tower;
