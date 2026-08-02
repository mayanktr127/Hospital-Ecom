"use client";

import React, { use } from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function IntensiveCareDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const key = `intensive_${slug.replace(/-/g, "_")}`;

  const data = (scrapedProducts as any)[key] || {
    title: slug.replace(/-/g, " ").toUpperCase(),
    text: `elisa ${slug} ICU ventilator clinical specifications.`,
  };

  return (
    <ProductDetailPage
      categoryTitle="Intensive Care Ventilation"
      categorySlug="intensive-care-ventilation"
      itemSlug={slug}
      title={data.title}
      rawText={data.text}
    />
  );
}
