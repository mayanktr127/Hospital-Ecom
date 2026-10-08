import { Product } from "@/types/product";

export type MaskOptionType = "nasal" | "full-face" | "none";

export interface MaskAddonConfig {
  id: MaskOptionType;
  name: string;
  shortName: string;
  addonPrice: number;
  description: string;
  badge?: string;
  image?: string;
}

export const MASK_OPTIONS: MaskAddonConfig[] = [
  {
    id: "nasal",
    name: "Löwenstein JOYCEone Nasal Mask",
    shortName: "Nasal Mask",
    addonPrice: 3000,
    description: "Intelligent auto-adjusting fit cushion for effortless comfort and quiet nocturnal therapy",
    badge: "Recommended Default",
    image: "/images/site/masks_csm_joyceone_mask_patient_interface_nasal_right_c8ef6f8727.png",
  },
  {
    id: "full-face",
    name: "Löwenstein JOYCEone Full Face Mask",
    shortName: "Full Face Mask",
    addonPrice: 4500,
    description: "Universal auto-fitting oronasal seal, optimal for mouth breathers or higher BiLevel pressures",
    badge: "High Performance",
    image: "/images/site/masks_csm_joyceone_mask_patient_interface_fullface_vented_right_4560a66624.png",
  },
  {
    id: "none",
    name: "Device Only (Without Mask)",
    shortName: "No Mask",
    addonPrice: 0,
    description: "Exclude mask if you already own a compatible Löwenstein or CPAP mask",
  },
];

export function getMaskOptionDetails(option?: MaskOptionType): MaskAddonConfig {
  return (
    MASK_OPTIONS.find((m) => m.id === option) ||
    MASK_OPTIONS[0]
  );
}

export const NASAL_MASK_PRODUCT: Product = {
  id: "addon-joyceone-nasal-mask",
  name: "Löwenstein JOYCEone Nasal Mask",
  category: "Masks",
  price: 3000,
  originalPrice: 6000,
  image: "/images/site/masks_csm_joyceone_mask_patient_interface_nasal_right_c8ef6f8727.png",
  rating: 4.9,
  reviewsCount: 24,
  inStock: true,
  description: "Official Löwenstein JOYCEone Nasal Mask. German-engineered auto-adjusting fit with ultra-quiet radial exhalation system.",
  badge: "Mask Add-on",
  brand: "Löwenstein Medical",
  specifications: [
    { label: "Type", value: "Nasal Mask" },
    { label: "Fit", value: "One size fits all (auto-adjusting)" },
    { label: "Brand", value: "Löwenstein Medical" },
    { label: "Origin", value: "Germany" },
    { label: "Warranty", value: "Official Clinical Warranty" },
  ],
};

export const FULL_FACE_MASK_PRODUCT: Product = {
  id: "addon-joyceone-full-face-mask",
  name: "Löwenstein JOYCEone Full Face Mask",
  category: "Masks",
  price: 4500,
  originalPrice: 7500,
  image: "/images/site/masks_csm_joyceone_mask_patient_interface_fullface_vented_right_4560a66624.png",
  rating: 4.9,
  reviewsCount: 28,
  inStock: true,
  description: "Official Löwenstein JOYCEone Full Face Mask. Automatic fit cushion with forehead support for high pressures and mouth breathers.",
  badge: "Mask Add-on",
  brand: "Löwenstein Medical",
  specifications: [
    { label: "Type", value: "Full Face Mask" },
    { label: "Fit", value: "One size fits all (auto-adjusting)" },
    { label: "Brand", value: "Löwenstein Medical" },
    { label: "Origin", value: "Germany" },
    { label: "Warranty", value: "Official Clinical Warranty" },
  ],
};

export function getMaskProduct(option?: MaskOptionType): Product | null {
  if (option === "nasal") return NASAL_MASK_PRODUCT;
  if (option === "full-face") return FULL_FACE_MASK_PRODUCT;
  return null;
}

export function isMaskAddonProduct(productOrId?: Product | string): boolean {
  if (!productOrId) return false;
  const id = typeof productOrId === "string" ? productOrId : productOrId.id;
  return (
    id === "addon-joyceone-nasal-mask" ||
    id === "addon-joyceone-full-face-mask" ||
    id === "addon-cara-nasal-mask" ||
    id === "addon-cara-full-face-mask"
  );
}

export const NASAL_MASK_ADDON = 3000;
export const FULL_FACE_MASK_ADDON = 4500;

export interface MaskEligibleProductInfo {
  isEligible: boolean;
  modelName: string;
  basePrice: number;
}

/**
 * Checks if a product matches any of the 6 CPAP/BiLevel devices from the pricing sheet:
 * 1. Prisma Smart (₹53,000 base)
 * 2. Prisma Smart Plus (₹62,000 base)
 * 3. Prisma 20A (₹70,000 base)
 * 4. Prisma 25S (₹70,000 base)
 * 5. Prisma 25ST (₹76,000 base)
 * 6. Prisma 30ST (₹89,250 base)
 */
export function getMaskAddonInfo(product?: {
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
  price?: number;
}): MaskEligibleProductInfo {
  if (!product) {
    return { isEligible: false, modelName: "", basePrice: 0 };
  }

  const str = `${product.slug || ""} ${product.id || ""} ${product.name || ""} ${product.title || ""}`.toLowerCase();

  // 1. Prisma Smart Plus
  if (str.includes("smart-plus") || str.includes("smart plus") || str.includes("smart+")) {
    return { isEligible: true, modelName: "Prisma Smart Plus", basePrice: 62000 };
  }

  // 2. Prisma Smart (exclude smart plus)
  if (str.includes("smart") && !str.includes("smart-plus") && !str.includes("smart plus") && !str.includes("smart+")) {
    return { isEligible: true, modelName: "Prisma Smart", basePrice: 53000 };
  }

  // 3. Prisma 20A
  if (str.includes("20a") || str.includes("20-a") || str.includes("20 a")) {
    return { isEligible: true, modelName: "Prisma 20A", basePrice: 70000 };
  }

  // 4. Prisma 25ST
  if (str.includes("25st") || str.includes("25-st") || str.includes("25 st")) {
    return { isEligible: true, modelName: "Prisma 25ST", basePrice: 76000 };
  }

  // 5. Prisma 25S (exclude 25ST)
  if (
    (str.includes("25s") || str.includes("25-s") || str.includes("25 s")) &&
    !str.includes("25st") &&
    !str.includes("25-st") &&
    !str.includes("25 st")
  ) {
    return { isEligible: true, modelName: "Prisma 25S", basePrice: 70000 };
  }

  // 6. Prisma 30ST
  if (str.includes("30st") || str.includes("30-st") || str.includes("30 st")) {
    return { isEligible: true, modelName: "Prisma 30ST", basePrice: 89250 };
  }

  return { isEligible: false, modelName: "", basePrice: 0 };
}

export function isMaskEligible(product?: {
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
}): boolean {
  return getMaskAddonInfo(product).isEligible;
}

export function getMaskAddonPrice(option?: MaskOptionType): number {
  if (option === "nasal") return NASAL_MASK_ADDON;
  if (option === "full-face") return FULL_FACE_MASK_ADDON;
  return 0;
}

export function calculateEffectiveUnitPrice(
  product: Product,
  maskOption: MaskOptionType = "nasal"
): number {
  const info = getMaskAddonInfo(product);
  const base =
    typeof product.price === "number" && product.price > 0
      ? product.price
      : info.isEligible
      ? info.basePrice
      : 0;
  if (!info.isEligible) return base;
  return base + getMaskAddonPrice(maskOption);
}
