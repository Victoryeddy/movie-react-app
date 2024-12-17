import React from 'react'
import { createContext, useContext, useState } from 'react'

export const ThemeContext  = createContext()

export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState("light");

   const toggleTheme = () => {
     setTheme((t) => (t === "light" ? "dark" : "light"));
   };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
     {children}
    </ThemeContext.Provider>
  )
}
