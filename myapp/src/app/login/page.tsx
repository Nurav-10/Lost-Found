'use client'
import { Login } from "@/actions/loginAction";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const page = () => {
 
  const {setUser,user,loading}=useAuth()
  const router=useRouter()
  const handleSubmit=async(formData:FormData)=>{
    const res=await Login(formData)
    if(res.success) {
      toast.success('Login Successfully')
      setUser(res.data!)
      router.push('/')
      return
    }
    toast.error(res.message!)
    return
  }
  useEffect(()=>{
    if(user) router.push('/')
  },[])
  return (
    <div className="px-10 min-h-screen bg-gradient-to-bl from-cyan-100 to-purple-300 z-0">
      <div className="border-l-1 border-r-1 bg-white border-zinc-900  px-2 py-1 h-screen">
        <h2 className="border-zinc-800 border w-fit font-semibold rounded-md px-2">
          Login Page
        </h2>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-sm px-6 py-5 border border-zinc-900">
          <h2 className="text-lg font-semibold underline  underline-offset-2 mb-3">
            Login Form
          </h2>
          <form action={handleSubmit}>
          <div className="flex flex-col gap-0.5">
            <label>Email</label>
            <input
            name="email"
              type="email"
              className="border border-zinc-800 outline-none px-2 rounded-sm"
            ></input>
          </div>

          <div className="flex flex-col gap-0.5">
            <label>Password</label>
            <input
            name="password"
              type="password"
              autoComplete="true"
              className="border border-zinc-800 outline-none px-2 rounded-sm"
            ></input>
          </div>

          <button type="submit" className="px-2 py-0.5 rounded-sm border border-zinc-800 hover:shadow-[2px_2px_1px_rgba(0,0,0,1)] mt-2 hover:bg-blue-400 hover:text-white font-semibold">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
