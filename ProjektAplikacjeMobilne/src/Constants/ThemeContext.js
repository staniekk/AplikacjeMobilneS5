import React, { createContext, useState, useEffect } from 'react';

export const lightTheme = {
    background: '#11B5E4',
    text: '#FFFFFF',
};

export const darkTheme = {
    background: '#000000',
    text: '#FFFFFF',
};

export const ThemeContext = createContext({
    isDarkMode: false,
    theme: lightTheme,
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [theme, setTheme] = useState(lightTheme);

    useEffect(() => {
        setTheme(isDarkMode ? darkTheme : lightTheme);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
