"use client";

import React from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function AnesthesiaOverviewPage() {
  const data = (scrapedProducts as any)["anesthesia"] || {
    title: "Anesthesia Workstations",
    text: "Leon plus, Leon mri, Leon compact anesthesia workstations, and Leonsorb soda lime absorbers.",
  };

  return (
    <ProductDetailPage
      categoryTitle="Anesthesia"
      categorySlug="anesthesia"
      itemSlug="overview"
      title={data.title}
      rawText={data.text}
    />
  );
}
