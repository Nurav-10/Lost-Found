"use client";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/context/themeContext";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Data {
  title: string;
  address: string;
  _id: string;
  picture: string;
  state: string;
  status: string;
  createdAt?: string;
}

const page = () => {
  const { theme } = useTheme();
  const [dataForApproval, setDataForApproval] = useState<Data[] | null>(null);
  const [approvedData, setApprovedData] = useState<Data[] | null>(null);
  const [error, setError] = useState("");
  const [refresh,setRefresh]=useState(true)

  useEffect(()=>{
    dataApprovedRefetch()
    pendingDataRefetch()
  },[refresh])
  
  const approveItem = async (id: string) => {
    try {
      const response = await fetch("/api/admin/pendingList", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      }).then((res) => res.json());

      if (response.success) {
        toast.success(response.message);
        setRefresh(prev=>!prev)
        return;
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const rejectItem = async(id: string) => {
    try {
      const response = await fetch("/api/admin/pendingList", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      }).then((res) => res.json());

      if (response.success) {
        toast.success(response.message);
        setRefresh(prev=>!prev)

        return;
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const fetchedApprovedData=async()=>{
      try {
      const response = await fetch("/api/lostList", {
        method: "GET",
      }).then((res) => res.json());

      if (response) {
        setApprovedData(response.data);
        console.log(response.data);
      } else setError(response.message);
    } catch (err) {
      console.log(err);
    }
  }


  const fetchDataForApproval = async () => {
    try {
      const response = await fetch("/api/admin/pendingList", {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json());

      if (response.success) {
        setDataForApproval(response.data);
        console.log(response.data);
      } else setError(response.message);
    } catch (err) {
      console.log(err);
    }
  };
  const { data:pendingData, isLoading:pendingLoading,refetch:pendingDataRefetch } = useQuery({
    queryKey: ["pendingList"],
    queryFn: fetchDataForApproval,
  });

  const { data:dataApproved, isLoading:approvedDataLoading,refetch:dataApprovedRefetch } = useQuery({
    queryKey: ["approvedList"],
    queryFn: fetchedApprovedData,
  });
  

  if (pendingLoading || approvedDataLoading)
    return (
      <div className="p-3">
        <h2 className="font-['poppins'] text-lg">Loading...</h2>
      </div>
    );

  if (error)
    return (
      <div className="p-3">
        <h2 className="font-['poppins'] text-lg">{error}</h2>
      </div>
    );

  return (
    <div
      className={`min-h-screen px-5 w-screen font-['poppins'] ${
        theme === "light"
          ? "bg-gradient-to-bl from-amber-100 to-cyan-100 text-zinc-900"
          : "bg-zinc-900 text-white"
      } `}
    >
      <Navbar />
      <div className={`${theme==='light'?'border-zinc-900':'border-zinc-300'} h-full px-4 border-l-1 border-r-1`}>
        <div
          className={` py-2 w-full h-full ${
            theme === "light" ? "border-zinc-900" : "border-white"
          } px-2 flex flex-col gap-3`}
        >
          <h2 className="text-lg px-2 mt-2 w-fit border border-zinc-700 rounded-md bg-gradient-to-br from-red-500 to-cyan-100/40">
            Pending Approval
          </h2>
          <div className="flex flex-col gap-1">
            {dataForApproval?.length===0 && <h2 className="text-sm font-semibold px-3">No Items For Approval</h2>}
            {dataForApproval?.map((i) => {
              return (
                i.state === "lost" && (
                  <div
                    className={`${
                      theme === "light" ? "text-black" : "text-white"
                    } ${
                      theme === "light" ? "border-zinc-800" : "border-white"
                    } border p-2 rounded-md justify-between flex gap-2`}
                    key={i._id}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={i.picture}
                        alt="item-image"
                        width={100}
                        height={100}
                        className="w-15 rounded-md h-15 object-cover"
                      />
                      <div className="gap-1 flex flex-col text-xs sm:text-sm">
                        <h2>Title: {i.title}</h2>
                        <h2>Address: {i.address}</h2>
                        <h2>State: {i.state}</h2>
                      </div>
                    </div>
                    <div
                      className={`  text-sm flex gap-1 h-fit ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      <button
                        className={`border
                              ${
                                theme === "light"
                                  ? "border-zinc-800"
                                  : "border-white"
                              }  hover:bg-emerald-400 font-semibold px-2 py-0.5 rounded-md transition-all duration-150  hover:shadow-[2px_2px_1px_rgba(0,0,0,1)]`}
                        onClick={() => approveItem(i._id)}
                      >
                       <span className="hidden sm:flex">Approve</span>
                        <span className="sm:hidden flex"><CheckCircle size={15}/></span>
                      </button>
                      <button
                        className={`border ${
                          theme === "light" ? "border-zinc-800" : "border-white"
                        }  hover:bg-red-400 font-semibold px-2 py-0.5 rounded-md  transition-all duration-150 hover:shadow-[2px_2px_1px_rgba(0,0,0,1)]`}
                        onClick={() => rejectItem(i._id)}
                      >
                        <span className="hidden sm:flex">Reject</span>
                        <span className="sm:hidden flex"><X size={15}/></span>
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className={`${theme==='light'?'text-zinc-800 border-zinc-800':'text-white border-white'} border rounded-md w-fit text-lg px-2 bg-gradient-to-br from-emerald-500 to-yellow-200/80`}>Approved Items</h2>
            {
               approvedData?.map((i)=>{
                return(
                  <div>
                    <div
                    className={`${
                      theme === "light" ? "text-black" : "text-white"
                    } ${
                      theme === "light" ? "border-zinc-800" : "border-white"
                    } border p-2 rounded-md justify-between flex gap-2`}
                    key={i._id}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={i.picture}
                        alt="item-image"
                        width={100}
                        height={100}
                        className="w-15 rounded-md h-15 object-cover"
                      />
                      <div className="gap-1 flex flex-col text-xs sm:text-sm">
                        <h2>Title: {i.title}</h2>
                        <h2>Address: {i.address}</h2>
                        <h2>State: {i.state}</h2>
                      </div>
                    </div>
                     
                  </div>
                  </div>
                )
               })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
