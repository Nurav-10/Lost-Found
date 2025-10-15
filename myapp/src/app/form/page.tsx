'use client'

import { ImageIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

const page = () => {
   const inputRef=useRef<HTMLInputElement>(null)
   const [state,setState]=useState('lost')
   const [address,setAddress]=useState('')
   const [title,setTitle]=useState('')
   const [file,setFile]=useState<File|null>(null)
   const [preview,setPreview]=useState('')

   const changeState=()=>{
      setState(prev=>prev==='lost'?'found':'lost')
   }
   const handleFile=async(files:FileList|null)=>{
    try{
    if(files && files.length>0){
      setFile(files[0])

      const formData=new FormData()
      formData.append('file',files[0])
      const response=await fetch('/api/upload',{
        method:'POST',
        body:formData
      })
      const res=await response.json()
      if(res.success){
        toast.success('Uploaded image successfully')
        setPreview(res.url)
        console.log(res.secure_url)
      } else{
        toast.error(res.message)
      }
    }
  }
  catch(err){
    toast.error('Problem while uploading image')
  }
   }

   const openFilePicker=()=>{
      inputRef.current?.click()
   }

   const handleDragOver=(e:React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault()
   }

   const handleDrop=(e:React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault()
    handleFile(e.dataTransfer.files)
   }
   
   const handleSubmit=async()=>{
    if(!title || !address || !state || !preview){
      toast.error('Please provide all information')
      return
    }
    const formData=new FormData()
    formData.append('title',title)
    formData.append('picture',preview)
    formData.append('state',state)
    formData.append('address',address)

    try{
      const response=await fetch('/api/form',{
        method:'POST',
        body:formData
      })

      const res=await response.json()
      setTitle('')
      setAddress('')
      setPreview('')
      setState('lost')
      if(res.success)
      {
        toast.success('Item added successfully')
        return
      }
      toast.error('Item Not added')
      
    }
    catch{
      toast.error('Error while uploading form details')
    }
   }

  return (
    <div className="px-10 min-h-screen bg-gradient-to-bl from-cyan-100 to-purple-300 z-0">
      <div className="border-l-1 border-r-1 bg-white border-zinc-900  px-2 py-1 h-screen">
        <h2 className="border-zinc-800 border w-fit font-semibold rounded-md px-2">
          Lost/Found Item Form
        </h2>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-sm px-6 py-5 border border-zinc-900">
          <h2 className="text-lg font-semibold underline  underline-offset-2 mb-3">
            Item Form
          </h2>
          <div>
          <div className="flex flex-col gap-0.5">
            <label>Title</label>
            <input
             value={title}
              onChange={(e)=>setTitle(e.target.value)}
              type="text"
              className="border border-zinc-800 outline-none px-2 rounded-sm"
            ></input>
          </div>

          <div className="flex flex-col gap-0.5">
            <label>Address</label>
            <input
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              type="text"
              className="border border-zinc-800 outline-none px-2 rounded-sm"
            ></input>
          </div>

          <div className="flex flex-col gap-0.5">
            <label>Picture</label>
            <input
            ref={inputRef}
            onChange={(e)=>handleFile(e.target.files)}
              type="file"
              className="border hidden border-zinc-800 outline-none px-2 rounded-sm"
            ></input>
            <div 
            onClick={openFilePicker}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border px-2 py-2 rounded-md hover:bg-green-300/80 cursor-pointer border-zinc-950 flex flex-col items-center">Drop or Add Picture here<span className="text-center"><ImageIcon size={18} className="hover:fill-blue-300"/></span>
            {preview && <Image className='w-30 h-30 object-cover' src={preview} alt="image" width={100} height={100}/>}</div>
          </div>


           <div className="flex flex-row gap-2 my-2">
            <label>State</label>
         <div className="flex gap-1">
            <div className={`${state==='lost'&& 'bg-red-400 hover:bg-red-500 text-white'} text-black px-2  font-semibold border border-zinc-900 rounded-md cursor-pointer`} onClick={changeState}>Lost</div>
            <div className={`${state==='found'&& 'bg-green-400 hover:bg-green-500 text-white'} text-black px-2  font-semibold border border-zinc-900  rounded-md cursor-pointer`} onClick={changeState}>Found</div>
         </div>
          </div>

          <button type="submit" onClick={handleSubmit} className="px-2 py-0.5 rounded-sm border border-zinc-800 hover:shadow-[2px_2px_1px_rgba(0,0,0,1)] mt-2 hover:bg-green-400 hover:text-white font-semibold">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
