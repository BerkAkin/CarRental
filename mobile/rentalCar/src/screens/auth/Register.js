import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthContent from '../../components/auth/AuthContent';
import Loading from '../../components/Loading';

import { createUser, getBlogs } from '../../utils/auhtRequest';
import Button from '../../components/Button';

function Register() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const navigation = useNavigation();

  async function singUp({ name, email, password, number, bday }) {
    setIsAuthenticate(true);
    try {
      const response = await createUser(name, email, password, number, bday);
      console.log("response.data : ", response)
      //navigation.navigate('Login');
    }
    catch (error) {
      Alert.alert(
        'Başarısız Kayıt!',
        'Lütfen Bilgilerinizi Kontrol Ediniz'
      );
      setIsAuthenticate(false);
    }
  }

  async function getB() {
    try {
      const response = await getBlogs();
      console.log("response.data : ", response)
    }
    catch (error) {
      Alert.alert(
        'yarram!',
        'geldi bak'
      );
    }
  }

  if (isAuthenticate) {
    return <Loading message={'Kullanıcı Oluşturuluyor...'} />;
  }

  return (
    <>
      <AuthContent onAuthenticate={singUp} />
      <Button onPress={getB}>
        {"blog"}
      </Button>
    </>
  );
}

export default Register;