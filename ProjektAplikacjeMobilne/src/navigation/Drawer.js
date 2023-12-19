import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Statistics } from '../views/Statistics';
import { Settings } from '../views/Settings/Settings';
import { HomeScreen } from '../views/HomeScreen';
import BottomTabNav from './BottomTab';

const Drawer = createDrawerNavigator();

const optionScreen = {
    headerShown: false
}


export default function DrawerNav() {
    return (
        <Drawer.Navigator >
            <Drawer.Screen name="Home" component={BottomTabNav} options={optionScreen}/>
            <Drawer.Screen name="Statistics" component={Statistics} options={optionScreen}/>
            <Drawer.Screen name="Settings" component={Settings} options={optionScreen}/>
            {/* <Drawer.Screen name="HistoryS" component={HistoryS}/> */}
        </Drawer.Navigator>
      );
}
