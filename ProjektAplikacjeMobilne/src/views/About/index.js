import { Text, View, BackHandler } from "react-native";
import {styles} from "./style";
import React from "react";




export function About({ navigation }) {
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textInfoTop}>About</Text>
        </View>
    );
}
