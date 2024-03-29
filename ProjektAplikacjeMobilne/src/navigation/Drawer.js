import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from "react-native";
import { Statistics } from '../views/Statistics';
import { Settings } from '../views/Settings/index';
import BottomTabNav from './BottomTab';
import { HistoryS } from '../views';

const Drawer = createDrawerNavigator();

const optionScreen = {
    headerShown: false
}

//DrawerNav - odpowiedzialny za tworzenie nawigacji na bazie szufladki
export default function DrawerNav() {
    return (
        <Drawer.Navigator
        screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: '#ffffff', 
                width: 250, 
            },
            drawerLabelStyle: { 
                fontSize: 18,
                color: 'black', 
            },
        }}
         >
            <Drawer.Screen name="Home" component={BottomTabNav} options={optionScreen}/>
            <Drawer.Screen name="History" component={HistoryS} options={optionScreen}/>
            <Drawer.Screen name="Statistics" component={Statistics} options={optionScreen}/>
            <Drawer.Screen 
                name="Settings" 
                component={Settings} 
                options={{
                    ...optionScreen,
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={require('../img/settings_icon.png')} // Update path
                            style={{ width: size, height: size }}
                        />
                    )
                }} 
            />

        </Drawer.Navigator>
      );
}
