import React from 'react';
import { motion } from 'framer-motion';
import { DiscProps } from '@/types/game';

const Disc: React.FC<DiscProps> = ({
  size,
  color,
  isAnimating = false,
  animationDelay = 0,
  className = '',
}) => {
  // Генерируем цвет на основе размера диска
  const getDiscColor = (size: number): string => {
    if (color) return color;
    
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-rose-500',
    ];
    
    return colors[(size - 1) % colors.length];
  };

  // Вычисляем ширину диска на основе размера
  const getDiscWidth = (size: number): string => {
    const baseWidth = 16; // Минимальная ширина для мобильных
    const widthIncrement = 6; // Увеличение на каждый размер
    const width = baseWidth + (size - 1) * widthIncrement;
    return `${width}px`;
  };

  const discVariants = {
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
        ease: "easeInOut" as const,
        delay: animationDelay
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
        ease: "easeInOut" as const,
        delay: animationDelay
      }
    }
  };

  return (
    <motion.div
      variants={discVariants}
      initial="initial"
      animate={isAnimating ? "animate" : "initial"}
      exit="exit"
      className={`
        ${getDiscColor(size)}
        rounded-lg shadow-md border-2 border-white dark:border-gray-700
        flex items-center justify-center text-white font-bold text-xs sm:text-sm
        transition-all duration-200 hover:shadow-lg
        ${className}
      `}
      style={{
        width: getDiscWidth(size),
        height: '16px',
        minWidth: '16px',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {size}
    </motion.div>
  );
};

export default Disc;
