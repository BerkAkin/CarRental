import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { GlobalStyles } from '../../styles/Colours';

const { width } = Dimensions.get('window');

function FlexperGreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>FlexperGreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: GlobalStyles.colours.black,
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FlexperGreen;
