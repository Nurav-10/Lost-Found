import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file)
      return NextResponse.json(
        {
          message: "No File Uploaded",
        },
        {
          status: 400,
        }
      );
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64 Data URI
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary from base64 string
    const uploaded = await cloudinary.uploader.upload(base64Data, {
      folder: "Lost-found",
    });

    return NextResponse.json({
      url: uploaded.secure_url,
      status: 200,
      success: true,
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}
