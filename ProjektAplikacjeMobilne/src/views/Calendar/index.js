import { Text,ScrollView, BackHandler } from "react-native";
import { styles } from "./style";
import React from "react";




export function Calendar({ navigation }) {
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
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{
                flexGrow: 1,
                flex: 6,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
      <Text style={styles.textInfo}>Cześć tutaj zrób kalendarz</Text>
    </ScrollView>
  );
}
