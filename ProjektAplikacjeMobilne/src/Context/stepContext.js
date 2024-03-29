import React, { createContext, useState, useEffect, useContext } from 'react';
import { Pedometer } from 'expo-sensors';


//StepContext - przetrzymuje informacje związane ze zliczaniem kroków oraz biegiem
export const StepContext = createContext({
  currentStepCount: 0,
  isRunning: false,
  runningStepCount: 0,
  setIsRunning: ({}),
  setRunningStepCount: ({}),
  currentTime:0,
  setCurrentTime: ({}),
  startTime: null,
  endTime:0,
  setStartTime:({}),
  setEndTime:({}),
  
});

export const StepProvider = ({ children }) => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [runningStepCount, setRunningStepCount] = useState(0);
  const [stepLength, setStepLength] = useState(1.00);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [permissions, setPermissions] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);


  //Steps when running - liczy ilość kroków w trakcie biegu
  useEffect(() => {
    let subscription;
    const subscribe = async () => {
      try {
        //Sprawdzenie permisji
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(isAvailable ? 'available' : 'unavailable');

        if (isAvailable) {
          const perm = await Pedometer.getPermissionsAsync();
          setPermissions(perm);

          subscription = Pedometer.watchStepCount(result => {
            console.log("Ilosc krokow biegania" + result.steps);
            setRunningStepCount(result.steps);

          });
          
        }
      } catch (error) {
        console.error('Error occurred: ', error);
      }
    };

    if(isRunning){
      subscribe();
    }
    

    return () => subscription && subscription.remove();
  }, [isRunning])

  //Normal steps - liczy ilość kroków zawsze
  useEffect(() => {
    let subscription;
    const subscribe = async () => {
      try {
        
        //Sprawdzenie permisji
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(isAvailable ? 'available' : 'unavailable');

        if (isAvailable) {
          const perm = await Pedometer.getPermissionsAsync();
          setPermissions(perm);

          subscription = Pedometer.watchStepCount(result => {
            console.log("Ilosc krokow");
            console.log(result.steps);
            setCurrentStepCount(result.steps);
            console.log("Zmienna trzymajaca kroki");
            console.log(currentStepCount);
          });
          
        }
      } catch (error) {
        console.error('Error occurred: ', error);
      }
    };

    subscribe();
    

    return () => subscription && subscription.remove();
  }, []);

  return (
    <StepContext.Provider value={{ currentStepCount, isPedometerAvailable, permissions, runningStepCount, setRunningStepCount, isRunning, setIsRunning, currentTime, setCurrentTime, startTime, endTime, setStartTime, setEndTime }}>
      {children}
    </StepContext.Provider>
  );
};
