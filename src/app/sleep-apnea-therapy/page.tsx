"use client";

import React from "react";
import { CategoryOverviewComponent } from "@/components/products/CategoryOverviewComponent";

export default function SleepApneaCategoryPage() {
  return (
    <CategoryOverviewComponent
      categorySlug="sleep-apnea-therapy"
      defaultTitle="CPAP Therapy"
      defaultDesc="Premium auto-CPAP titration for obstructive sleep apnea."
    />
  );
}

