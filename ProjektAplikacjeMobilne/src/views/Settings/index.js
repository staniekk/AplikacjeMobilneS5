import React from 'react';
import { View, Text, ScrollView, BackHandler, Switch} from 'react-native';
import { styles } from './style';
import { ThemeProvider, ThemeContex } from '../../Constants/ThemeContext';






export function Settings() {
    React.useEffect(() => {
        const backAction = () => {
          return true;
        };
        
        const { isDarkMode, toggleTheme } = useContext(ThemeContext);

        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
      return (
        <ScrollView style={styles.mainContainer}
                keyboardShouldPersistTaps='handled'>
                
                <Switch onValueChange={toggleTheme} value={isDarkMode} />

          <Text style={styles.textInfo}>Ustawienia</Text>
        </ScrollView>
      );
}
