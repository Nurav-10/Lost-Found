'use client'
import React, { useState } from "react";
import { createContext,useContext } from "react";

interface themeContext{
   theme:string,
   setThemes:()=>void
}
const ThemeContext=createContext<themeContext|undefined>(undefined)

export const ThemeProvider=({children}:{children:React.ReactNode})=>{
   const [theme,setTheme]=useState('light')

   const setThemes=()=>{
      setTheme(prev=>prev==='light'?'dark':'light')
   }
   return <ThemeContext.Provider value={{theme,setThemes}}>
      {children}
   </ThemeContext.Provider>
}

export const useTheme=()=>{
   const context=useContext(ThemeContext)
   if(!context) throw new Error('Theme context must be used within theme provider')

   return context;   
}