import { func } from 'prop-types';
import React, { createContext, useState, useEffect, useContext } from 'react';

export const SettingsContext = createContext(null);

export const useSettings = useContext(SettingsContext);

export default function SettingsContextProvider({ children }) {

  const [stepLength, setStepLength] = useState(1.00);
  const [userID, setUserID] = useState(-1);



  return (
    <SettingsContext.Provider 
    value={{ 
        stepLength, setStepLength,
        userID, setUserID
    }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
