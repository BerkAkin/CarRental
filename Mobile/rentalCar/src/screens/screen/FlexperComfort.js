import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { GlobalStyles } from '../../styles/Colours';

const { width } = Dimensions.get('window');

function FlexperComfort() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>FlexperComfort</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: GlobalStyles.colours.amber600,
    },
    text:{
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FlexperComfort;
