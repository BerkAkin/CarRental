import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../../components/auth/AuthContent';
import Loading from '../../components/Loading';

import { AuthContext } from '../../utils/context/AuhtContext';
import { loginUser } from '../../utils/auhtRequest';
import { validatePathConfig } from '@react-navigation/native';

function Login() {
  // will be changed
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const authCtx = useContext(AuthContext);

  async function login({ email, password }) {
    setIsAuthenticate(true);
    try {
      console.log("email : ", email);
      console.log("password : ", password);
    }
    catch (error) {
      Alert.alert(
        "translations.loginAlertHeader",
        " translations.loginAlertBody"
      );
      setIsAuthenticate(false);
    }
  }

  if (isAuthenticate) {
    return <Loading message={"translations.loginLoadingStatus"} />;
  }
  // will be changed

  return <AuthContent isLogin onAuthenticate={login} />;
}

export default Login;