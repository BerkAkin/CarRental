import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LangContext = createContext({
    lang: 'ENG',
    setLanguage: (lang) => {},
});

function LangContextProvider({ children }) {
    const [lang, setLang] = useState('ENG');

    useEffect(() => {
        const loadStoredLang = async () => {
            try {
                const storedLang = await AsyncStorage.getItem('lang');
                if (storedLang) {
                    setLang(storedLang);
                }
            } catch (error) {
                console.error('Failed to load language from AsyncStorage:', error);
            }
        };
        loadStoredLang();
    }, []);

    const setLanguage = useCallback(async (language) => {
        setLang(language);
        try {
            await AsyncStorage.setItem('lang', language);
        } catch (error) {
            console.error('Failed to save language to AsyncStorage:', error);
        }
    }, []);

    const value = {
        lang,
        setLanguage,
    };

    return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export default LangContextProvider;
