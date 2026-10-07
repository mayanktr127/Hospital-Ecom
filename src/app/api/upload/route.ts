import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { dbConnect } from "@/lib/mongodb";
import Media from "@/models/Media";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "application/octet-stream";

    // Clean filename and generate unique name
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `upload_${Date.now()}_${sanitizedFilename}`;

    // 1. Persist directly to MongoDB Atlas Media collection (Works everywhere: Vercel, localhost)
    try {
      await dbConnect();
      await Media.findOneAndUpdate(
        { filename: uniqueFilename },
        {
          $set: {
            filename: uniqueFilename,
            contentType: mimeType,
            data: buffer,
            size: buffer.length,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (dbErr: any) {
      console.error("MongoDB Atlas media save error:", dbErr);
    }

    // 2. Also save to local public/uploads as disk cache if the filesystem is writable
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filePath = path.join(uploadsDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);
    } catch (fsErr) {
      // Ignored in read-only / serverless environments like Vercel
    }

    const publicUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully to cloud database & media storage!",
      url: publicUrl,
      fileName: uniqueFilename,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
