'use client'
import React, { useState } from 'react'
import user1 from '../../public/user1.jpg'
import user2 from '../../public/user2.jpg'
import user3 from '../../public/user3.jpg'
import user4 from '../../public/user4.jpg'
import user5 from '../../public/user5.jpg'
import user6 from '../../public/user6.jpg'
import user7 from '../../public/user7.jpg'
import Image from 'next/image'
import {motion} from 'motion/react'
import { useTheme } from '@/context/themeContext'

const Carousel = () => {
  const carouselData=[
    {
      id:0,
      name:'Varun',
      location:'Mumbai,Maharashtra',
      image:user1
    },
    {
      id:1,
      name:'Riya Sharma',
      location:'Kanpur,UP',
      image:user2
    },
    {
      id:2,
      name:'Anunay Verma',
      location:'Delhi,India',
      image:user3
    },
    {
      id:3,
      name:'Priya Shukla',
      location:'Bihar,UP',
      image:user4
    },
    {
      id:4,
      name:'Abdul Rauf',
      location:'Pakistan,India',
      image:user5
    },
    {
      id:5,
      name:'Kartik Gupta',
      location:'Pune,Maharashtra',
      image:user6
    },
    {
      id:6,
      name:'Ridham Malviya',
      location:'Manali,HP',
      image:user7
    }
  ]
  const {theme}=useTheme()
  return (
    <motion.div
    initial={{opacity:0,y:50}}
    animate={{opacity:100,y:0}}
    transition={{duration:1,delay:1.5,ease:"easeIn"}}
    className={`px-2 flex flex-col gap-1 font-['poppins'] overflow-x-hidden ${theme==='light'?'text-black':'text-white'}`}>
      <h2 className='text-xl'></h2>
      <motion.div    
    //   animate={{ x:["100%","-100%"]}}
    //   transition={{duration:12,
    //   repeat:Infinity,
    //   repeatType:'loop',
    //   ease:'linear'
    // }}
      className='flex gap-5 sm:w-[130vw] w-[180vw] overflow--x-hidden'>
        {
          carouselData.map(i=>{
            return(
              <motion.div key={i.id}
             
              className='border border-zinc-800 rounded-sm overflow-hidden'>
                <Image src={i.image} alt='image' className='w-48 h-40 object-cover border-b-1 border-zinc-700'/>
                <h2 className='text-sm text-center'>{i.name}</h2>
                <h2 className='text-xs text-center'>{i.location}</h2>
              </motion.div>
            )
          })
        }
      </motion.div>
      </motion.div>

  )
}

export default Carousel