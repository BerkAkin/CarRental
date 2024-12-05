import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../Button';
import Input from './Input';

import { GlobalStyles } from '../../styles/Colours';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
    const [enteredName, setEnteredName] = useState('');
    const [enteredNumber, setEnteredNumber] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
    const [enteredBday, setEnteredBDay] = useState('');

    const {
        name: nameIsInvalid,
        number: numberIsInvalid,
        email: emailIsInvalid,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
        bday: bdayIsInvalid,
    } = credentialsInvalid;

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'name':
                setEnteredName(enteredValue);
                break;
            case 'number':
                setEnteredNumber(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
            case 'bday':
                setEnteredBDay(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            name: enteredName,
            number: enteredNumber,
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            bday: enteredBday,
        });
    }

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>{isLogin ? "Giriş" : "kayıt ol"}</Text>
            </View>
            {!isLogin && (
                <Input
                    label={"İsim Soyisim"}
                    onUpdateValue={updateInputValueHandler.bind(this, 'name')}
                    value={enteredName}
                    keyboardType="default"
                    isInvalid={nameIsInvalid}

                />
            )}
            <Input
                label={"email"}
                onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                value={enteredEmail}
                keyboardType="email-address"
                isInvalid={emailIsInvalid}

            />
            <Input
                label={"şifre"}
                onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                secure
                textContentType="none"
                autoComplete="off"
                value={enteredPassword}
                isInvalid={passwordIsInvalid}

            />
            {!isLogin && (
                <>
                    <Input
                        label={"şifre tekrarı"}
                        onUpdateValue={updateInputValueHandler.bind(
                            this,
                            'confirmPassword'
                        )}
                        secure
                        textContentType="none"
                        autoComplete="off"
                        value={enteredConfirmPassword}
                        isInvalid={passwordsDontMatch}
                    />
                    <Input
                        label={"+90 555 555 55 55"}
                        onUpdateValue={updateInputValueHandler.bind(this, 'number')}
                        value={enteredNumber}
                        keyboardType="numeric"
                        isInvalid={numberIsInvalid}

                    />
                    <Input
                        label={"01/01/2024"}
                        onUpdateValue={updateInputValueHandler.bind(this, 'bday')}
                        value={enteredBday}
                        keyboardType="default"
                        isInvalid={bdayIsInvalid}

                    />
                </>
            )}
            <View style={styles.buttons}>
                <Button onPress={submitHandler}>
                    {isLogin ? "giriş" : "kayıt"}
                </Button>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 32,
        fontWeight: '800',
        color: GlobalStyles.colours.gray700,
    },
});

export default AuthForm;