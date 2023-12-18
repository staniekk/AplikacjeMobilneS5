import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from "../views/Login";
import TabNav from "./Tab";
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

export default function StackNav() {
    return (
        <Stack.Navigator>

            <Stack.Screen name="Summary" component={Summary} options={optionScreen} />
            <Stack.Screen name="Login" component={Login} options={optionScreen} />
            <Stack.Screen name="DrawerNav" component={DrawerNav} options={optionScreen} />
            <Stack.Screen name="TabNav" component={TabNav} options={optionScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={optionScreen} />
            <Stack.Screen name="Register" component={Register} options={optionScreen} />
            <Stack.Screen name="Calendar" component={Calendar} options={optionScreen} />
            <Stack.Screen name="Map" component={MapActive} options={optionScreen} />
        </Stack.Navigator>

    );
}
