"use server";
import { db } from "@/dbconfig/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function Login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await db();

  if (!email || !password)
    return { success: false, message: "Please Provide the email and password" };

  try {
    const userExist = await User.findOne({ email });
    if (!userExist)
      return { status: 404, success: false, message: "User not found" };

    //if exist.
    const ifPass = await bcrypt.compare(password, userExist.password);
    if (!ifPass)
      return {
        status: 401,
        success: false,
        message: "Please provide correct password",
      };

    const data = {
      name: userExist.name,
      email: userExist.email,
      mobileNo: userExist.mobileNo,
      profilePicture: userExist.profilePicture,
      role:userExist.role
    };

    const token = await jwt.sign(data, process.env.JWT_SECRET!);

    const cookie=await cookies()
     cookie.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });
    return { status: 200, success: true, message: "Successfully login",data};
  } catch {
    return { success: false, message: "Problem while logging in" };
  }
}

