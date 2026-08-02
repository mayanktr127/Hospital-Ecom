"use client";

import React from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import scrapedProducts from "@/data/product_pages/scraped_products.json";

export default function NeonatologyOverviewPage() {
  const data = (scrapedProducts as any)["neonatology"] || {
    title: "Neonatology & Infant Care",
    text: "LEONI 4, Leoni plus, WILAflow Elite, NeoJet, and Lifetherm warming systems.",
  };

  return (
    <ProductDetailPage
      categoryTitle="Neonatology"
      categorySlug="neonatology"
      itemSlug="overview"
      title={data.title}
      rawText={data.text}
    />
  );
}
