import { Text, ScrollView, BackHandler, StyleSheet, Image, View, Alert } from "react-native";
import { styles } from "./style";
import React, { useRef, useEffect, useState } from "react";
//import * as Location from 'expo-location';
//import { Accelerometer } from 'expo-sensors';
import MapView, { Callout, Marker } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";

const MapActive = ({ navigation, route }) => {
  
  const mapRef = useRef();
  const [ shouldRun, setShouldRun] = useState([route.params]) ;
  const [ {x, y, z}, setData] = useState({x:0, y:0, z:0});
  const [location, setLocation] = useState();
  console.log(shouldRun);

  const onRegionChange = (region) => {
    console.log("Region");
    console.log(region);
  }


  /*//Location
  useEffect(() =>{
    const getPermissions = async () =>{
      let {status} = await Location.requestBackgroundPermissionsAsync();
      if(status !== 'granted'){
        return <Alert>Please grant permission for the Location</Alert> 
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("location:");
      console.log(location);
      getPermissions();
   }
  }, [])*/

  //Back button
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  //Content
  const content = shouldRun ? (
    <View style={styles.mainContainer}>
       <MapView
        ref={mapRef} 
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
       >
      </MapView>
    </View>
   
  ) : (
    <View>
      <Text>{shouldRun.toString()} AAA</Text>
    </View>
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
