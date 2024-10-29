import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import CustomBackHeader from '../../components/CustomBackHeader';

import MapViewComp from '../../components/mapView/MapViewComp';

//dummy locs
const locations = [
    {
        id: '1',
        latitude: 40.7610802786587,
        longitude: 29.9087781994503,
        title: 'Location 1',
        description: 'Description for Location 1',
    },
    {
        id: '2',
        latitude: 40.74232184638711,
        longitude: 29.942279888716506,
        title: 'Location 2',
        description: 'Description for Location 2',
    },
    {
        id: '3',
        latitude: 40.7143582855976,
        longitude: 29.912176921549772,
        title: 'Location 3',
        description: 'Description for Location 3',
    },
];

function Services({ setTabVisible, tabVisible }) {
    const toggleTabVisibility = useCallback(() => {
        setTabVisible(prev => !prev);
    }, [setTabVisible]);

    return (
        <View style={styles.container}>
            <CustomBackHeader title={'Hizmetlerimiz'} position={'left'} func={toggleTabVisibility} icon={'list-outline'} />
            <MapViewComp location={locations} showMapList={!tabVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
})

export default Services;
