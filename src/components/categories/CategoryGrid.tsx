"use client";

import React from "react";
import Image from "next/image";
import { CATEGORIES } from "@/data/products";
import { ProductCategory } from "@/types/product";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface CategoryGridProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const categoryFilterMap: Record<string, ProductCategory> = {
    "cat-1": "Ventilation & Sleep",
    "cat-2": "Diagnostic",
    "cat-3": "Surgical",
  };

  return (
    <section id="cats" className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
      {CATEGORIES.map((cat) => {
        const catEnum = categoryFilterMap[cat.id] || "All";
        return (
          <motion.div
            key={cat.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={() => {
              onSelectCategory(catEnum);
              const shopSec = document.getElementById("shop");
              if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
            }}
            style={{ backgroundColor: cat.bg }}
            className="group relative rounded-[28px] p-7 min-h-[300px] flex flex-col overflow-hidden shadow-[0_2px_4px_rgba(24,42,65,0.04),0_12px_28px_-12px_rgba(24,42,65,0.18)] hover:shadow-[0_4px_8px_rgba(24,42,65,0.05),0_28px_60px_-24px_rgba(24,42,65,0.35)] cursor-pointer transition-shadow"
          >
            {/* Header / Arrow Badge */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                  {cat.count}
                </span>
                <h3 className="font-archivo font-bold text-2xl md:text-3xl text-[#0a1f3c] mt-1 max-w-[70%] leading-tight">
                  {cat.name}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-full bg-white grid place-items-center shadow-[0_2px_4px_rgba(24,42,65,0.04),0_12px_28px_-12px_rgba(24,42,65,0.18)] group-hover:rotate-45 transition-transform duration-400">
                <ArrowUpRight className="w-5 h-5 text-[#0a1f3c]" />
              </div>
            </div>

            {/* Bottom aligned cutout image */}
            <div className="mt-auto pt-6 flex justify-center">
              <Image
                src={cat.image}
                alt={cat.name}
                width={200}
                height={200}
                className="w-[82%] object-contain max-h-[160px] drop-shadow-[0_22px_18px_rgba(24,42,65,0.22)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};