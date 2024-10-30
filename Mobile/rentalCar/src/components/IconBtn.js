import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { GlobalStyles } from '../styles/Colours';

function IconBtn({ name, func, style, children }) {
    return (
        <TouchableOpacity onPress={func} style={[styles.container, style]}>
            <Icon name={name} size={25} color={GlobalStyles.colours.black} />
            {children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default IconBtn;