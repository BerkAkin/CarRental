import React from 'react';
import { Text, StyleSheet, View, FlatList, Dimensions, Linking  } from 'react-native';

import IconBtn from '../IconBtn';

function MapList({ location }) {
    function goGoogleMap(latitude, longitude) {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url).catch(err => console.error("Failed to open Google Maps:", err));
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listContainer}> 
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listDescription}>{item.description}</Text>
                <IconBtn
                    style={styles.icon}
                    name={'paper-plane-outline'}
                    func={() => goGoogleMap(item.latitude, item.longitude)}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={location}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        zIndex: 10,
        width: '100%',
    },
    listContainer: {
        height: 150,
        width: Dimensions.get('window').width - 40,
        borderRadius: 15,
        backgroundColor: '#afafaf',
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    listDescription: {
        fontSize: 12,
        textAlign: 'center',
        color: '#666',
    },
    icon:{
        position: 'absolute',
        top: 5,
        right: 5
    }
});

export default MapList;
