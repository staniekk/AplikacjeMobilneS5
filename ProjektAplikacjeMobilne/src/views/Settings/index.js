import React from 'react';
import { View, Text, ScrollView, BackHandler, Switch} from 'react-native';
import { styles } from './style';


export function Settings() {
    React.useEffect(() => {
        const backAction = () => {
          return true;
        };

        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
      return (
        <ScrollView style={styles.mainContainer}
                keyboardShouldPersistTaps='handled'>
                
          <Text style={styles.textInfo}>Ustawienia</Text>
        </ScrollView>
      );
}
