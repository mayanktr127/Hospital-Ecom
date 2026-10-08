import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import BlogPost from "@/models/BlogPost";
import Review from "@/models/Review";
import SiteSettings from "@/models/SiteSettings";
import { serverCache } from "@/lib/cache";

export async function GET() {
  try {
    const cachedData = serverCache.get<any>("storefront_data");
    if (cachedData) {
      return NextResponse.json(
        { success: true, ...cachedData, fromCache: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    await dbConnect();

    // Query collections in parallel with .lean() for minimal overhead
    const [products, categories, blogs, reviews, settingsDoc] = await Promise.all([
      Product.find({}).sort({ createdAt: -1 }).lean(),
      Category.find({
        name: { $nin: ["te", "test", "testess"] },
        slug: { $nin: ["te", "test", "testess"] },
        badge: { $ne: "TEST" },
      })
        .sort({ createdAt: 1 })
        .lean(),
      BlogPost.find({}).sort({ createdAt: -1 }).lean(),
      Review.find({ status: "Approved" }).sort({ createdAt: -1 }).lean(),
      SiteSettings.findOne({ key: "pricing_settings" }).lean(),
    ]);

    const settings = settingsDoc || {
      nasalMaskAddonPrice: 3000,
      fullFaceMaskAddonPrice: 4500,
      humidifierBundlePrice: 10000,
      humidifierStandalonePrice: 12600,
      sleepStudyCharge: 5000,
    };

    const payload = { products, categories, blogs, reviews, settings };
    serverCache.set("storefront_data", payload, 180);

    return NextResponse.json(
      { success: true, ...payload, fromCache: false },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error: any) {
    console.error("Storefront Data Fetch Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
