import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const rawSlug = resolvedParams?.slug || "";
    const cleanSlug = decodeURIComponent(rawSlug).trim().toLowerCase();

    if (!cleanSlug) {
      return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
    }

    const blog = await BlogPost.findOne({
      $or: [
        { slug: cleanSlug },
        { slug: { $regex: new RegExp(`^${cleanSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") } },
      ],
    });

    if (!blog) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, blog },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    console.error("Error retrieving article by slug:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
