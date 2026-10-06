import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Media from "@/models/Media";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename) {
      return new NextResponse("Filename is required", { status: 400 });
    }

    // 1. Check local filesystem cache first if available
    try {
      const localPath = path.join(process.cwd(), "public", "uploads", filename);
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath);
        const ext = path.extname(filename).toLowerCase();
        let mime = "application/octet-stream";
        if (ext === ".png") mime = "image/png";
        else if (ext === ".jpg" || ext === ".jpeg") mime = "image/jpeg";
        else if (ext === ".webp") mime = "image/webp";
        else if (ext === ".gif") mime = "image/gif";
        else if (ext === ".svg") mime = "image/svg+xml";
        else if (ext === ".pdf") mime = "application/pdf";

        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": mime,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch {}

    // 2. Fetch from MongoDB Atlas Media collection
    await dbConnect();
    const mediaDoc = await Media.findOne({ filename });

    if (!mediaDoc || !mediaDoc.data) {
      return new NextResponse("Media not found", { status: 404 });
    }

    return new NextResponse(mediaDoc.data, {
      status: 200,
      headers: {
        "Content-Type": mediaDoc.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Error serving media:", error);
    return new NextResponse("Error retrieving file", { status: 500 });
  }
}
