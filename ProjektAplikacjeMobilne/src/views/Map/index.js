import React, { useRef, useEffect, useState, useContext } from "react";
import { ScrollView, View, Text, Pressable, Alert, BackHandler } from "react-native";
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { SettingsContext } from "../../Context/settingsContext";
import { StepContext } from "../../Context/stepContext";
import { styles } from "./style";
import axios from 'axios';

const MapActive = ({ navigation }) => {
  const { stepLength, userID } = useContext(SettingsContext);
  const { isRunning, setIsRunning, runningStepCount, setRunningStepCount, startTime, endTime, setStartTime, setEndTime } = useContext(StepContext);
  const mapRef = useRef();
  const [location, setLocation] = useState();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 50.8795,
    longitude: 20.6400,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });


  

  const startRunning = () => {
      setIsRunning(true);
      setStartTime(new Date());    
  };

  const stopRunning = () => {
    const endTime = new Date();
    setEndTime(endTime);
    setIsRunning(false);

    const distance = runningStepCount * stepLength;
    const timeDiff = (endTime - startTime) / 1000; // czas w sekundach
    const currentDate = endTime.toLocaleDateString();
    const speed = distance/timeDiff; 

    Alert.alert("End of the run!", `You travelled ${distance} meters in ${timeDiff} seconds`, [
      { text: 'OK' },
    ],
    { cancelable: true });

    // Wysyłanie danych na serwer
    axios.post('https://65a40329a54d8e805ed451eb.mockapi.io/api/am/history', {
      dist: distance,
      time: timeDiff,
      userID: userID,
      steps: runningStepCount,
      date: currentDate,
      speed: speed,
    })
    .then(response => {
      console.log('Data sent successfully');
    })
    .catch(error => {
      console.error('Error sending data', error);
    });

    setRunningStepCount(0);
  };

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
          mapRef.current.animateToRegion({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }); 
        }
      }
      catch(error){ 
        console.log("Follow error: " + error);
      }
    }

    setTimeout(followLocation, 1000);
  };

  // Location
  useEffect(() => {
    const getLoc = async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        status = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
          console.log("still no permissions");
          return false;    
        }
        else{
          console.log("access granted"); 
        }
      }
      console.log("access granted");

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
    };
    getLoc();
  }, []);

  // Back button
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('DrawerNav');
      return true;
    };
    
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Content
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
        initialRegion={initialRegion}
      >
      </MapView>
     
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
        initialRegion={initialRegion}
      >
      </MapView>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Pressable style={styles.runBtn} onPress={startRunning}>
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
};

export { MapActive };
