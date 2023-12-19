import { Text, ScrollView, BackHandler, StyleSheet, Image } from "react-native";
import { styles } from "./style";
import React from "react";




export function MapActive({ navigation }) {
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
      <Image
        source={require('../../img/temp/temp.png')} // replace with your image URL
        style={tempStyle.image}
      />
    </ScrollView>
  );
}

const tempStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover', // or 'contain' or 'stretch'
  },
});
