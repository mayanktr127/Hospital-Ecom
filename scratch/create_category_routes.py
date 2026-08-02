import os

categories = [
    ("cpap-apap-devices", "CPAP & APAP Devices"),
    ("respiratory-sleep-therapy", "CPAP & APAP Devices"),
    ("bilevel-s-st-devices", "Bilevel-S & ST Devices"),
    ("asv-titration-devices", "ASV & Titration Devices"),
    ("humidifiers", "Humidifiers"),
    ("ventilation", "Ventilation"),
    ("invasive-non-invasive-ventilation-devices", "Ventilation"),
    ("oxygen-therapy", "Oxygen Therapy"),
    ("sleep-diagnostics", "Sleep Diagnostics"),
    ("masks", "Masks")
]

template = '''"use client";

import React, { use } from "react";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";

export default function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  return (
    <ProductDetailPage
      categoryTitle="{cat_name}"
      categorySlug="{cat_slug}"
      itemSlug={slug}
      title={slug.replace(/-/g, " ").toUpperCase()}
    />
  );
}
'''

for cat_slug, cat_name in categories:
    dir_path = f"src/app/{cat_slug}/[slug]"
    os.makedirs(dir_path, exist_ok=True)
    file_path = f"{dir_path}/page.tsx"
    code = template.replace("{cat_name}", cat_name).replace("{cat_slug}", cat_slug)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"Created route handler: {file_path}")

print("All category dynamic route handlers created successfully!")
