import Image from 'next/image'
import React from 'react'
import design1 from '../../public/design1.png'
import design2 from '../../public/design2.png'
import design3 from '../../public/design3.png'
import {motion} from 'motion/react'

const Designs = () => {
   const designs=[
      {
         id:0,
         src:design1
      },
      {
         id:1,
         src:design2
      },
      {
         id:2,
         src:design3
      }
   ]
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:1.6,ease:'easeIn'}}
    className='mt-24 lg:mt-10 sm:pr-13 overflow-hidden'>
      {
         designs.map((i)=>{
            return(
               <Image src={i.src} key={i.id} width={1000} height={1000}
               style={{transform:`rotate(${i.id*30}deg) translateX(${i.id*10}px)`,
               transformOrigin:"bottom center"}}
               alt='design' className='w-12 rounded-sm bg-pink-50/80  sm:w-28 md:w-32 lg:w-40 xl:w-45 absolute'/>
            )
         })
      }
    </motion.div>
  )
}

export default Designs