import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Review from "@/models/Review";
import { serverCache } from "@/lib/cache";

export async function GET() {
  try {
    const cachedReviews = serverCache.get<any>("reviews_list");
    if (cachedReviews) {
      return NextResponse.json(
        { success: true, reviews: cachedReviews, fromCache: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    await dbConnect();
    const reviews = await Review.find({}).sort({ createdAt: -1 }).lean();
    serverCache.set("reviews_list", reviews, 180);

    return NextResponse.json(
      { success: true, reviews, fromCache: false },
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
    const newReview = await Review.create(body);

    serverCache.del("reviews_list");
    serverCache.del("storefront_data");

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

    serverCache.del("reviews_list");
    serverCache.del("storefront_data");

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

    serverCache.del("reviews_list");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, message: `Review ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
