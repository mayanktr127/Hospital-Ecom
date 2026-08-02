import os
import json

with open("src/data/pulmocare_products.json", "r", encoding="utf-8") as f:
    cat_data = json.load(f)

category_pages_config = [
    ("cpap-apap-devices", "CPAP & APAP Devices", "respiratory-sleep-therapy"),
    ("respiratory-sleep-therapy", "CPAP & APAP Devices", "respiratory-sleep-therapy"),
    ("bilevel-s-st-devices", "Bilevel-S & ST Devices", "bilevel-s-st-devices"),
    ("asv-titration-devices", "ASV & Titration Devices", "asv-titration-devices"),
    ("humidifiers", "Humidifiers", "humidifiers"),
    ("ventilation", "Ventilation", "ventilation"),
    ("invasive-non-invasive-ventilation-devices", "Ventilation", "ventilation"),
    ("oxygen-therapy", "Oxygen Therapy", "oxygen-therapy"),
    ("sleep-diagnostics", "Sleep Diagnostics", "sleep-diagnostics"),
    ("masks", "Masks", "masks")
]

page_template = '''"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";

export default function CategoryOverviewPage() {
  const products: any[] = {products_json};

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-[#003865] font-inter">
      <Navbar />

      <main className="w-full mx-auto px-4 md:px-12 py-10 max-w-[1280px] flex-1">
        {/* Category Header */}
        <div className="mb-12 max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#007AC1] block mb-2 font-inter">
            Pulmo Care Catalog
          </span>
          <h1 className="font-archivo font-extrabold text-4xl md:text-5xl text-[#003865] mb-3 tracking-tight">
            {category_title}
          </h1>
          <div className="w-12 h-1 bg-[#007AC1] mb-6 rounded-full" />
          <p className="text-sm md:text-base text-[#4A607A] leading-relaxed font-inter">
            High-performance medical hardware engineered for clinical hospital and homecare respiratory therapy. Certified to international CE and ISO 13485 quality standards.
          </p>
        </div>

        {/* Product Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item: any) => (
              <Link
                key={item.slug}
                href={`/{cat_slug}/${item.slug}`}
                className="group bg-white border border-[#003865]/10 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#007AC1]/40 transition-all duration-300 flex flex-col items-center justify-between text-center"
              >
                <div className="w-full h-48 mb-6 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-108 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/products/mask.png";
                    }}
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#007AC1] tracking-wider block mb-1">
                    German Engineering
                  </span>
                  <h3 className="font-archivo font-bold text-xl text-[#003865] group-hover:text-[#007AC1] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A607A] leading-relaxed line-clamp-2 mb-4 font-inter">
                    {item.introParagraph}
                  </p>
                </div>
                <div className="w-full pt-3 border-t border-[#003865]/08 text-xs font-bold text-[#007AC1] group-hover:underline">
                  View Details &rarr;
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
'''

for route_slug, cat_title, data_key in category_pages_config:
    dir_path = f"src/app/{route_slug}"
    os.makedirs(dir_path, exist_ok=True)
    file_path = f"{dir_path}/page.tsx"
    
    prods = cat_data.get(data_key, {}).get("products", [])
    prods_json_str = json.dumps(prods, indent=2)

    code = page_template.replace("{category_title}", cat_title).replace("{cat_slug}", route_slug).replace("{products_json}", prods_json_str)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"Updated category overview page with typed products: {file_path}")

print("All category overview pages re-generated with TypeScript annotations successfully!")
