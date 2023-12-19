import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from "../views/Login";
import TabNav from "./BottomTab";
import DrawerNav from "./Drawer";
import { Register } from "../views/Register";
import { HomeScreen } from '../views/HomeScreen';
import React from 'react';
import { Calendar } from '../views/Calendar';
import { MapActive } from '../views/Map';
import { Statistics } from '../views/Statistics';
import { Summary } from '../views/Summary';


const Stack = createNativeStackNavigator();

const optionScreen = {
    headerShown: false
}

const HomeStackNav = () => {
    return (
        <Stack.Navigator>
            
            
            <Stack.Screen name="HomeScreenStack" component={HomeScreen} options={optionScreen}/>
            <Stack.Screen name="SummaryStack" component={Summary} options={optionScreen} />
        </Stack.Navigator>

    );
}

const MapStackNav = () => {
    return (
        <Stack.Navigator>
            
            
            <Stack.Screen name="MapStack" component={MapActive} options={optionScreen} />
        </Stack.Navigator>

    );
}

export {HomeStackNav, MapStackNav};
