"use client";

import React, { use } from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";

export default function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  return (
    <ProductDetailPage
      categoryTitle="Humidifiers"
      categorySlug="humidifiers"
      itemSlug={slug}
      title={slug.replace(/-/g, " ").toUpperCase()}
    />
  );
}
