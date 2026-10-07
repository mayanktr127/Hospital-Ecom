import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { serverCache } from "@/lib/cache";

export async function GET() {
  try {
    const cachedBlogs = serverCache.get<any>("blogs_list");
    if (cachedBlogs) {
      return NextResponse.json(
        { success: true, blogs: cachedBlogs, fromCache: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    await dbConnect();
    const blogs = await BlogPost.find({}).sort({ createdAt: -1 }).lean();
    serverCache.set("blogs_list", blogs, 180);

    return NextResponse.json(
      { success: true, blogs, fromCache: false },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
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
    const newBlog = await BlogPost.create(body);

    serverCache.del("blogs_list");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedBlog = await BlogPost.findOneAndUpdate(
      { slug: body.slug },
      body,
      { new: true, runValidators: true }
    );

    serverCache.del("blogs_list");
    serverCache.del("storefront_data");

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

    serverCache.del("blogs_list");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, message: `Article ${slug} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
