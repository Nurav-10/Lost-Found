'use client'
import { LogoutAction } from '@/actions/logoutAction'
import { Dispatch, SetStateAction } from 'react'
import { createContext,useContext,useState } from 'react'
import { useEffect } from 'react'
import React from 'react'

interface User{
   name:string,
   email:string,
   mobileNo:string,
   profilePicture?:string
}
interface AuthContextInterface{
   user:User|null,
   setUser:Dispatch<SetStateAction<User|null>>;
   logout:()=>void,
   loading:Boolean
}

const AuthContext=createContext<AuthContextInterface|undefined>(undefined)

export const AuthProvider=({children}:{children:React.ReactNode})=>{
   const [user,setUser]=useState<User|null>(null)
   const [loading,setLoading]=useState(false)

     useEffect(() => {
      setLoading(true)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false)
  }, []);


   const logout=async()=>{
      //remove cookie call action.
      await LogoutAction()
      setUser(null)
   }

   return (
      <AuthContext.Provider value={{user,setUser,logout,loading
      }}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth=()=>{
   const context=useContext(AuthContext)
   if(!context) throw new Error('useAuth must be used within an AuthProvider')

      return context;
}