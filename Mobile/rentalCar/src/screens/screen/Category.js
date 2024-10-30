import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';

import TopSlider from '../../components/TopSlider';

const { width } = Dimensions.get('window');

const Category = ({ name, color, cars }) => {
    return (
        <View style={styles.container}>
            <TopSlider currentPage={name} />
            <View style={[styles.categoryContainer, { backgroundColor: color }]}>
                <FlatList
                    data={cars}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>{item.name}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    listContent: {
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    item: {
        height: 150,
        width: width / 2 - 15,
        backgroundColor: '#fdfdfd',
        margin: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Category;
