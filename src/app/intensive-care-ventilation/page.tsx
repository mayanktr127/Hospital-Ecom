"use client";

import React from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function IntensiveCareOverviewPage() {
  const data = (scrapedProducts as any)["intensive_care"] || {
    title: "Intensive Care Ventilation",
    text: "elisa ICU ventilator series (elisa 300, 500, 600, 800) and PesoCath diagnostic catheters.",
  };

  return (
    <ProductDetailPage
      categoryTitle="Intensive Care Ventilation"
      categorySlug="intensive-care-ventilation"
      itemSlug="overview"
      title={data.title}
      rawText={data.text}
    />
  );
}
