import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Register} from "../views";
import TabNav from "./Tab";
import { LoginW } from '../views/LoginW';
import { About } from '../views/About';
import {TaskList} from '../views/TaskList';
import {EditTable} from '../views/EditTable';
import {HomeScreen} from '../views/HomeScreen';
import { Drawer } from '../views/Drawer';
import React from 'react';


const Stack = createNativeStackNavigator();

const optionScreen = {
    headerShown: false
}

export default function StackNav() {
    return (
         <Stack.Navigator>
             <Stack.Screen name="Login" component={Login} options={optionScreen} />
             <Stack.Screen name="TabNav" component={TabNav} options={optionScreen} />
             {/* <Stack.Screen name="Drawer" component={Drawer} options={optionScreen} /> */}
             <Stack.Screen name="HomeScreen" component={HomeScreen} options={optionScreen} />
             <Stack.Screen name="TaskList" component={TaskList} options={optionScreen} />
             <Stack.Screen name="EditTable" component={EditTable} options={optionScreen} />
             <Stack.Screen name="Register" component={Register} options={optionScreen} />
             
             <Stack.Screen name="LoginW" component={LoginW} options={optionScreen} />
             <Stack.Screen name="About" component={About} options={optionScreen} />
         </Stack.Navigator>

    );
}
