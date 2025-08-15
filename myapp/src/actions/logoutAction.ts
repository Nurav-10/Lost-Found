'use server'
import { cookies } from "next/headers";

export async function LogoutAction(){
   const cookie=await cookies()
   cookie.set('token','',{
      maxAge:0,
      path:'/'
   })
}