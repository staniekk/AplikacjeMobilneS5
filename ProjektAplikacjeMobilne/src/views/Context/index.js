import React, { createContext, useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';

export const StepContext = createContext({
  currentStepCount: 0,
});

export const StepProvider = ({ children }) => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [permissions, setPermissions] = useState(null);

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
    <StepContext.Provider value={{ currentStepCount, isPedometerAvailable, permissions }}>
      {children}
    </StepContext.Provider>
  );
};
