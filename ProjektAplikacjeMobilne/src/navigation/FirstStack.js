import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from "../views/Login";
import DrawerNav from "./Drawer";
import { Register } from "../views/Register";
import React from 'react';



const FirstStack = createNativeStackNavigator();

const optionScreen = {
    headerShown: false
}

export default function FirstStackNav() {
    return (
        <FirstStack.Navigator>

            
            
            <FirstStack.Screen name="Login" component={Login} options={optionScreen} />
            <FirstStack.Screen name="Register" component={Register} options={optionScreen} />

            <FirstStack.Screen name="DrawerNav" component={DrawerNav} options={optionScreen}/>
        </FirstStack.Navigator>

    );
}
