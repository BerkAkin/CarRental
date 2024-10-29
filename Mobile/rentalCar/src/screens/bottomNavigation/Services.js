import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import CustomBackHeader from '../../components/CustomBackHeader';

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

function Services({ setTabVisible }) {

    const toggleTabVisibility = useCallback(() => {
        setTabVisible(prev => !prev);
    }, [setTabVisible]);
    
    return (
        <View style={styles.container}>
            <CustomBackHeader title={'Hizmetlerimiz'} position={'left'} func={toggleTabVisibility} icon={'expand-outline'} />
            <MapView
                style={styles.map}
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
                {locations.map(location => (
                    <Marker
                        key={location.id}
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={location.title}
                        description={location.description}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: '93%',
        zIndex: -1,
        top: -20,
    }
})

export default Services;
