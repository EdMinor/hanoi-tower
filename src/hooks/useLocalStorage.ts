import { useState, useEffect, useCallback } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Получаем значение из localStorage или используем начальное значение
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Функция для установки значения
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Позволяем value быть функцией, как useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Сохраняем состояние
      setStoredValue(valueToStore);
      
      // Сохраняем в localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Функция для удаления значения
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Функция для очистки всех значений
  const clearAll = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
    }
  }, [initialValue]);

  // Слушаем изменения в localStorage от других вкладок
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearAll,
  };
};
