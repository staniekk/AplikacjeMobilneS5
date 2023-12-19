// App.js
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/Constants/ThemeContext';
import FirstStackNav from './src/navigation/FirstStack';


export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <FirstStackNav />
    </NavigationContainer>
    </ThemeProvider>

  );
}
