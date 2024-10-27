import React, { useState, useRef  } from 'react';
import { FlatList, StyleSheet,Text } from 'react-native';

import FlexperGreen from '../screen/FlexperGreen';
import FlexperNature from '../screen/FlexperNature';
import FlexperComfort from '../screen/FlexperComfort';

import PageHeader from '../../components/PageHeader';
import TopSlider from '../../components/TopSlider';

const DATA = [
    { id: '1', component: FlexperGreen, name: 'Flexper Green' },
    { id: '2', component: FlexperNature, name: 'Flexper Nature' },
    { id: '3', component: FlexperComfort, name: 'Flexper Comfort' },
];

function Home() {
    const [currentPageName, setCurrentPageName] = useState(DATA[0].name);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const currentItem = DATA[viewableItems[0].index];
            setCurrentPageName(currentItem.name);
        }
    }).current;

    const renderItem = ({ item }) => {
        const Component = item.component;
        return <Component />;
    };

    return (
        <>
            <PageHeader title={'Ana Sayfa'} />
            <TopSlider currentPage={currentPageName} />
            <Text style={{textAlign: 'center'}}> swipable categories </Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.flatList}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
        </>
    );
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});

export default Home;
