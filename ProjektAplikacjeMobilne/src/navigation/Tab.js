import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Login, Register} from "../views";
import {BottomTabIcon} from "../components/BottomTabIcon";
import {About } from "../views/About";
import { HomeScreen } from '../views/HomeScreen';



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
            <Tab.Screen name="Register" component={Register} options={optionScreen} />
            <Tab.Screen name="About" component={About} options={optionScreen} />
        </Tab.Navigator>
    );
}
