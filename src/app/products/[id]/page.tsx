"use client";

import React, { use } from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";

export default function GenericProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <ProductDetailPage
      categoryTitle="Products"
      categorySlug="products"
      itemSlug={id}
      title={id.replace(/-/g, " ").toUpperCase()}
    />
  );
}
