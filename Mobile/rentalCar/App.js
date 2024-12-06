import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Tabs from './src/screens/bottomNavigation/Tabs';
import Login from "./src/screens/auth/Login";
import Register from "./src/screens/auth/Register";

import Loading from './src/components/Loading';

import { GlobalStyles } from "./src/styles/Colours";

import AuthContextProvider, { AuthContext } from './src/utils/context/AuhtContext';
import LangContextProvider from './src/utils/context/LangContext';
import ThemeContextProvider from './src/utils/context/ThemeContext';

const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return <Tabs />
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryToLogin, setIsTryToLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const localID = await AsyncStorage.getItem('localId');
        if (token && localID) {
          authCtx.authenticate(token, localID);
        }
      } catch (error) {
        console.error('Failed to load token from AsyncStorage:', error);
      } finally {
        setIsTryToLogin(false);
      }
    };
    loadAuthData();
  }, []);

  if (isTryToLogin) {
    return <Loading message={''} />;
  }

  return (
    <>
      <StatusBar backgroundColor={GlobalStyles.colours.gray200} barStyle={'dark-content'} />
      <Navigation />
    </>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <LangContextProvider>
        <ThemeContextProvider>
          <Root />
        </ThemeContextProvider>
      </LangContextProvider>
    </AuthContextProvider>
  );
}


export default App;
