import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newReview = await Review.create(body);
    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedReview = await Review.findOneAndUpdate(
      { id: body.id },
      body,
      { new: true, runValidators: true }
    );
    return NextResponse.json({ success: true, review: updatedReview });
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
      return NextResponse.json({ success: false, error: "Missing review ID" }, { status: 400 });
    }

    await Review.findOneAndDelete({ id });
    return NextResponse.json({ success: true, message: `Review ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
