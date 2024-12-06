import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: null,
    localId: null,
    isAuthenticated: false,
    authenticate: (token, localId) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);
    const [localId, setLocalId] = useState(null);

    useEffect(() => {
        const loadAuthData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                const storedLocalId = await AsyncStorage.getItem('localId');
                if (storedToken && storedLocalId) {
                    setAuthToken(storedToken);
                    setLocalId(storedLocalId);
                }
            } catch (error) {
                console.error('Failed to load auth data from AsyncStorage:', error);
            }
        };

        loadAuthData();
    }, []);

    const authenticate = async (token, localID) => {
        setAuthToken(token);
        setLocalId(localID);
        try {
            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('localId', localID);
        } catch (error) {
            console.error('Failed to save token and Id to AsyncStorage:', error);
        }
    };

    const logout = async () => {
        setAuthToken(null);
        setLocalId(null);
        try {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('localId');
        } catch (error) {
            console.error('Failed to remove token from AsyncStorage:', error);
        }
    };

    const value = {
        token: authToken,
        localId: localId,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;