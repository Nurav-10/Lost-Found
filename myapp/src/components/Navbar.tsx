"use client";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, Moon, Sun } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import { usePathname, useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

interface User {
  name: string;
  email: string;
  mobileNo: string;
  profilePicture?: string;
}

export const Navbar = () => {
  const [logo, setLogo] = useState("&");
  const [fade, setFade] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const {theme,setThemes}=useTheme()
  const pathName=usePathname()
  const navlinks = [
    {
      title: "Home",
      href: "/",
      id: 1,
    },
    {
      title: "LostItems",
      href: "/lostitems",
      id: 2,
    },
    {
      title: "FoundItems",
      href: "/founditems",
      id: 3,
    },
    {
      title: "About",
      href: "/about",
      id: 4,
    },
    {
      title: "Form",
      href: "/form",
      id: 5,
    },
  ];
  const { user, loading, logout } = useAuth();
  const router=useRouter()
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setFade(false) //
  //     setTimeout(() => {
  //       setLogo(prev => prev === '&' ? '|' : '&')
  //       setFade(true)
  //     }, 200) //
  //   }, 3000)

  //   return () => clearInterval(timer)
  // }, [])

  if (loading) return <h2 className="p-3 text-red-400">Loading...</h2>;
  return (
    <div className={`${theme==='light'?'text-black':'text-white'} px-2 relative py-2 flex w-full  items-center justify-between border-b-1 border-b-zinc-600 `}>
      <Link
        href={"/"}
        className={`${poppins.className} logo text-xl md:text-2xl font-semibold relative flex items-center gap-1`}
      >
        <span className="duration-300 transition-all ease-in-out">Lost</span>
        <span
          className={`duration-200 transition-opacity ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {logo}
        </span>
        <span>Found</span>
      </Link>

      {!pathName.includes('/admin') && <motion.div
        initial={{ height: 4 }}
        animate={
          dropDown ? { height: "auto", opacity: 1 } : { height: 20, opacity: 1 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onHoverStart={() => setDropDown(true)}
        onHoverEnd={() => setDropDown(false)}
        onClick={() => setDropDown((prev) => !prev)} 
        className={`navlinks absolute top-12 right-5 text-sm  flex flex-col w-fit overflow-hidden gap-0.5`}
      >
        <motion.span className="flex items-center text-sm cursor-pointer">
          <ArrowDown
            size={15}
            className={`mr-1 mt-0.5 ${dropDown ? "rotate-0" : "-rotate-90"}`}
          />
          Drop Down Menu
        </motion.span>
        {navlinks.map((i) => {
          return (
            <Link
              href={i.href}
              key={i.id}
              className="font-['poppins'] hover:text-blue-500  hover:bg-blue-100 px-1 text-right hover:text-lg duration-200 transition-all ease-in-out rounded-md"
            >
              {i.title}
            </Link>
          );
        })}
      </motion.div>
}
      <div className="flex gap-2 sm:gap-3 items-center"
      >
        <div>
          { user?.email===process.env.NEXT_PUBLIC_ADMIN_EMAIL && <h2 className="px-2 py-0.5 font-semibold text-zinc-800 rounded-md border bg-gradient-to-bl from-orange-400 to-cyan-200 hover:scale-103 transition-all duration-150 ease-in cursor-pointer" onClick={()=>router.push('/admin')}>Admin</h2>}
        </div>
        <div className={`rounded-full bg-gradient-to-bl from-red-800/40 to-cyan-400/40 border ${theme==='light'?'border-zinc-900 ':' border'} p-1`}
        onClick={setThemes}>
        {
          theme==='light'?
          <Moon size={14}/>:
          <Sun size={14}/>
        }
        </div>
        { !user?.name ? (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="px-2 border rounded-sm border-zinc-800 text-white bg-blue-500 font-semibold transition-all duration-200 hover:shadow-[1px_1.5px_1px_rgba(0,0,0,1)]"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-2 border rounded-sm border-zinc-800 transition-all duration-200 hover:bg-emerald-300 hover:shadow-[1px_1.5px_1px_rgba(0,0,0,1)]"
            >
              SignUp
            </Link>
          </div>
        ) : (
          <button
            onClick={()=>{
              logout()
              router.push('/')
            }}
            className="bg-red-400 px-2 py-0.5 rounded-md border border-zinc-900 cursor-pointer font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
