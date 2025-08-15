import { NextResponse } from "next/server";
import Item from "@/models/ItemSchema";
import { db } from "@/dbconfig/db";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const picture = formData.get("picture") as string;
    const address = formData.get("address") as string;
    const state = formData.get("state") as string;

    await db();

    const newItem = await Item.create({ title, picture, address, state });
    await newItem.save();

    if (newItem)
      return NextResponse.json({
        success: true,
        message: "Lost Item Added",
        status: 200,
        data: newItem,
      });

    return NextResponse.json({
      status: 403,
      message: "Problem while creating item",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: `Internal Server Error,${err.message}`,
      status: 500,
    });
  }
}
