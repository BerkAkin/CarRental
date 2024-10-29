import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Category from '../screen/Category';
import PageHeader from '../../components/PageHeader';

const fetchCategories = async () => {
    // Simulating API response with dummy data
    return [
        { id: '1', name: 'cate1', color: '#f54538' },
        { id: '2', name: 'cate2', color: '#37fa25' },
        { id: '3', name: 'cate3', color: '#14a9ff' },
        { id: '4', name: 'cate4', color: '#ff14f7' },
        { id: '5', name: 'cate5', color: '#977496' },
        { id: '6', name: 'cate6', color: '#757575' },
    ];
};
const fetchCars = async () => {
    // Simulating API response with dummy data
    return [
        { id: '1', name: 'car1', cateid: '1' },
        { id: '2', name: 'car2', cateid: '1' },
        { id: '3', name: 'car3', cateid: '2' },
        { id: '4', name: 'car4', cateid: '2' },
        { id: '5', name: 'car5', cateid: '3' },
        { id: '6', name: 'car6', cateid: '3' },
        { id: '7', name: 'car7', cateid: '4' },
        { id: '8', name: 'car6', cateid: '4' },
        { id: '55', name: 'car52', cateid: '4' },//just check to see if it's going to break.
        { id: '9', name: 'car6', cateid: '5' },
        { id: '10', name: 'car6', cateid: '5' },
        { id: '11', name: 'car6', cateid: '6' },
        { id: '12', name: 'car6', cateid: '6' },
    ];
};

function Home() {
    const [categories, setCategories] = useState([]);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const [categoriesData, carsData] = await Promise.all([fetchCategories(), fetchCars()]);
            setCategories(categoriesData);
            setCars(carsData);
        };

        loadData();
    }, []);

    const renderItem = ({ item }) => {
        // Filter cars that belong to the current category based on cateid
        const categoryCars = cars.filter(car => car.cateid === item.id);

        // Pass the filtered cars as a prop to Category component
        return <Category name={item.name} color={item.color} cars={categoryCars} />;
    };

    return (
        <View style={{ flex: 1 }}>
            <PageHeader title={'Ana Sayfa'} />
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});

export default Home;
