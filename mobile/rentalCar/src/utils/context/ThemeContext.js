import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext({
    theme: 'light',
    setTheme: (theme) => {},
});

function ThemeContextProvider({ children }) {
    const [theme, setThemeState] = useState('light');

    useEffect(() => {
        const loadStoredTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                if (storedTheme) {
                    setThemeState(storedTheme);
                }
            } catch (error) {
                console.error('Failed to load theme from AsyncStorage:', error);
            }
        };
        loadStoredTheme();
    }, []);

    const setTheme = useCallback(async (newTheme) => {
        setThemeState(newTheme);
        try {
            await AsyncStorage.setItem('theme', newTheme);
        } catch (error) {
            console.error('Failed to save theme to AsyncStorage:', error);
        }
    }, []);

    const value = {
        theme,
        setTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
