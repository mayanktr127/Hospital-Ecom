"use client";

import React, { use } from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function AnesthesiaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const key = `anesthesia_${slug.replace(/-/g, "_")}`;

  const data = (scrapedProducts as any)[key] || {
    title: slug.replace(/-/g, " ").toUpperCase(),
    text: `Leon ${slug} anesthesia machine technical specifications.`,
  };

  return (
    <ProductDetailPage
      categoryTitle="Anesthesia"
      categorySlug="anesthesia"
      itemSlug={slug}
      title={data.title}
      rawText={data.text}
    />
  );
}
