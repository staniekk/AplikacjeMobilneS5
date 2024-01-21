import { Text, ScrollView, BackHandler, StyleSheet, Pressable, View, Alert, Button } from "react-native";
import { styles } from "./style";
import React, { useRef, useEffect, useState, useContext } from "react";
import * as Location from 'expo-location';
//import { Accelerometer } from 'expo-sensors';
import MapView, { Callout, Marker } from 'react-native-maps';
import { SettingsContext, useSettings } from "../../Context/settingsContext";
import { StepContext, useStepContext } from "../../Context/stepContext";


const MapActive = ({ navigation }) => {
  

  const {stepLength} = useContext(SettingsContext);
  const {isRunning, setIsRunning, runningStepCount, setRunningStepCount} = useContext(StepContext);
  
  const mapRef = useRef();
  const [ {x, y, z}, setData] = useState({x:0, y:0, z:0});
  const [location, setLocation] = useState();
  const [initialRegion, setInitialRegion] = useState({ latitude: 50.8795,
    longitude: 20.6400,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,});

  const stopRunning = () => { 
     setIsRunning(false);
     setRunningStepCount(0);
     const distance = runningStepCount * stepLength;
     Alert.alert("End of the run!", "You travelled " + distance.toString() + " meters",  [
      { text: 'OK'},
    ],
    { cancelable: true });
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
      if(isRunning){
        try{
          let currentLocation = await getCurrentLocation();
          if(currentLocation){
            setLocation(currentLocation);
          }
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
      }

      setTimeout(followLocation, 1000);
      
      
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


  const onPress = () => {
    setIsRunning(true);
    
  }

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
  const content = isRunning ? ( 
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
      <View style={{  alignItems: 'center', justifyContent: 'center' }}>
      <Pressable style={styles.runBtn} onPress={stopRunning}>
        
        <Text style={styles.runText}>End</Text>
      </Pressable>
      </View>
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
        maxDelta={0.006}
        initialRegion={initialRegion}
       >
      </MapView>
      <View style={{  alignItems: 'center', justifyContent: 'center' }}>
      <Pressable style={styles.runBtn} onPress={onPress}>
        
        <Text style={styles.runText}>Run!</Text>
      </Pressable>
      </View>
    
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
