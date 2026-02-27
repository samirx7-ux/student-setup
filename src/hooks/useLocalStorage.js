import { useState, useEffect } from 'react';

/**
 * Drop-in replacement for useState that persists to localStorage.
 * Usage: const [value, setValue] = useLocalStorage('key', defaultValue);
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            console.warn(`useLocalStorage: error reading key "${key}"`, err);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            // Allow functional updates: setValue(prev => newVal)
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            console.warn(`useLocalStorage: error writing key "${key}"`, err);
        }
    };

    return [storedValue, setValue];
}
