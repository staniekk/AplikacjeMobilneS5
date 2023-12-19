import React, { createContext, useState, useMemo } from 'react';
import { lightTheme, darkTheme } from '../Constants/themes'; // Adjust the path as needed

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const theme = useMemo(() => {
        return isDarkMode ? darkTheme : lightTheme;
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
