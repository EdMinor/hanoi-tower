import { useState, useEffect, useCallback } from 'react';

export const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Инициализация звука
  useEffect(() => {
    const savedSoundEnabled = localStorage.getItem('hanoi-sound-enabled');
    if (savedSoundEnabled !== null) {
      setSoundEnabled(savedSoundEnabled === 'true');
    }

    // Создаем AudioContext при первом взаимодействии пользователя
    const initAudioContext = () => {
      if (!audioContext) {
        const context = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        setAudioContext(context);
      }
    };

    // Инициализируем AudioContext при первом клике
    document.addEventListener('click', initAudioContext, { once: true });
    document.addEventListener('touchstart', initAudioContext, { once: true });

    return () => {
      document.removeEventListener('click', initAudioContext);
      document.removeEventListener('touchstart', initAudioContext);
    };
  }, [audioContext]);

  // Создание звука
  const createSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContext || !soundEnabled) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }, [audioContext, soundEnabled]);

  // Звуки для разных действий
  const playMove = useCallback(() => {
    createSound(800, 0.1, 'sine');
  }, [createSound]);

  const playError = useCallback(() => {
    createSound(200, 0.2, 'sawtooth');
  }, [createSound]);

  const playVictory = useCallback(() => {
    // Играем мелодию победы
    createSound(523, 0.2, 'sine'); // C5
    setTimeout(() => createSound(659, 0.2, 'sine'), 100); // E5
    setTimeout(() => createSound(784, 0.3, 'sine'), 200); // G5
  }, [createSound]);

  const playClick = useCallback(() => {
    createSound(600, 0.05, 'sine');
  }, [createSound]);

  const playHint = useCallback(() => {
    createSound(1000, 0.15, 'sine');
  }, [createSound]);

  // Переключение звука
  const toggleSound = useCallback(() => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    localStorage.setItem('hanoi-sound-enabled', newSoundEnabled.toString());
  }, [soundEnabled]);

  // Отключение звука
  const mute = useCallback(() => {
    setSoundEnabled(false);
    localStorage.setItem('hanoi-sound-enabled', 'false');
  }, []);

  // Включение звука
  const unmute = useCallback(() => {
    setSoundEnabled(true);
    localStorage.setItem('hanoi-sound-enabled', 'true');
  }, []);

  return {
    soundEnabled,
    setSoundEnabled,
    playMove,
    playError,
    playVictory,
    playClick,
    playHint,
    toggleSound,
    mute,
    unmute,
  };
};
