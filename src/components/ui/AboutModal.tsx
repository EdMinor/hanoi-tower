'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Heart, Code, Gamepad2, Zap } from 'lucide-react';
import Modal from './Modal';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="О проекте" size="lg">
      <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
        {/* Game Description */}
        <motion.section variants={itemVariants} className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Gamepad2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">О игре</h3>
          </div>
          <div className="prose dark:prose-invert max-w-none text-sm">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Ханойская башня — это классическая математическая головоломка, 
              изобретенная французским математиком Эдуардом Люка в 1883 году. 
              Цель игры — переместить все диски с одной башни на другую, 
              соблюдая правила:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
              <li>За один ход можно переместить только один диск</li>
              <li>Можно брать только верхний диск с любой башни</li>
              <li>Нельзя класть больший диск на меньший</li>
            </ul>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section variants={itemVariants} className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Особенности</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Современный интерфейс',
              'Плавные анимации',
              'Звуковые эффекты',
              'Адаптивный дизайн',
              'Клавиатурное управление',
              'Темная/светлая тема',
              'Статистика игры',
              'Оптимизация производительности',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section variants={itemVariants} className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Code className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Технологии</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: 'Next.js 15', desc: 'React Framework' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Framer Motion', desc: 'Animations' },
              { name: 'Turbopack', desc: 'Build Tool' },
              { name: 'Vercel', desc: 'Deployment' },
              { name: 'ESLint', desc: 'Code Quality' },
              { name: 'Git', desc: 'Version Control' },
            ].map((tech, index) => (
              <div key={index} className="text-center p-2 bg-background/50 rounded">
                <div className="font-medium text-xs">{tech.name}</div>
                <div className="text-xs text-muted-foreground">{tech.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Developer Info */}
        <motion.section variants={itemVariants} className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Разработчик</h3>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-2">EdMin</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Разработчик, создающий современные веб-приложения с фокусом на 
              пользовательский опыт и производительность.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://edmin.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm"
              >
                <ExternalLink className="w-3 h-3" />
                edmin.dev
              </a>
              <a
                href="https://github.com/edmin-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm"
              >
                <Github className="w-3 h-3" />
                GitHub
              </a>
            </div>
          </div>
        </motion.section>
        </motion.div>
      </div>
    </Modal>
  );
};

export default AboutModal;
