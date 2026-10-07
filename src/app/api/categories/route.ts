import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Category from "@/models/Category";
import { serverCache } from "@/lib/cache";

export async function GET() {
  try {
    const cachedCategories = serverCache.get<any>("categories_list");
    if (cachedCategories) {
      return NextResponse.json(
        { success: true, categories: cachedCategories, fromCache: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    await dbConnect();
    const categories = await Category.find({}).sort({ createdAt: 1 }).lean();
    serverCache.set("categories_list", categories, 180);

    return NextResponse.json(
      { success: true, categories, fromCache: false },
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
    const id = body.id || `cat-${Date.now()}`;
    const slug = body.slug || (body.name ? body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `cat-${Date.now()}`);

    // Atomic upsert: matches either by unique id or unique slug
    const category = await Category.findOneAndUpdate(
      { $or: [{ id }, { slug }] },
      { $set: { ...body, id, slug } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Invalidate caches
    serverCache.del("categories_list");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedCategory = await Category.findOneAndUpdate(
      { id: body.id },
      body,
      { new: true, runValidators: true }
    );

    // Invalidate caches
    serverCache.del("categories_list");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, category: updatedCategory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing category id" }, { status: 400 });
    }

    await Category.findOneAndDelete({ id });

    // Invalidate caches
    serverCache.del("categories_list");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, message: `Category ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
