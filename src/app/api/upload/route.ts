import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided in form data" },
        { status: 400 }
      );
    }

    const downloadsDir = path.join(process.cwd(), "public", "downloads");
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cleanName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const filename = `${Date.now()}_${cleanName}`;
    const filePath = path.join(downloadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    console.log(`Uploaded file saved to: ${filePath}`);

    return NextResponse.json({
      message: "File uploaded successfully to local server.",
      filename: filename,
      originalName: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      downloadUrl: `/api/downloads/${filename}`,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Next API Upload Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error uploading file" },
      { status: 500 }
    );
  }
}
