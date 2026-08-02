"use client";

import React, { use } from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function NeonatologyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const key = `neonatology_${slug.replace(/-/g, "_")}`;

  const data = (scrapedProducts as any)[key] || {
    title: slug.replace(/-/g, " ").toUpperCase(),
    text: `LEONI ${slug} infant ventilator and warming system clinical details.`,
  };

  return (
    <ProductDetailPage
      categoryTitle="Neonatology"
      categorySlug="neonatology"
      itemSlug={slug}
      title={data.title}
      rawText={data.text}
    />
  );
}
