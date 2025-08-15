import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req:NextRequest){
   const token=req.cookies.get('token')?.value

   if(!token){
      return NextResponse.redirect(new URL('/login',req.url))
   }

   try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET!) as {
         role:string
      }

      if(decoded.role!=='admin'){
         return NextResponse.json({message:'Forbidden'},{status:403})
      }
      return NextResponse.next();
   }
   catch{
      return NextResponse.redirect(new URL('/login',req.url))
   }
}

export const config={
   matcher:["/admin/:path*"]
}