import { func } from 'prop-types';
import React, { createContext, useState, useEffect, useContext } from 'react';

export const SettingsContext = createContext({
    stepLength: 1.00,
    userID: -1
});

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
