'use client'
import Carousel from '@/components/Carousel'
import Designs from '@/components/Designs'
import HeroSection from '@/components/HeroSection'
import { Navbar } from '@/components/Navbar'
import React, { useEffect } from 'react'

const page = () => {
  return (
    <div className='min-h-screen w-screen bg-gradient-to-br from-blue-50/90 to-amber-100 px-10 '>
      <div className='border-r-1 border-l-1 border-zinc-700 w-full h-full'>
      <Navbar/>
      <HeroSection/>
      <Carousel/>
      </div>
    </div>
  )
}

export default page