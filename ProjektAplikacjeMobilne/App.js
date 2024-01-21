// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/Constants/ThemeContext';
import FirstStackNav from './src/navigation/FirstStack';
import { StepProvider } from './src/Context/stepContext'
import SettingsContextProvider from './src/Context/settingsContext';

export default function App() {
  return (
    <StepProvider>
      <SettingsContextProvider>
        <ThemeProvider>
          <NavigationContainer>
            <FirstStackNav />
          </NavigationContainer>
        </ThemeProvider>
      </SettingsContextProvider>
    </StepProvider>
  );
}
