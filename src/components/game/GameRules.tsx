import React from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface GameRulesProps {
  className?: string;
}

const GameRules: React.FC<GameRulesProps> = ({ className = '' }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      {/* Кнопка для открытия модалки - для всех устройств */}
      <div className={`${className}`}>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          className="w-full text-lg py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          📖 Правила игры
        </Button>
      </div>

      {/* Modal с правилами игры - для всех устройств */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="🎯 Правила игры"
        size="lg"
      >
        <div className="space-y-6 text-sm">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-base flex items-center gap-2">
              🎯 Цель игры
            </h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Переместить все диски на целевую башню, соблюдая правила.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-base flex items-center gap-2">
              📋 Правила
            </h4>
            <ul className="space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300">
              <li className="leading-relaxed">Можно брать только верхний диск</li>
              <li className="leading-relaxed">Нельзя класть большой диск на маленький</li>
              <li className="leading-relaxed">За один ход можно переместить только один диск</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-base flex items-center gap-2">
              🎮 Управление
            </h4>
            <ul className="space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300">
              <li className="leading-relaxed">Кликните на башню для выбора</li>
              <li className="leading-relaxed">Кликните на другую башню для перемещения</li>
              <li className="leading-relaxed">Клавиши 1, 2, 3 - выбор башни</li>
              <li className="leading-relaxed">R - сброс игры</li>
              <li className="leading-relaxed">N - новая игра</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GameRules;
