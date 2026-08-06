"use client";

import React, { use } from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function SleepApneaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  let key = `sleep_${slug.replace(/-/g, "_")}`;
  if (!(scrapedProducts as any)[key]) {
    key = `sleep_prisma_${slug.replace(/-/g, "_")}`;
  }

  const data = (scrapedProducts as any)[key] || {
    title: slug.replace(/-/g, " ").toUpperCase(),
    text: `prisma ${slug} sleep therapy device clinical specifications.`,
  };

  return (
    <ProductDetailPage
      categoryTitle="CPAP Therapy"
      categorySlug="sleep-apnea-therapy"
      itemSlug={slug}
      title={data.title}
      rawText={data.text}
    />
  );
}
