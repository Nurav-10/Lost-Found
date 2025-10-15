'use client'
import React from "react";
import Link from "next/link";
import Designs from "./Designs";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/themeContext";
const HeroSection = () => {
  const {theme}=useTheme()
  const router=useRouter()
  return (
    <div className={`px-2 font-['poppins'] sm:w-[68vw] w-[62vw] md:w-[70vw]  justify-between py-5 flex-row flex ${theme==='light'?'text-zinc-950':'text-white'}`}>
      <div className="flex flex-col gap-4 lg:gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl xl:text-6xl font-medium "
        >
          Lost Something? Found Something?
          <br /> We’re Here to Help.
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl w-[55vw] xl:text-2xl"
        >
          A community-driven platform to reunite lost items with their rightful
          owners.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-sm md:text-md w-[60vw] xl:text-lg"
        >
          <span className="underline underline-offset-2">Lost & Found</span> is
          your go-to portal to ensure no valuable goes unclaimed. Whether it’s a
          misplaced wallet, a found keychain, or even a missing pet – our goal
          is to connect people quickly and securely.
        </motion.p>
        <motion.button
        onClick={()=>router.push('/login')}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay:1.3 }}
          className="flex cursor-pointer hover:bg-gradient-to-br from-blue-300/70 to-white/70 md:w-fit :w-[60vw] mt-4 rounded-md border px-2 border-zinc-500"
        >
          <ArrowRight />
          Let’s bring lost things home. Report now and help someone in need.
        </motion.button>
      </div>
      <Designs />
    </div>
  );
};

export default HeroSection;
