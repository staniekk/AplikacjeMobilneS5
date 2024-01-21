import React, { createContext, useState, useEffect, useContext } from 'react';
import { Pedometer } from 'expo-sensors';

export const StepContext = createContext({
  currentStepCount: 0,
  isRunning: false,
  runningStepCount: 0,
  setIsRunning: ({}),
  setRunningStepCount: ({})
});

export const StepProvider = ({ children }) => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [runningStepCount, setRunningStepCount] = useState(0);
  const [stepLength, setStepLength] = useState(1.00);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [permissions, setPermissions] = useState(null);
  const [isRunning, setIsRunning] = useState(false);


  //Steps when running
  useEffect(() => {
    let subscription;
    const subscribe = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(isAvailable ? 'available' : 'unavailable');

        if (isAvailable) {
          const perm = await Pedometer.getPermissionsAsync();
          setPermissions(perm);

          subscription = Pedometer.watchStepCount(result => {
            console.log("Ilosc krokow");
            console.log(result.steps);
            setRunningStepCount(current => current + result.steps);
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

  //Normal steps
  useEffect(() => {
    let subscription;
    const subscribe = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(isAvailable ? 'available' : 'unavailable');

        if (isAvailable) {
          const perm = await Pedometer.getPermissionsAsync();
          setPermissions(perm);

          subscription = Pedometer.watchStepCount(result => {
            setCurrentStepCount(current => current + result.steps);
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
    <StepContext.Provider value={{ currentStepCount, isPedometerAvailable, permissions, runningStepCount, setRunningStepCount, isRunning, setIsRunning }}>
      {children}
    </StepContext.Provider>
  );
};
