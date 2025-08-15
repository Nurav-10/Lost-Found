'use server'
import { db } from "@/dbconfig/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
export async function register(formdata:FormData){
   await db()
   const name=formdata.get('name') as string
   const email=formdata.get('email') as string
   const password=formdata.get('password') as string
   const mobileNo=formdata.get('mobileNo') as string

   if(!name || !email || !password || !mobileNo) return{status:400,success:false,message:'Please provide all fields'}

   try{
      //check if user already not existed.
      const alreadyExist=await User.findOne({email,mobileNo})

      if(alreadyExist) return{success:false,message:'user already existed'}

      const hashedPassword=await bcrypt.hash(password,10)

      const newUser=new User({name:name,email:email,password:hashedPassword,mobileNo:mobileNo})
      await newUser.save()

      return {success:true,status:200,message:'New User created Successfully'}
   }
   catch(err){
      console.log(err)
      return {success:false,messgae:'User not created',status:400}
   }
}