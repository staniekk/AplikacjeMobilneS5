import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/navigation/Stack';
import DrawerNav from './src/navigation/Drawer';
import FirstStackNav from './src/navigation/FirstStack';


export default function App() {
  return (
    <NavigationContainer>
      <FirstStackNav />
    </NavigationContainer>
  );
}
