import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Statistics } from '../views/Statistics';
import { Settings } from '../views/Settings/Settings';




const Drawer = createDrawerNavigator();


export default function DrawerNav() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Statistics" component={Statistics} />
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      );
}
