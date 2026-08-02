import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import BlogPost from "@/models/BlogPost";
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
              price: 45990,
              originalPrice: 65000,
              image: p.image || "/images/pulmocare/pulmocare_prisma-smart.png",
              rating: 5,
              reviewsCount: 4,
              inStock: true,
              description: p.tagline || p.introParagraph || "High-performance medical equipment.",
              specifications: [],
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

    return NextResponse.json({
      success: true,
      message: "MongoDB Atlas cluster successfully seeded!",
      productsSeeded: seededProducts.length,
      blogsSeeded: seededBlogs.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
