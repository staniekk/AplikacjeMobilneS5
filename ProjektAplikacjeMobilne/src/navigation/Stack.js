// navigation/Stack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../views/HomeScreen';
import React from 'react';
import { MapActive } from '../views/Map';
import { Settings } from '../views/Settings';


const Stack = createNativeStackNavigator();

const optionScreen = {
    headerShown: false
}

const HomeStackNav = () => {
    return (
        <Stack.Navigator>
            
            <Stack.Screen name="HomeScreenStack" component={HomeScreen} options={optionScreen}/>
        </Stack.Navigator>

    );
}

const MapStackNav = () => {
    return (
        <Stack.Navigator>
            
            <Stack.Screen name="MapStack"
            component={MapActive}
            options={{headerShown:false}}
            />
        </Stack.Navigator>

    );
}

const SettingsStackNav = () => {
    return (
        <Stack.Navigator>
            
            <Stack.Screen name="Settings" component={Settings} options={optionScreen} />
        </Stack.Navigator>

    );
}

export {HomeStackNav, MapStackNav, SettingsStackNav};
