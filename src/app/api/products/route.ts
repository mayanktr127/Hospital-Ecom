import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import { serverCache } from "@/lib/cache";

export async function GET() {
  try {
    const cachedProducts = serverCache.get<any>("products_list");
    if (cachedProducts) {
      return NextResponse.json(
        { success: true, products: cachedProducts, fromCache: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    serverCache.set("products_list", products, 180);

    return NextResponse.json(
      { success: true, products, fromCache: false },
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

    if (!body.id) {
      body.id = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // Upsert into MongoDB Atlas so save always succeeds and never fails on duplicate key
    const newProduct = await Product.findOneAndUpdate(
      { id: body.id },
      { $set: body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Invalidate caches
    serverCache.del("products_list");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("MongoDB Product Create/Upsert Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedProduct = await Product.findOneAndUpdate(
      { id: body.id },
      body,
      { new: true, runValidators: true }
    );

    // Invalidate caches
    serverCache.del("products_list");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, product: updatedProduct });
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
      return NextResponse.json({ success: false, error: "Missing product ID" }, { status: 400 });
    }

    await Product.findOneAndDelete({ id });

    // Invalidate caches
    serverCache.del("products_list");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, message: `Product ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
