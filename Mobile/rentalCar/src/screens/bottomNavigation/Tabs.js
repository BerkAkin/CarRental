import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AboutUs from './AboutUs';
import Home from './Home';
import Services from './Services';
import Settings from './Settings';
import SSS from './SSS';

import Icon from '../../components/Icon';
import { GlobalStyles } from '../../styles/Colours';

const tabs = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow,
        }}>
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: GlobalStyles.colours.red700,
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

function Tabs() {
    const [tabVisible, setTabVisible] = useState(true);

    return (
        <NavigationContainer>
            <tabs.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 25,
                        left: 20,
                        right: 20,
                        elevation: 0,
                        backgroundColor: GlobalStyles.colours.gray200,
                        borderRadius: 15,
                        height: 90,
                        ...styles.shadow,
                        display: tabVisible ? 'flex' : 'none',
                    },
                })}
            >
                <tabs.Screen
                    name="Services"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon name={'location-outline'} size={30} color={focused ? GlobalStyles.colours.red700 : GlobalStyles.colours.gray700} />
                        ),
                        headerShown: false,
                    }}>{() => <Services setTabVisible={setTabVisible} tabVisible={tabVisible}/>}
                </tabs.Screen>
                <tabs.Screen
                    name="Aboutus"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon name={'information-circle-outline'} size={30} color={focused ? GlobalStyles.colours.red700 : GlobalStyles.colours.gray700} />
                        ),
                    }}>{() => <AboutUs />}
                </tabs.Screen>
                <tabs.Screen
                    name="Home"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon name={'home-outline'} size={30} color={focused ? GlobalStyles.colours.gray200 : GlobalStyles.colours.red200} />
                        ),
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} />
                        ),
                    }}>{() => <Home />}
                </tabs.Screen>
                <tabs.Screen
                    name="SSS"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon name={'chatbubbles-outline'} size={30} color={focused ? GlobalStyles.colours.red700 : GlobalStyles.colours.gray700} />
                        ),
                    }}>{() => <SSS />}
                </tabs.Screen>
                <tabs.Screen
                    name="Settings"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon name={'settings-outline'} size={30} color={focused ? GlobalStyles.colours.red700 : GlobalStyles.colours.gray700} />
                        ),
                    }}>{() => <Settings />}
                </tabs.Screen>
            </tabs.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: GlobalStyles.colours.gray800,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 20,
    },
});

export default Tabs;
