import { NavigationContainer } from '@react-navigation/native';
import StackNav from "./src/navigation/Stack";
import React from 'react';

export default function App() {
  return (
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
  );
}
