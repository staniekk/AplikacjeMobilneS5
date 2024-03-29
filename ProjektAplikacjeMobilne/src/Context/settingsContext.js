import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';


    //SettingsContext - przetrzymuje podstawowe informacje o uzytkowniku oraz jego ustawienia
export const SettingsContext = createContext({
    stepLength: 1.00,
    userID: 1,
    dailyStepGoal: 10000,
});


    
export default function SettingsContextProvider({ children }) {

  const [stepLength, setStepLength] = useState(1.00);
  const [userID, setUserID] = useState(1);
  const [dailyStepGoal, setDailyStepGoal] = useState(10000);


    // getSettings - funkcja odpowiedzialna za pobranie ustawień użytkownika z bazy. 
    // Jest uruchamiana w momencie zmiany userID, czyli przy zalogowaniu.
    // W momencie, w który nie znajdzie tych ustawień(np. jest to pierwszy raz gdy użytkownik się loguje)
    // tworzy nowy rekord do bazy, z domyślnymi ustawieniami
  useEffect( () => {

    const getSettings = async () => {
        axios.get('https://65ad4acaadbd5aa31be0832b.mockapi.io/am/userSettings')
    .then(response => {
        const userSettings = response.data;
        const foundSettings = userSettings.find(settings => settings.userID === userID);
        if (foundSettings) {
            
            setDailyStepGoal(foundSettings.dailyStepGoal)
            console.log('Succes getting settings');
            console.log('Settings step goal:' +  foundSettings.dailyStepGoal);
        } else {
            setDailyStepGoal(10000)
            axios.post('https://65ad4acaadbd5aa31be0832b.mockapi.io/am/userSettings', {
                userID: userID,
                dailyStepGoal: 10000
            })
            .then(() => {
                console.log("Success, new settings posted.");
            })
            .catch(error => {
                Alert.alert("Registration Error", error.message);
            });
            
        }
    })
    .catch(error => {
        Alert.alert("Settings post/get Error", error.message);
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
