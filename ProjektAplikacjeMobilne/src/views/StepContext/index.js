// StepContext.js
import React, { createContext, useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';

export const StepContext = createContext({
  currentStepCount: 0,
  isPedometerAvailable: 'checking'
});

export const StepProvider = ({ children }) => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');

  useEffect(() => {
    let subscription;
    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(isAvailable ? 'available' : 'unavailable');
  
      if (isAvailable) {
       
        subscription = Pedometer.watchStepCount(result => {
          setCurrentStepCount(prevCurrentSteps => prevCurrentSteps + result.steps);
        });
      }
    };
  
    subscribe();
  
    return () => subscription && subscription.remove();
  }, []);

  return (
    <StepContext.Provider value={{ currentStepCount, isPedometerAvailable }}>
      {children}
    </StepContext.Provider>
  );
};
