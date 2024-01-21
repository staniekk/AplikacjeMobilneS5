import { func } from 'prop-types';
import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';

export const SettingsContext = createContext({
    stepLength: 1.00,
    userID: -1,
    dailyStepGoal: 10000,
});

export default function SettingsContextProvider({ children }) {

  const [stepLength, setStepLength] = useState(1.00);
  const [userID, setUserID] = useState(-1);
  const [dailyStepGoal, setDailyStepGoal] = useState(10000);


  useEffect( () => {

    const getSettings = async () => {
        axios.get('https://65ad4acaadbd5aa31be0832b.mockapi.io/am/userSettings')
    .then(response => {
        const userSettings = response.data;
        const foundSettings = userSettings.find(settings => settings.userID === userID);
        if (foundSettings) {
            console.log('Settings step goal:' +  foundSettings.dailyStepGoal);
            console.log('Authenticated user:' +  foundSettings);
        } else {
            Alert.alert("Error", "Settings not found");
        }
    })
    .catch(error => {
        Alert.alert("Login Error", error.message);
    });
    }

    
    if(userID !== -1){
        getSettings();
    }

  }, [userID]);

  return (
    <SettingsContext.Provider 
    value={{ 
        stepLength, setStepLength,
        userID, setUserID,
        dailyStepGoal, setDailyStepGoal
    }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
