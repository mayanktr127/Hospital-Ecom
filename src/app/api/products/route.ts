import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
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
    return NextResponse.json({ success: true, message: `Product ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
