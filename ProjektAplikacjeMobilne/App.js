// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/Constants/ThemeContext';
import FirstStackNav from './src/navigation/FirstStack';
import { StepProvider } from './src/views/Context'; 

export default function App() {
  return (
    <StepProvider>
      <ThemeProvider>
        <NavigationContainer>
          <FirstStackNav />
        </NavigationContainer>
      </ThemeProvider>
    </StepProvider>
  );
}
