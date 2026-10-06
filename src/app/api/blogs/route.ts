import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await dbConnect();
    const blogs = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, blogs },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const normalizedContent = Array.isArray(body.content)
      ? body.content
      : typeof body.content === "string"
        ? body.content.split(/\n\n+/).map((p: string) => p.trim()).filter(Boolean)
        : [];

    const newBlog = await BlogPost.create({
      ...body,
      content: normalizedContent.length > 0 ? normalizedContent : [body.content || ""],
    });
    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const normalizedContent = Array.isArray(body.content)
      ? body.content
      : typeof body.content === "string"
        ? body.content.split(/\n\n+/).map((p: string) => p.trim()).filter(Boolean)
        : [];

    const updatedBlog = await BlogPost.findOneAndUpdate(
      { slug: body.slug },
      {
        ...body,
        content: normalizedContent.length > 0 ? normalizedContent : [body.content || ""],
      },
      { new: true, runValidators: true }
    );
    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing article slug" }, { status: 400 });
    }

    await BlogPost.findOneAndDelete({ slug });
    return NextResponse.json({ success: true, message: `Article ${slug} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
