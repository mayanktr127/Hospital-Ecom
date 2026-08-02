import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import BlogPost from "@/models/BlogPost";
import Review from "@/models/Review";
import { BLOG_POSTS } from "@/data/blog_posts";
import pulmocareProductsData from "@/data/pulmocare_products.json";

export async function GET() {
  try {
    await dbConnect();

    // 1. Convert pulmocare_products.json into Product models
    const productList: any[] = [];
    if (pulmocareProductsData && typeof pulmocareProductsData === "object") {
      Object.values(pulmocareProductsData as Record<string, any>).forEach((catObj: any) => {
        if (catObj && catObj.products && Array.isArray(catObj.products)) {
          catObj.products.forEach((p: any, idx: number) => {
            productList.push({
              id: p.slug || `prod-${idx}-${Date.now()}`,
              name: p.title || "Medical Device",
              category: catObj.name || "Ventilation & Sleep",
              price: p.price || 45990,
              originalPrice: p.originalPrice || (p.price ? Math.round(p.price * 1.35) : 65000),
              image: p.image || "/images/pulmocare/pulmocare_prisma-smart.png",
              rating: 5,
              reviewsCount: 4,
              inStock: true,
              description: p.tagline || p.introParagraph || "High-performance medical equipment.",
              features: p.features || [],
              specifications: p.specifications || [],
            });
          });
        }
      });
    }

    // Seed Products into MongoDB Atlas
    await Product.deleteMany({});
    const seededProducts = await Product.insertMany(productList);

    // Seed Blog Posts into MongoDB Atlas
    await BlogPost.deleteMany({});
    const seededBlogs = await BlogPost.insertMany(BLOG_POSTS);

    // Seed Reviews matching Screenshot 4
    const initialReviews = [
      {
        id: "rev-101",
        productId: "prisma-25s",
        productName: "Prisma 25S",
        author: "Dr. Rajesh K.",
        rating: 5,
        comment: "Exceptional build quality and quiet operation. Highly recommended for OSA patient therapy.",
        date: "July 24, 2026",
        status: "Approved",
      },
      {
        id: "rev-102",
        productId: "prisma-25s",
        productName: "Prisma 25S",
        author: "Priya Sharma",
        rating: 5,
        comment: "Very easy to set up and smooth pressure adjustments. Fast delivery by Pulmo Care.",
        date: "June 18, 2026",
        status: "Approved",
      },
      {
        id: "rev-103",
        productId: "prisma-smart",
        productName: "Prisma SMART",
        author: "Anil Deshmukh",
        rating: 5,
        comment: "Ultra quiet auto-titrating CPAP. Improved sleep quality significantly.",
        date: "August 1, 2026",
        status: "Approved",
      },
    ];

    await Review.deleteMany({});
    const seededReviews = await Review.insertMany(initialReviews);

    return NextResponse.json({
      success: true,
      message: "MongoDB Atlas cluster successfully seeded!",
      productsSeeded: seededProducts.length,
      blogsSeeded: seededBlogs.length,
      reviewsSeeded: seededReviews.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
