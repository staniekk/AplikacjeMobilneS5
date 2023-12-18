import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapActive } from "../views/Map";
import { BottomTabIcon } from "../components/BottomTabIcon";
import { HomeScreen } from '../views/HomeScreen';
import { Calendar } from '../views/Calendar';



const optionScreen = {
    headerShown: false,
    tabBarShowLabel: false
}

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, }) => {

                return <BottomTabIcon routeName={route?.name} focused={focused} />;
            }
        })}>

            <Tab.Screen name="HomeScreen" component={HomeScreen} options={optionScreen} />
            <Tab.Screen name="Map" component={MapActive} options={optionScreen} />
            <Tab.Screen name="Calendar" component={Calendar} options={optionScreen} />
            
        </Tab.Navigator>
    );
}
