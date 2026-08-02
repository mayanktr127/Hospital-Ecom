"use client";

import React, { use } from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function SecretionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const key = `secretion_${slug.replace(/-/g, "_")}`;

  const data = (scrapedProducts as any)[key] || {
    title: slug.replace(/-/g, " ").toUpperCase(),
    text: `CARO ${slug} secretion clearance system technical specifications.`,
  };

  return (
    <ProductDetailPage
      categoryTitle="Secretion Management"
      categorySlug="secretion-management"
      itemSlug={slug}
      title={data.title}
      rawText={data.text}
    />
  );
}
