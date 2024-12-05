import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { BlurView } from 'expo-blur';

import Input from '../components/auth/Input';
import Button from './Button';

import { GlobalStyles } from '../styles/Colours';

function PassRes({ modalVisible, modalTitle, func, label, onChange, value, btnFunc, btnLText, btnRText }) {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
        >
            <BlurView
                style={StyleSheet.absoluteFill}
                intensity={100}
                tint="light"
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{modalTitle}</Text>
                        </View>
                        <View style={styles.modalInputs}>
                            <Input
                                label={label}
                                onUpdateValue={onChange}
                                value={value}
                                keyboardType="email-address"
                            />
                            <View style={styles.btnContainer}>
                                <Button style={styles.btnL} onPress={btnFunc}>{btnLText}</Button>
                                <Button style={styles.btnR} onPress={func}>{btnRText}</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        color: GlobalStyles.colours.gray900,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalInputs: {
        marginTop: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btnL: {
        flex: 1,
        marginRight: 5,
    },
    btnR: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: GlobalStyles.colours.red500,
    },
});

export default PassRes;
