"use client";

import React from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function SleepApneaOverviewPage() {
  const data = (scrapedProducts as any)["sleep_apnea"] || {
    title: "CPAP Therapy",
    text: "prisma CPAP, APAP, and BiLevel therapy devices engineered for sleep apnea treatment.",
  };

  return (
    <ProductDetailPage
      categoryTitle="CPAP Therapy"
      categorySlug="sleep-apnea-therapy"
      itemSlug="overview"
      title={data.title}
      rawText={data.text}
    />
  );
}
