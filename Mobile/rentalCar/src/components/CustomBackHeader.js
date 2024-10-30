import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/Colours';
import Icon from './Icon';

function CustomBackHeader({ title, position, func, icon }) {
    return (
        <View style={[styles.header, styles.shadow]}>
            {position === 'left' &&
                <>
                    <Text style={styles.headerText}>{title}</Text>
                    <TouchableOpacity onPress={func}>
                        <Icon name={icon} size={30} color={GlobalStyles.colours.gray800} />
                    </TouchableOpacity>
                </>
            }
            {position === 'right' &&
                <>
                    <TouchableOpacity onPress={func}>
                        <Icon name={icon} size={30} color={GlobalStyles.colours.gray800} />
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
        backgroundColor: GlobalStyles.colours.gray200,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 25,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: GlobalStyles.colours.gray800,
    },
    shadow: {
        shadowColor: GlobalStyles.colours.gray800,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 20,
    },
});

export default CustomBackHeader;
