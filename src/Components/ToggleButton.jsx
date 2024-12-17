import React from 'react'
import { useTheme } from '../context/ThemeContext'

import Light from "../assets/svg/light.svg"
import Dark from "../assets/svg/dark.svg"

export const ToggleButton = () => {
   const {theme, toggleTheme} = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md"
    >
      <img src={theme === 'light' ? Light : Dark} alt="" />
    </button>
  );
  
}
