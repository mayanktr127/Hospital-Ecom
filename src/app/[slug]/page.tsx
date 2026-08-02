"use client";

import React, { use } from "react";
import { CategoryOverviewComponent } from "@/components/products/CategoryOverviewComponent";

export default function TopLevelCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  return <CategoryOverviewComponent categorySlug={slug} />;
}
