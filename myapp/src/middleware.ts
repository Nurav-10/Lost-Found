import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request:NextRequest){
   try{
      const token=request.cookies.get('token')?.value

      if(!token) return NextResponse.json({
         message:'No Token Found! Please Login'
      },{status:401})

      //check token has role admin.
      const secret=new TextEncoder().encode(process.env.JWT_SECRET)

      const {payload}=await jwtVerify(token,secret) 

      if(payload?.role==='Admin')
         return NextResponse.next()

      else
         return NextResponse.json({
      message:'Forbidden admin only'},{status:403})
   }
   catch(err){
      return NextResponse.json({
         success:false,
         message:`Invalid token,${err}`
      },{status:401})
   }
}

export const config={
   matcher:['/api/admin/:path*']
}