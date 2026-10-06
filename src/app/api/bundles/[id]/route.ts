import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Bundle from "@/models/Bundle";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const rawId = resolvedParams?.id || "";
    const cleanId = decodeURIComponent(rawId).trim();

    if (!cleanId) {
      return NextResponse.json({ success: false, error: "Bundle ID is required" }, { status: 400 });
    }

    const conditions: any[] = [
      { bundleId: cleanId },
      { bundleId: cleanId.toUpperCase() },
      { bundleId: cleanId.toLowerCase() },
      { bundleId: { $regex: new RegExp(`^${cleanId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") } },
    ];

    if (/^[0-9a-fA-F]{24}$/.test(cleanId)) {
      conditions.push({ _id: cleanId });
    }

    const bundle = await Bundle.findOne({ $or: conditions });

    if (!bundle) {
      return NextResponse.json({ success: false, error: "Bundle not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, bundle });
  } catch (error: any) {
    console.error("Error retrieving bundle by ID:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
