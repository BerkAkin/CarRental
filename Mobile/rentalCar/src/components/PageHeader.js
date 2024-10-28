import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../styles/Colours';

function CustomBackHeader({ title }) {
    return (
        <View style={[styles.header, styles.shadow]}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: GlobalStyles.colours.gray200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 25,
        marginBottom: 30,
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
