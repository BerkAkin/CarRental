import React, { useState } from 'react';
import { Alert, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../FlatButton';
import AuthForm from './AuthForm';
import PassRes from '../PassRes';

import { GlobalStyles } from '../../styles/Colours';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [resetMail, setResetMail] = useState(false);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    number: false,
    email: false,
    password: false,
    confirmPassword: false,
    bday: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Register');
    }
    else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { name, number, bday, email, password, confirmPassword } = credentials;

    name = name.trim();
    number = number.trim();
    email = email.trim();
    password = password.trim();
    bday = bday.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const nameIsInvalid = name.length > 0;
    const numberIsInvalid = number.length > 0;//do validtion
    const passwordsAreEqual = password === confirmPassword;
    const bdayIsInvalid = bday.length > 0;

    if (isLogin) {
      if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
        Alert.alert("translations.loginAlertHeader", "translations.loginAlertBody");
        setCredentialsInvalid({
          name: !nameIsInvalid,
          number: !numberIsInvalid,
          bday: !bdayIsInvalid,
          email: !emailIsValid,
          password: !passwordIsValid,
          confirmPassword: !passwordIsValid || !passwordsAreEqual,
        });
        return;
      }
    }
    else {
      if (!nameIsInvalid || !numberIsInvalid || !emailIsValid || !passwordIsValid || !bdayIsInvalid || (!isLogin && !passwordsAreEqual)) {
        Alert.alert("translations.regAlertHeader"," translations.regAlertBody");
        setCredentialsInvalid({
          name: !nameIsInvalid,
          number: !numberIsInvalid,
          bday : !bdayIsInvalid,
          email: !emailIsValid,
          password: !passwordIsValid,
          confirmPassword: !passwordIsValid || !passwordsAreEqual,
        });
        return;
      }
    }

    if (isLogin) {
      onAuthenticate({ email, password });
    } else {
      onAuthenticate({ name, email, password, number, bday });
    }
  }

  function modalHandler() {
    setModalVisible(true);
  }

  function onChange(enteredResMail) {
    setResetMail(enteredResMail);
  }

  async function forgotPass(resetEmail) {
    console.log(resetEmail);
  }

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.authContent}>
            <AuthForm
              isLogin={isLogin}
              onSubmit={submitHandler}
              credentialsInvalid={credentialsInvalid}
            />
            <View style={styles.buttons}>
              {isLogin && (
                <FlatButton onPress={modalHandler}>şifremi unuttum</FlatButton>
              )}
              <FlatButton onPress={switchAuthModeHandler}>
                {isLogin ? "kayıt" : "giriş"}
              </FlatButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <PassRes
        modalVisible={modalVisible}
        modalTitle={"Reset Pass"}
        func={() => setModalVisible(false)}
        label={"Email Adresi"}
        onChange={onChange}
        value={resetMail}
        btnFunc={() => forgotPass(resetMail)}
        btnLText={"reset"}
        btnRText={"cancel"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colours.gray200,
    paddingBottom: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'start',
  },
  authContent: {
    justifyContent: 'center',
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
  },
  buttons: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default AuthContent;