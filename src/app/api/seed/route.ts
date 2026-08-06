import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import BlogPost from "@/models/BlogPost";
import Review from "@/models/Review";
import Category from "@/models/Category";
import { BLOG_POSTS } from "@/data/blog_posts";
import pulmocareProductsData from "@/data/pulmocare_products.json";

const SEED_CATEGORIES = [
  {
    id: "cat-1",
    name: "Sleep Apnea Therapy",
    slug: "sleep-apnea-therapy",
    image: "/images/pulmocare/pulmocare_prisma-20a.png",
    count: "3 Models",
    badge: "Most Popular",
    desc: "Premium auto-CPAP titration for obstructive sleep apnea.",
  },
  {
    id: "cat-2",
    name: "Bilevel-S & ST Devices",
    slug: "bilevel-s-st-devices",
    image: "/images/pulmocare/pulmocare_prisma-25-st.png",
    count: "3 Models",
    badge: "Clinical Grade",
    desc: "High pressure support BiLevel S and ST therapy.",
  },
  {
    id: "cat-3",
    name: "ASV & Titration Devices",
    slug: "asv-titration-devices",
    image: "/images/pulmocare/pulmocare_prisma-lab.png",
    count: "2 Models",
    badge: "Advanced Tech",
    desc: "Adaptive servo-ventilation and lab titration.",
  },
  {
    id: "cat-4",
    name: "Humidifiers",
    slug: "humidifiers",
    image: "/images/pulmocare/pulmocare_prisma-aqua.png",
    count: "1 Model",
    desc: "Heated humidification for patient comfort.",
  },
  {
    id: "cat-5",
    name: "Ventilation",
    slug: "ventilation",
    image: "/images/pulmocare/pulmocare_luisa-ventilator.png",
    count: "3 Models",
    badge: "Life Support",
    desc: "Hospital & home care life support ventilators.",
  },
  {
    id: "cat-6",
    name: "Oxygen Therapy",
    slug: "oxygen-therapy",
    image: "/images/pulmocare/pulmocare_inogen-rove-6.png",
    count: "2 Models",
    badge: "High Purity",
    desc: "Portable & stationary 5L LPM oxygen concentrators.",
  },
  {
    id: "cat-7",
    name: "Sleep Diagnostics",
    slug: "sleep-diagnostics",
    image: "/images/site/sleep_diagnostics_csm_samoa_sleep_diagnostics_device_frontal_dba1194f3b.png",
    count: "3 Models",
    desc: "10-33 channel polygraphy and polysomnography.",
  },
  {
    id: "cat-8",
    name: "Masks",
    slug: "masks",
    image: "/images/pulmocare/pulmo_l-wenstein-lena.png",
    count: "4 Models",
    badge: "Ergonomic Seal",
    desc: "Nasal and full face ventilation patient masks.",
  },
];

const SEED_REVIEWS = [
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

export async function GET() {
  try {
    await dbConnect();

    const results: Record<string, any> = {};

    // === Seed Products (only if empty) ===
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
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
                badge: p.badge || "",
                brand: "Löwenstein Medical",
                sku: p.slug ? `SKU-${p.slug.toUpperCase()}` : undefined,
                warranty: "2 Years German Manufacturer Warranty",
              });
            });
          }
        });
      }
      const seeded = await Product.insertMany(productList);
      results.productsSeeded = seeded.length;
    } else {
      results.productsSkipped = `${productCount} products already exist`;
    }

    // === Seed Categories (only if empty) ===
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const seeded = await Category.insertMany(SEED_CATEGORIES);
      results.categoriesSeeded = seeded.length;
    } else {
      results.categoriesSkipped = `${categoryCount} categories already exist`;
    }

    // === Seed Blog Posts (only if empty) ===
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      const seeded = await BlogPost.insertMany(BLOG_POSTS);
      results.blogsSeeded = seeded.length;
    } else {
      results.blogsSkipped = `${blogCount} blog posts already exist`;
    }

    // === Seed Reviews (only if empty) ===
    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      const seeded = await Review.insertMany(SEED_REVIEWS);
      results.reviewsSeeded = seeded.length;
    } else {
      results.reviewsSkipped = `${reviewCount} reviews already exist`;
    }

    return NextResponse.json({
      success: true,
      message: "Seed complete — existing collections were not overwritten.",
      ...results,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
