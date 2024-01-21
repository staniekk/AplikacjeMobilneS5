// navigation/Tab.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabIcon } from "../components/BottomTabIcon";
import { Calendar } from '../views/Calendar';
import { HomeStackNav, MapStackNav } from './Stack';


const optionScreen = {
    headerShown: false,
    tabBarShowLabel: false
}

const BottomTab = createBottomTabNavigator();

export default function BottomTabNav() {
    return (
        <BottomTab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, }) => {

                return <BottomTabIcon routeName={route?.name} focused={focused} />;
            }
        })}>

            <BottomTab.Screen name="HomeScreenTab" component={HomeStackNav} options={optionScreen}/>
            <BottomTab.Screen name="Map" component={MapStackNav} options={optionScreen}/>
            <BottomTab.Screen name="Calendar" component={Calendar} options={optionScreen}/>
        </BottomTab.Navigator>
    );
}
