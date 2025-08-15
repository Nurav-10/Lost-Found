import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { file } = await req.json();

    const uploaded = await cloudinary.uploader.upload(file, {
      folder: "Lost-found",
    });

    return NextResponse.json({
      url: uploaded.secure_url,
      status: 200,
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}
