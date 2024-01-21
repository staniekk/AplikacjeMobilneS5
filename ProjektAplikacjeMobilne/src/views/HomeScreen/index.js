import React, { useContext, useEffect } from 'react';
import { Text, View, Pressable, Image, BackHandler } from 'react-native';
import { styles } from './style';
import { StepContext } from '../Context';


export function HomeScreen({ navigation }) {
  const { currentStepCount} = useContext(StepContext);

  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const distance = (currentStepCount / 2000).toFixed(2);

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Image style={styles.logo} source={require('../../img/logo/Logo.png')}/>
        <Text style={styles.textInfoT}> Today:</Text>
        <Text style={styles.distanceText}>{`${distance} km`}</Text>
      </View>
      <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.backgroundCircle}>
          <View style={styles.pedometerContainer}>
            <Image style={styles.footprint} source={require('../../img/logo/footprint.png')}/>
            <Text style={styles.stepCount}>
             {currentStepCount}
            
            </Text>
            <View style={styles.line} />
            <Text style={styles.goalText}>8000</Text>
          </View>
        </View>

        <Text style={styles.totd}>Porada dnia</Text>
        <Text style={styles.tipInfo}>Lorem ipsum lorem ipsum</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable style={styles.loginBtn} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.loginText}>Run!</Text>
        </Pressable>
      </View>
    </View>
  );
}
