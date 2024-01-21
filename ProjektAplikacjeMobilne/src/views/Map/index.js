import { Text, ScrollView, BackHandler, StyleSheet, Image, View, Alert, Button } from "react-native";
import { styles } from "./style";
import React, { useRef, useEffect, useState } from "react";
import * as Location from 'expo-location';
//import { Accelerometer } from 'expo-sensors';
import MapView, { Callout, Marker } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "../../Context/settingsContext";
import { useStepContext } from "../../Context/stepContext";


const MapActive = ({ navigation }) => {
  

  const settings = useSettings;
  const stepContext = useStepContext;
  
  const mapRef = useRef();
  const [ shouldRun, setShouldRun] = useState([stepContext.isRunning]);
  const [ {x, y, z}, setData] = useState({x:0, y:0, z:0});
  const [location, setLocation] = useState();
  const [initialRegion, setInitialRegion] = useState({ latitude: 50.8795,
    longitude: 20.6400,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,});

  const stopRunning = () => {
     stepContext.isRunning = false;
     navigation.navigate('Map');
  }

  function getCurrentLocation() {
    const timeout = 1000;
    return new Promise(async (resolve, reject) => {
      setTimeout(() => { reject(new Error(`Error getting gps location after ${(timeout * 2) / 1000} s`)) }, timeout * 2);
      setTimeout(async () => { resolve(await Location.getLastKnownPositionAsync()) }, timeout);
      resolve(await Location.getCurrentPositionAsync());
    });
  }
  const followLocation = async () => {

      try{
        let currentLocation = await getCurrentLocation();
        if(currentLocation){
           setLocation(currentLocation);
        }
        console.log(currentLocation.coords.latitude + ' aa');
        mapRef.current.animateToRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
      catch(error){ 
          console.log("Follow error: " + error);
      }
      finally{
          setTimeout(followLocation, 1000);
      }

    }

  //Location
  useEffect(() =>{
    const getLoc = async () =>{

      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
          status = await Location.requestForegroundPermissionsAsync();
          if(status !== 'granted'){
            console.log("still no permissions");
            return false;    
          }
          else{
            console.log("access granted") 
          }
      }
      console.log("access granted")

      try{
        let currentLocation = await getCurrentLocation();
        if(currentLocation){
           setLocation(currentLocation);
        }
        
        setInitialRegion({
          latitude: currentLocation?.coords?.latitude,
          longitude: currentLocation?.coords?.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        followLocation();
        console.log("location:");
        console.log(location);
      }
      catch(error){
          console.log("error: " + error);
      }
     

   }
    getLoc();
   
  }, [])

  //Back button
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('DrawerNav');
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
        showsMyLocationButton={false}
        showsUserLocation={true}
        rotateEnabled={false}
        zoomEnabled={false}
        followsUserLocation={true}
        maxDelta={0.005}
        initialRegion={initialRegion}
       >
      </MapView>
      <Button onPress={stopRunning}></Button>
    </View>
   
  ) : (
    <View>
      <MapView
        ref={mapRef} 
        style={styles.map}
        showsMyLocationButton={true}
        showsUserLocation={true}
        rotateEnabled={true}
        zoomEnabled={true}
        followsUserLocation={true}
        maxDelta={0.010}
        initialRegion={initialRegion}
       >
      </MapView>
      <Text>Maybe start running button?</Text>
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
