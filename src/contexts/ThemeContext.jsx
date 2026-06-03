import React, { createContext, useContext } from "react";

const ThemeContext = createContext({
  theme: "light",
  isDark: false,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const value = {
    theme: "light",
    isDark: false,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
