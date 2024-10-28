import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/Colours';
import Icon from './Icon';

function CustomBackHeader({ title, position, func }) {
    return (
        <View style={styles.header}>
            {position === 'left' &&
                <>
                    <Text style={styles.headerText}>{title}</Text>
                    <TouchableOpacity onPress={func}>
                        <Icon name={'arrow-forward'} size={30} color={GlobalStyles.colours.gray800} />
                    </TouchableOpacity>
                </>
            }
            {position === 'right' &&
                <>
                    <TouchableOpacity onPress={func}>
                        <Icon name={'arrow-back'} size={30} color={GlobalStyles.colours.gray800} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{title}</Text>
                </>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: GlobalStyles.colours.transparent100,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
    headerText: {
        fontSize: 30,
        color: GlobalStyles.colours.gray800,
    },
});

export default CustomBackHeader;
