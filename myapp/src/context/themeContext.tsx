import { Dispatch, SetStateAction } from 'react'
import { createContext,useContext,useState } from 'react'
import React from 'react'
interface AuthContextInterface{
   user:String|null,
   setUser:Dispatch<SetStateAction<string|null>>;
   loading:boolean,
   login:()=>Promise<void>
   logout:()=>Promise<void>
   signup:()=>Promise<void>
}

const AuthContext=createContext<AuthContextInterface|undefined>(undefined)

export const AuthProvider=({children}:{children:React.ReactNode})=>{
   const [user,setUser]=useState<string|null>(null)
   
}