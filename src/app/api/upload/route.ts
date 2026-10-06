import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

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

    // Attempt to save to disk if environment allows writing (e.g. local development)
    let publicUrl = "";
    let savedToDisk = false;

    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filePath = path.join(uploadsDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);
      publicUrl = `/uploads/${uniqueFilename}`;
      savedToDisk = true;
    } catch (fsErr: any) {
      // EROFS (Read-only file system in Vercel/serverless environments) or permission issues:
      // Fallback: Convert to Base64 Data URL so upload NEVER fails
      console.warn("Disk write failed (likely serverless/read-only environment), falling back to data URL:", fsErr?.message);
      publicUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
    }

    return NextResponse.json({
      success: true,
      message: savedToDisk
        ? "File uploaded successfully to storage!"
        : "File uploaded successfully as secure inline data asset!",
      url: publicUrl,
      fileName: uniqueFilename,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
