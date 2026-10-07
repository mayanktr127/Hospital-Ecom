import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Bundle from "@/models/Bundle";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await dbConnect();
    const bundles = await Bundle.find({}).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, bundles },
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

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `BDL-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    const items = (body.items || []).map((item: any) => ({
      productId: item.productId,
      name: item.name,
      category: item.category || "Medical Equipment",
      image: item.image || "/images/pulmocare/pulmocare_prisma-smart.png",
      catalogPrice: typeof item.catalogPrice === "number" ? item.catalogPrice : null,
      customPrice: Number(item.customPrice) || 0,
      quantity: Number(item.quantity) || 1,
      subtotal: (Number(item.customPrice) || 0) * (Number(item.quantity) || 1),
    }));

    const calculatedTotal = items.reduce((acc: number, item: any) => acc + item.subtotal, 0);
    const finalTotal = typeof body.totalAmount === "number" && body.totalAmount >= 0 ? body.totalAmount : calculatedTotal;

    const newBundle = await Bundle.create({
      bundleId: body.bundleId || generatedId,
      title: body.title || "Custom Clinical Equipment Bundle",
      description: body.description || "",
      clientName: body.clientName || "",
      clientEmail: body.clientEmail || "",
      clientPhone: body.clientPhone || "",
      items,
      totalAmount: finalTotal,
      discountAmount: Number(body.discountAmount) || 0,
      status: "active",
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
    });

    return NextResponse.json({ success: true, bundle: newBundle }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { bundleId, ...updates } = body;

    if (!bundleId) {
      return NextResponse.json({ success: false, error: "Missing bundleId" }, { status: 400 });
    }

    const updated = await Bundle.findOneAndUpdate({ bundleId }, updates, { new: true });
    return NextResponse.json({ success: true, bundle: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const bundleId = searchParams.get("bundleId") || searchParams.get("id");

    if (!bundleId) {
      return NextResponse.json({ success: false, error: "Missing bundleId" }, { status: 400 });
    }

    await Bundle.findOneAndDelete({ $or: [{ bundleId }, { _id: bundleId }] });
    return NextResponse.json({ success: true, message: `Bundle ${bundleId} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
