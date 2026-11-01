import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Ставим таймер на обновление debouncedValue
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Если пользователь напечатал ещё один символ ДО истечения таймера — 
        // очищаем предыдущий таймер и запускаем новый
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}