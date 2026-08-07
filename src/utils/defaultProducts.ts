import pulmocareProductsData from "@/data/pulmocare_products.json";
import { Product } from "@/types/product";

export const getDefaultProducts = (): Product[] => {
  const productList: Product[] = [];
  if (pulmocareProductsData && typeof pulmocareProductsData === "object") {
    Object.entries(pulmocareProductsData as Record<string, any>).forEach(([catKey, catObj]: [string, any]) => {
      if (catObj && catObj.products && Array.isArray(catObj.products)) {
        catObj.products.forEach((p: any, idx: number) => {
          const catName =
            catKey === "sleep-apnea-therapy" || catKey === "cpap-apap-devices"
              ? "CPAP Therapy"
              : catObj.name || "Medical Equipment";

          const specsList: { label: string; value: string }[] = [];
          if (Array.isArray(p.specifications) && p.specifications.length > 0) {
            p.specifications.forEach((s: any) => {
              if (s && (s.label || s.key)) {
                specsList.push({ label: s.label || s.key, value: String(s.value || "") });
              }
            });
          } else if (p.specs && typeof p.specs === "object") {
            Object.entries(p.specs).forEach(([k, v]) => {
              if (!k.startsWith("{") && !k.startsWith("@")) {
                specsList.push({ label: k, value: String(v) });
              }
            });
          }

          if (specsList.length === 0) {
            specsList.push(
              { label: "Manufacturer", value: "Löwenstein Medical" },
              { label: "Compliance", value: "CE / ISO 13485 Certified" },
              { label: "Warranty", value: "2 Years Official Warranty" }
            );
          }

          productList.push({
            id: p.slug || p.id || `prod-${catKey}-${idx}`,
            name: p.title || p.name || "Medical Device",
            category: catName,
            price: p.price || 45990,
            originalPrice: p.originalPrice || (p.price ? Math.round(p.price * 1.35) : 65000),
            image: p.image || "/images/pulmocare/pulmocare_prisma-smart-plus.png",
            rating: p.rating || 5,
            reviewsCount: p.reviewsCount || 4,
            inStock: true,
            description:
              p.tagline ||
              p.introParagraph ||
              p.description ||
              "High-performance medical hardware engineered for clinical hospital and homecare respiratory therapy.",
            features: Array.isArray(p.features) && p.features.length > 0
              ? p.features
              : [
                  "Ultra-quiet operation for uninterrupted nocturnal sleep",
                  "Standard operating concept with structured menus",
                  "High resolution monitor display",
                  "FOT technology for apnea differentiation",
                ],
            specifications: specsList,
            badge: p.badge || (idx === 0 ? "Most Popular" : "German Engineering"),
            brand: p.brand || "Löwenstein Medical",
            sku: p.sku || (p.slug ? `SKU-${p.slug.toUpperCase()}` : undefined),
            warranty: p.warranty || "2 Years German Manufacturer Warranty",
          });
        });
      }
    });
  }
  return productList;
};
