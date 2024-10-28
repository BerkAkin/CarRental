import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ThemeBtn from '../../components/ThemeBtn';
import PageHeader from '../../components/PageHeader';

function Settings() {
    const [theme1, setTheme1] = useState('light');
    const [theme2, setTheme2] = useState('light');

    const handleThemeChange1 = (newTheme) => {
        setTheme1(newTheme);
    };

    const handleThemeChange2 = (newTheme) => {
        setTheme2(newTheme);
    };

    return (
        <>
            <PageHeader title={'Ayarlar'} />
            <Text style={{textAlign: 'center'}}> will be improved </Text>
            <View style={styles.container}>
                <ThemeBtn onPress={() => handleThemeChange1('dark')} position={'left'} theme={theme1}>Karanlık</ThemeBtn>
                <ThemeBtn onPress={() => handleThemeChange1('light')} position={'right'} theme={theme1}>Açık</ThemeBtn>
            </View>
            <View style={styles.container}>
                <ThemeBtn onPress={() => handleThemeChange2('dark')} position={'left'} theme={theme2}>English</ThemeBtn>
                <ThemeBtn onPress={() => handleThemeChange2('light')} position={'right'} theme={theme2}>Türkçe</ThemeBtn>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Settings;
