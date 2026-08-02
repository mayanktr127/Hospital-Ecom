import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const safeFilename = path.basename(filename || "sample_doc.pdf");
    const downloadsDir = path.join(process.cwd(), "public", "downloads");
    
    let filePath = path.join(downloadsDir, safeFilename);

    if (!fs.existsSync(filePath)) {
      filePath = path.join(downloadsDir, "sample_doc.pdf");
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found on local server" },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Next API Download Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error serving download" },
      { status: 500 }
    );
  }
}
