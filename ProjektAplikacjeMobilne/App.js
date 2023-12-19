// App.js
import { NavigationContainer } from '@react-navigation/native';
import StackNav from "./src/navigation/Stack";
import { ThemeProvider } from './src/Constants/ThemeContext';


export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
    </ThemeProvider>

  );
}
