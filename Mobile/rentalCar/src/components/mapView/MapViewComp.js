import React from 'react';
import { View, StyleSheet } from 'react-native';

import Map from './Map';
import MapList from './MapList';

function MapViewComp({ location, showMapList }) {
    return (
        <View style={styles.container}>
            <Map location={location} />
            {showMapList && (
                <MapList location={location} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MapViewComp;
