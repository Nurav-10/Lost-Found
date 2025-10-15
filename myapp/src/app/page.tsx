'use client'
import Carousel from '@/components/Carousel'
import Designs from '@/components/Designs'
import HeroSection from '@/components/HeroSection'
import { Navbar } from '@/components/Navbar'
import { useTheme } from '@/context/themeContext'
import React, { useEffect } from 'react'

const page = () => {
  const {theme}=useTheme()
  return (
    <div className={`min-h-screen w-screen  ${theme==='light'?'to-amber-100':'bg-zinc-900'} px-5 `}>
      <div className='border-r-1 border-l-1 border-zinc-700 w-full h-full'>
        
      <Navbar/>
      <HeroSection/>
      <Carousel/>
      </div>
    </div>
  )
}

export default page