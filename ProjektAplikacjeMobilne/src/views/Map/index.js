import { Text, ScrollView, BackHandler, StyleSheet, Image } from "react-native";
import { styles } from "./style";
import React from "react";

const MapActive = ({ navigation, route }) => {
  // Provide a default value for route.params
  const { shouldRun } = route.params;

  console.log(shouldRun);

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

  const content = shouldRun ? (
    <Image
      source={require('../../img/temp/temp.png')} // replace with your image URL
      style={tempStyle.image}
    />
  ) : (
    <Text>AAA</Text>
  );

  return (
    <ScrollView 
      style={styles.mainContainer}
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{
          flexGrow: 1,
          flex: 6,
          alignItems: 'center',
          justifyContent: 'center',
      }}>
      {content}
    </ScrollView>
  );
}

export { MapActive };

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
