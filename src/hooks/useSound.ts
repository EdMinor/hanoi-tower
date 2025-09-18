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
    // Звук перемещения диска - более реалистичный
    const frequencies = [400, 500, 600];
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
    createSound(randomFreq, 0.15, 'sine');
  }, [createSound]);

  const playError = useCallback(() => {
    // Звук ошибки - более резкий
    createSound(150, 0.3, 'sawtooth');
    setTimeout(() => createSound(100, 0.2, 'sawtooth'), 50);
  }, [createSound]);

  const playVictory = useCallback(() => {
    // Улучшенная мелодия победы
    const melody = [
      { freq: 523, duration: 0.2 }, // C5
      { freq: 659, duration: 0.2 }, // E5
      { freq: 784, duration: 0.2 }, // G5
      { freq: 1047, duration: 0.4 }, // C6
    ];
    
    melody.forEach((note, index) => {
      setTimeout(() => {
        createSound(note.freq, note.duration, 'sine');
      }, index * 150);
    });
  }, [createSound]);

  const playClick = useCallback(() => {
    // Звук клика - короткий и приятный
    createSound(800, 0.08, 'sine');
  }, [createSound]);

  const playHint = useCallback(() => {
    // Звук подсказки - восходящая мелодия
    createSound(600, 0.1, 'sine');
    setTimeout(() => createSound(800, 0.1, 'sine'), 50);
    setTimeout(() => createSound(1000, 0.15, 'sine'), 100);
  }, [createSound]);

  const playSelect = useCallback(() => {
    // Звук выбора башни
    createSound(700, 0.1, 'triangle');
  }, [createSound]);

  const playDrop = useCallback(() => {
    // Звук размещения диска
    createSound(300, 0.2, 'sine');
  }, [createSound]);

  const playStart = useCallback(() => {
    // Звук начала игры
    const startMelody = [
      { freq: 440, duration: 0.1 }, // A4
      { freq: 554, duration: 0.1 }, // C#5
      { freq: 659, duration: 0.2 }, // E5
    ];
    
    startMelody.forEach((note, index) => {
      setTimeout(() => {
        createSound(note.freq, note.duration, 'sine');
      }, index * 100);
    });
  }, [createSound]);

  const playReset = useCallback(() => {
    // Звук сброса игры
    createSound(200, 0.3, 'sawtooth');
    setTimeout(() => createSound(150, 0.2, 'sawtooth'), 100);
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
    playSelect,
    playDrop,
    playStart,
    playReset,
    toggleSound,
    mute,
    unmute,
  };
};
