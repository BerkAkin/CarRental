import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import MapViewStyle from '../../styles/MapViewStyle';

const { width, height } = Dimensions.get('window');

function Map({ location }) {
    return (
        <MapView
            style={styles.mapContainer}
            customMapStyle={MapViewStyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton
            initialRegion={{
                latitude: 40.740387519047935,
                longitude: 29.916001353036496,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}
        >
            {location.map(loc => (
                <Marker
                    key={loc.id}
                    coordinate={{
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    }}
                    title={loc.title}
                    description={loc.description}
                />
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        height: height,
        width: width,
        zIndex: -1,
    },
});

export default Map;
