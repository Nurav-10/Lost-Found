import { NextResponse } from "next/server";
import Item from "@/models/ItemSchema";
import { db } from "@/dbconfig/db";

export async function GET(request: Request) {
  //get list of item that has been lost.


  await db();

  //item that are approved by admin/moderator
  try {
    const items = await Item.find().where({ state: "lost",status:"approved"});
    if (items) {
      return NextResponse.json({
        status: 200,
        message: "Fetched list of lost items",
        length: items.length,
        data: items
      });

    } else {
      return NextResponse.json({
        success: false,
        message: "there is no items added yet.",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 404,
      message: "Problem while fetching the list",
    });
  }
}

export async function PATCH(request:Request){
  const {status,id}=await request.json()
  await db()
  try {
    const item=await Item.updateOne({_id:id},{status})
    if(item) return NextResponse.json({success:true,status:200,message:'Successfully changed the status'})

      return NextResponse.json({success:false,status:403,message:'Problem while changing the state'})

  } catch (error) {
    return NextResponse.json({success:false,status:500,message:'Problem while changing the status of the item'})
  }
  
}

