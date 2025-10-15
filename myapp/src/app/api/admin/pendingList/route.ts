import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/ItemSchema";
import { db } from "@/dbconfig/db";
import User from "@/models/userModel";

//from this api admin will get list of items for approval.
export async function GET(request: Request) {

  await db();
  try {
  

    const items = await Item.find({
      status: "approval pending",
    });

    if (items)
      return NextResponse.json(
        {
          success: true,
          message: "Successfully fetched the list of item for approval",
          length: items.length,
          data: items,
        },
        { status: 200 }
      );

    return NextResponse.json(
      {
        message: "There is no items pending for their approval",
      },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Cannot fetched the list of non approved items",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { id } = await request.json();
  await db();
  try {
    const item = await Item.updateOne({ _id: id }, { status: "approved" });
    if (!item)
      return NextResponse.json(
        { success: false, message: "Problem while changing the status" },
        { status: 403 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Successfully changed the status of the item",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Problem while updating the status of the lost product",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(request:NextRequest){
  try{
    const {id}=await request.json()
    const itemDelete=await Item.findByIdAndDelete({_id:id})
    if(itemDelete)
      return NextResponse.json({
    message:'Successfully deleted the item',
  success:true},{status:200})
  else
     return NextResponse.json({
    message:'Failed deleted the item',
  success:false},{status:404})
  }
  catch{
    return NextResponse.json({
      success:false,
      message:'Error while deleting the item'
    },{status:500})
  }
}