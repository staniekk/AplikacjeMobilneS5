import { Text, ScrollView, BackHandler, StyleSheet, Image, View, Alert } from "react-native";
import { styles } from "./style";
import React, { useRef, useEffect, useState } from "react";
import * as Location from 'expo-location';
//import { Accelerometer } from 'expo-sensors';
import MapView, { Callout, Marker } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";


const MapActive = ({ navigation, route }) => {
  
  const mapRef = useRef();
  const [ shouldRun, setShouldRun] = useState([route.params]);
  const [ {x, y, z}, setData] = useState({x:0, y:0, z:0});
  const [location, setLocation] = useState();
  const [initialRegion, setInitialRegion] = useState({ latitude: 50.8795,
    longitude: 20.6400,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,});

  const onRegionChange = (region) => {
    console.log("Region");
    console.log(region);

  }

  function getCurrentLocation() {
    const timeout = 10000;
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
        mapRef.current.animateCamera({center:{
          latitude: currentLocation?.coords.latitude, longitude: currentLocation?.coords.longitude, 
          latitudeDelta:initialRegion.latitudeDelta, longitudeDelta: initialRegion.longitudeDelta}},
          {duration:  200})
      }
      catch(error){ 
          console.log("Follow error: " + error);
      }
      finally{
          setTimeout(followLocation, 1500);
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
        showsMyLocationButton={true}
        showsUserLocation={true}
        rotateEnabled={false}
        followsUserLocation={true}
        maxDelta={0.005}
        initialRegion={initialRegion}
       >{location &&  (
        <Marker
                coordinate={{
                  longitude: location?.coords.longitude,
                  latitude: location?.coords.latitude
                }}
              ></Marker>
       )}
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
