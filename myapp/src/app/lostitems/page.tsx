'use client'
import { Navbar } from '@/components/Navbar'
import { useTheme } from '@/context/themeContext'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface Data{
   _id:string,
   title:string,
   address:string,
   picture:string
}

const page = () => {
   const {theme}=useTheme()
   const [lostData,setLostData]=useState<Data[]|null>(null)
   const {data:lostDataList,isLoading,refetch}=useQuery({
      queryKey:['lostList'],
      queryFn:async()=>{
         const response=await fetch('/api/lostList',{
            method:'GET'
         }).then(res=>res.json())
         if(response) setLostData(response.data)
      }
   })

   const claimItem=async(itemId:String,claimUserId:String)=>{
      if(!itemId || !claimUserId){
         toast.error("Please provide the fields")
      }
   }

  return (
    <div className={`${theme==='light'?'bg-gradient-to-br from-cyan-200/40 to-amber-400/30 text-zinc-800':'bg-zinc-900 text-white'} font-['poppins'] min-h-screen w-screen px-5`}>
      <div className={`${theme==='light'?'border-zinc-800':'border-white'} border-l-1 border-r-1 min-h-screen w-full`}>
         <Navbar/>
         <h2 className='px-3 text-xl border rounded-md border-zinc-500 w-fit mt-2 ml-2'>Lost Items</h2>
         <div className='grid md:grid-cols-3 grid-cols-2 gap-2 w-full p-4'>
         {
            lostData?.map((i)=>{
               return (
                  <div key={i._id} className='flex  text-sm p-1 rounded-md border flex-col items-center justify-center'>
                     <Image src={i.picture} width={100} height={100}
                     className='w-20 h-20 object-cover' alt='item-image'/>
                     <h2 className='text-center'>{i.title}</h2>
                     <h2 className='text-center'>{i.address}</h2>
                     <button className='border px-2 py-0.5 bg-emerald-300 text-white font-semibold rounded-md' onClick={claimItem}>Claim</button>
                  </div>
               )
            })
         }
         </div>
      </div>
    </div>
  )
}

export default page