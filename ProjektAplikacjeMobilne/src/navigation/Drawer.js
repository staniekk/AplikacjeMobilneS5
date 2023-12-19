import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Statistics } from '../views/Statistics';
import { Settings } from '../views/Settings/index';
import { HomeScreen } from '../views/HomeScreen';
import BottomTabNav from './BottomTab';
import { HistoryS } from '../views';

const Drawer = createDrawerNavigator();

const optionScreen = {
    headerShown: false
}


export default function DrawerNav() {
    return (
        <Drawer.Navigator >
            <Drawer.Screen name="Home" component={BottomTabNav} options={optionScreen}/>
            <Drawer.Screen name="History" component={HistoryS} options={optionScreen}/>
            <Drawer.Screen name="Statistics" component={Statistics} options={optionScreen}/>
            {/*<Drawer.Screen name="Settings" component={Settings} options={optionScreen}/>*/}

        </Drawer.Navigator>
      );
}
