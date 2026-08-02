"use client";

import React from "react";
import { useParams } from "next/navigation";
import { CategoryOverviewComponent } from "@/components/products/CategoryOverviewComponent";

export default function DynamicCategoryPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "cpap-apap-devices";

  return <CategoryOverviewComponent categorySlug={slug} />;
}
