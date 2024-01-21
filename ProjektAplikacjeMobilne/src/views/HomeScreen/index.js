import React, { useContext, useEffect } from 'react';
import { Text, View, Pressable, Image, BackHandler, Alert } from 'react-native';
import { styles } from './style';
import { StepContext  } from '../../Context/stepContext';
import { SettingsContext } from '../../Context/settingsContext';
import { random } from 'node-forge';

// Główny ekran aplikacji
//Odpowiada za wyświetlania zrobionych kroków w trakcie danej sesji oraz przebytej odległości
export function HomeScreen({ navigation }) {

  const {setIsRunning, setStartTime,currentStepCount, startTime} = useContext(StepContext);
  const {stepLength, dailyStepGoal} = useContext(SettingsContext);
  const {tip, setTip} = useState("Idź pobiegać");
  const {userID} = useContext(SettingsContext)

const onPress = () => {
  setIsRunning(true);
  setStartTime(new Date());
  navigation.navigate('Map');
}

  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  //Losowanie porady dnia
  useEffect(()=>{
    const a =[
      "Idź pobiegać!",
      "Wyjdź z domu!",
      "Ruch do zdrowie!"
  ]
    const randomIndex = Math.floor(Math.random() * a.length);
    setTip(a[randomIndex])
  }, [userID]);

  //Obliczanie dystansu na bazie ilości kroków i wielkości kroku użytkownika
  const distance = (currentStepCount/100 / stepLength / 1000).toFixed(2);

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
             {Math.round(currentStepCount/100 / stepLength)}
            
            </Text>
            <View style={styles.line} />
            <Text style={styles.goalText}>{dailyStepGoal}</Text>
          </View>
        </View>

        <Text style={styles.totd}>Porada dnia</Text>
        <Text style={styles.tipInfo}>{tip}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable style={styles.loginBtn} onPress={onPress}>
          <Text style={styles.loginText}>Run!</Text>
        </Pressable>
      </View>
    </View>
  );
}
