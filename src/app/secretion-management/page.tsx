"use client";

import React from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function SecretionOverviewPage() {
  const data = (scrapedProducts as any)["secretion_management"] || {
    title: "Secretion Management",
    text: "CARO secretion clearance and airway management devices.",
  };

  return (
    <ProductDetailPage
      categoryTitle="Secretion Management"
      categorySlug="secretion-management"
      itemSlug="overview"
      title={data.title}
      rawText={data.text}
    />
  );
}
