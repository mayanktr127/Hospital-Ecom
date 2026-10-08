import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { serverCache } from "@/lib/cache";

const DEFAULT_SETTINGS = {
  nasalMaskAddonPrice: 3000,
  fullFaceMaskAddonPrice: 4500,
  humidifierBundlePrice: 10000,
  humidifierStandalonePrice: 12600,
  sleepStudyCharge: 5000,
};

export async function GET() {
  try {
    const cached = serverCache.get<any>("site_pricing_settings");
    if (cached) {
      return NextResponse.json({ success: true, settings: cached, fromCache: true });
    }

    await dbConnect();
    let doc = await SiteSettings.findOne({ key: "pricing_settings" }).lean();
    if (!doc) {
      doc = await SiteSettings.create({
        key: "pricing_settings",
        ...DEFAULT_SETTINGS,
      });
    }

    serverCache.set("site_pricing_settings", doc, 180);

    return NextResponse.json({ success: true, settings: doc, fromCache: false });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      settings: DEFAULT_SETTINGS,
      fallback: true,
      error: error.message,
    });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const updated = await SiteSettings.findOneAndUpdate(
      { key: "pricing_settings" },
      {
        $set: {
          nasalMaskAddonPrice: Number(body.nasalMaskAddonPrice) || 3000,
          fullFaceMaskAddonPrice: Number(body.fullFaceMaskAddonPrice) || 4500,
          humidifierBundlePrice: Number(body.humidifierBundlePrice) || 10000,
          humidifierStandalonePrice: Number(body.humidifierStandalonePrice) || 12600,
          sleepStudyCharge: Number(body.sleepStudyCharge) || 5000,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    serverCache.del("site_pricing_settings");
    serverCache.del("storefront_data");

    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  return POST(req);
}
