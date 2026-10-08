"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getDefaultProducts } from "@/utils/defaultProducts";
import { getDefaultCategories } from "@/utils/defaultCategories";

export interface ReviewItem {
  id: string;
  productId: string;
  productName: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  status: string;
}

export interface InquiryItem {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  inquiryType: string;
  device: string;
  city: string;
  message: string;
  status: string;
  createdAt?: string;
}

export interface OrderProductItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderItem {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  items: OrderProductItem[];
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  paymentStatus?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  prescriptionNote?: string;
  createdAt?: string;
}

export interface SleepStudyBookingItem {
  _id?: string;
  bookingId: string;
  patientName: string;
  phone: string;
  email: string;
  height: string;
  weight: string;
  bedTime: string;
  upTime: string;
  level: string;
  studyDate: string;
  address: string;
  city: string;
  charges: number;
  notes?: string;
  status: string;
  createdAt?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  desc: string;
  image: string;
  count?: string;
  badge?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
  content?: string;
  date?: string;
  tags?: string[];
}

export interface BundleProductItem {
  productId: string;
  name: string;
  category: string;
  image: string;
  catalogPrice?: number | null;
  customPrice: number;
  quantity: number;
  subtotal: number;
}

export interface BundleItem {
  _id?: string;
  bundleId: string;
  title: string;
  description?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  items: BundleProductItem[];
  totalAmount: number;
  discountAmount?: number;
  status: "active" | "paid" | "expired" | "cancelled";
  expiresAt?: string;
  paymentDetails?: {
    paymentMethod: string;
    transactionId: string;
    paidAt: string;
    paidAmount: number;
    payerName: string;
    payerPhone: string;
    payerEmail: string;
    shippingAddress: string;
    city: string;
    state: string;
    pincode: string;
    orderId?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

interface AdminContextType {
  isAdminAuthenticated: boolean;
  isAuthChecked: boolean;
  adminUser: AdminUser | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  isLoading: boolean;
  // Products CRUD State
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  // Categories CRUD State
  categories: CategoryItem[];
  addCategory: (category: CategoryItem) => Promise<void>;
  updateCategory: (category: CategoryItem) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  // Blog Posts CRUD State
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => Promise<void>;
  updateBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (slug: string) => Promise<void>;
  // Customer Reviews CRUD State
  reviews: ReviewItem[];
  addReview: (review: ReviewItem) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  approveReview: (id: string) => Promise<void>;
  // Inquiries CRUD State
  inquiries: InquiryItem[];
  addInquiry: (inquiry: InquiryItem) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  updateInquiryStatus: (id: string, status: string, name?: string) => Promise<void>;
  // Orders CRUD State
  orders: OrderItem[];
  addOrder: (order: OrderItem) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
  // Sleep Study Bookings CRUD State
  sleepStudyBookings: SleepStudyBookingItem[];
  addSleepStudyBooking: (booking: SleepStudyBookingItem) => Promise<void>;
  deleteSleepStudyBooking: (bookingId: string) => Promise<void>;
  updateSleepStudyBookingStatus: (bookingId: string, status: string) => Promise<void>;
  refreshAdminData: () => Promise<void>;
  // Bundles CRUD State
  bundles: BundleItem[];
  addBundle: (bundle: Partial<BundleItem>) => Promise<BundleItem | null>;
  updateBundle: (bundle: Partial<BundleItem>) => Promise<void>;
  deleteBundle: (bundleId: string) => Promise<void>;
  refreshBundles: () => Promise<void>;
  // Dynamic Pricing Settings
  pricingSettings: SitePricingSettings;
  updatePricingSettings: (newSettings: Partial<SitePricingSettings>) => Promise<void>;
}

export interface SitePricingSettings {
  nasalMaskAddonPrice: number;
  fullFaceMaskAddonPrice: number;
  humidifierBundlePrice: number;
  humidifierStandalonePrice: number;
  sleepStudyCharge: number;
}

export const DEFAULT_PRICING_SETTINGS: SitePricingSettings = {
  nasalMaskAddonPrice: 3000,
  fullFaceMaskAddonPrice: 4500,
  humidifierBundlePrice: 10000,
  humidifierStandalonePrice: 12600,
  sleepStudyCharge: 5000,
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Products and categories start pre-populated with default items for 0ms initial load
  const [products, setProducts] = useState<Product[]>(getDefaultProducts());
  const [categories, setCategories] = useState<CategoryItem[]>(getDefaultCategories());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [sleepStudyBookings, setSleepStudyBookings] = useState<SleepStudyBookingItem[]>([]);
  const [bundles, setBundles] = useState<BundleItem[]>([]);
  const [pricingSettings, setPricingSettings] = useState<SitePricingSettings>(DEFAULT_PRICING_SETTINGS);

  // Function to fetch administrative data (inquiries, orders, bookings)
  const refreshAdminData = async () => {
    try {
      const [inqRes, ordRes, ssbRes] = await Promise.all([
        fetch("/api/inquiries").then((r) => r.json()).catch(() => ({ success: false })),
        fetch("/api/orders").then((r) => r.json()).catch(() => ({ success: false })),
        fetch("/api/sleep-study-bookings").then((r) => r.json()).catch(() => ({ success: false })),
      ]);

      if (inqRes.success && inqRes.inquiries) setInquiries(inqRes.inquiries);
      if (ordRes.success && ordRes.orders) setOrders(ordRes.orders);
      if (ssbRes.success && ssbRes.bookings) setSleepStudyBookings(ssbRes.bookings);
    } catch (e) {
      console.error("Failed to load admin data", e);
    }
  };

  useEffect(() => {
    // 1. Restore admin session from localStorage
    try {
      if (typeof window !== "undefined") {
        const savedAuth = localStorage.getItem("pulmocare_admin_auth");
        if (savedAuth) {
          const parsed = JSON.parse(savedAuth);
          if (parsed && (parsed.email === "admin@pulmocare.in" || parsed.role)) {
            setIsAdminAuthenticated(true);
            setAdminUser(parsed);
          }
        }
      }
    } catch (err) {
      console.error("Failed to restore admin auth from localStorage", err);
    } finally {
      setIsAuthChecked(true);
    }

    // 2. Instant client-side hydration from localStorage cache
    try {
      const cachedCats = localStorage.getItem("pulmocare_cache_cats");
      let deletedCats: string[] = [];
      try {
        const dStr = localStorage.getItem("pulmocare_deleted_categories");
        if (dStr) deletedCats = JSON.parse(dStr);
      } catch {}

      if (cachedCats) {
        const parsed = JSON.parse(cachedCats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.filter((c: any) => {
            if (!c || !c.name) return false;
            const cName = String(c.name).toLowerCase().trim();
            const cId = String(c.id || "").toLowerCase().trim();
            const cSlug = String(c.slug || "").toLowerCase().trim();
            if (deletedCats.includes(cId) || deletedCats.includes(cSlug) || deletedCats.includes(cName)) return false;
            if (cName === "te" || cName === "test" || c.badge === "TEST" || String(c.desc || "").toLowerCase().includes("testess")) return false;
            return true;
          });
          setCategories(cleaned);
          try { localStorage.setItem("pulmocare_cache_cats", JSON.stringify(cleaned)); } catch {}
        }
      }
      let deletedProds: string[] = [];
      try {
        const dpStr = localStorage.getItem("pulmocare_deleted_products");
        if (dpStr) deletedProds = JSON.parse(dpStr);
      } catch {}

      const cachedProds = localStorage.getItem("pulmocare_cache_prods");
      if (cachedProds) {
        const parsed = JSON.parse(cachedProds);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const defaults = getDefaultProducts();
          const cleaned = parsed
            .filter((p: any) => p && !deletedProds.includes(p.id) && !deletedProds.includes((p as any)._id) && p.id !== "prod-1785694929851" && p.name !== "wrwe" && !String(p.id).toLowerCase().includes("test"))
            .map((p: any) => {
              const def = defaults.find((d) => d.id === p.id);
              if (def && p.price === 63000 && def.price === 62000) {
                return { ...p, price: 62000 };
              }
              if (def && (p.price === undefined || p.price === null) && def.price) {
                return { ...p, price: def.price, originalPrice: def.originalPrice };
              }
              return p;
            });
          setProducts(cleaned);
        }
      }
      const cachedBlogs = localStorage.getItem("pulmocare_cache_blogs");
      if (cachedBlogs) {
        const parsed = JSON.parse(cachedBlogs);
        if (Array.isArray(parsed) && parsed.length > 0) setBlogPosts(parsed);
      }
      let deletedRevs: string[] = [];
      try {
        const drStr = localStorage.getItem("pulmocare_deleted_reviews");
        if (drStr) deletedRevs = JSON.parse(drStr);
      } catch {}

      const cachedRevs = localStorage.getItem("pulmocare_cache_revs");
      if (cachedRevs) {
        const parsed = JSON.parse(cachedRevs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed.filter((r: any) => r && !deletedRevs.includes(r.id)));
        }
      }
      const cachedSettings = localStorage.getItem("pulmocare_pricing_settings");
      if (cachedSettings) {
        try {
          const parsed = JSON.parse(cachedSettings);
          if (parsed && typeof parsed === "object") setPricingSettings((prev) => ({ ...prev, ...parsed }));
        } catch {}
      }
    } catch (e) {}

    // 3. Fast parallel fetch from unified storefront API
    const fetchStorefrontData = async () => {
      try {
        const mergeWithDefaultProducts = (fetchedProds: Product[]) => {
          const defaults = getDefaultProducts();
          const map = new Map<string, Product>();
          const getSafeProdKey = (p: Partial<Product>) => {
            const val = p.id || p.sku || p.name || "";
            return String(val).toLowerCase().trim();
          };

          defaults.forEach((p) => {
            if (p && typeof p === "object") {
              const key = getSafeProdKey(p);
              if (key) map.set(key, p);
            }
          });

          if (Array.isArray(fetchedProds)) {
            fetchedProds.forEach((p) => {
              if (p && typeof p === "object" && p.id !== "prod-1785694929851" && p.name !== "wrwe") {
                const key = getSafeProdKey(p);
                if (key) map.set(key, p);
              }
            });
          }

          // Also merge any local backup custom products so custom products never disappear
          if (typeof window !== "undefined") {
            try {
              const localCustom = localStorage.getItem("pulmocare_custom_products");
              if (localCustom) {
                const parsed = JSON.parse(localCustom);
                if (Array.isArray(parsed)) {
                  const cleaned = parsed.filter(
                    (p: any) =>
                      p &&
                      p.name &&
                      p.name.length >= 3 &&
                      p.name.toLowerCase() !== "wrwe" &&
                      p.id !== "prod-1785694929851" &&
                      !String(p.name).toLowerCase().includes("test")
                  );
                  if (cleaned.length !== parsed.length) {
                    localStorage.setItem("pulmocare_custom_products", JSON.stringify(cleaned));
                  }
                  cleaned.forEach((p) => {
                    const key = getSafeProdKey(p);
                    if (key) map.set(key, p);
                  });
                }
              }
            } catch {}
          }

          let deletedProds: string[] = [];
          if (typeof window !== "undefined") {
            try {
              const dpStr = localStorage.getItem("pulmocare_deleted_products");
              if (dpStr) deletedProds = JSON.parse(dpStr);
            } catch {}
          }

          return Array.from(map.values()).filter(
            (p) => !deletedProds.includes(p.id) && !deletedProds.includes((p as any)._id)
          );
        };

        // Fetch categories - robust normalization + local custom-category preservation
        const normalizeCategories = (cats: CategoryItem[]): CategoryItem[] => {
          if (!Array.isArray(cats)) return [];

          let deletedCats: string[] = [];
          if (typeof window !== "undefined") {
            try {
              const dStr = localStorage.getItem("pulmocare_deleted_categories");
              if (dStr) deletedCats = JSON.parse(dStr);
            } catch {}
          }

          const isCatClean = (c: Partial<CategoryItem>) => {
            if (!c || !c.name) return false;
            const cName = String(c.name).toLowerCase().trim();
            const cId = String(c.id || "").toLowerCase().trim();
            const cSlug = String(c.slug || "").toLowerCase().trim();
            if (deletedCats.includes(cId) || deletedCats.includes(cSlug) || deletedCats.includes(cName)) return false;
            if (cName === "te" || cName === "test" || c.badge === "TEST" || String(c.desc || "").toLowerCase().includes("testess")) return false;
            return true;
          };

          const safeCats = cats.filter((c): c is CategoryItem => Boolean(c && typeof c === "object" && isCatClean(c)));
          const mapped = safeCats.map((c) => {
            const slug = String(c.slug || "").toLowerCase();
            const id = String(c.id || "").toLowerCase();
            const name = String(c.name || "").toLowerCase();
            if (slug === "sleep-apnea-therapy" || id === "cat-1" || name === "sleep apnea therapy" || name === "sleep therapy") {
              return {
                ...c,
                id: c.id || "cat-1",
                slug: c.slug || "sleep-apnea-therapy",
                name: "CPAP Therapy",
                image: c.image || "/images/pulmocare/pulmocare_prisma-smart-plus.png",
              };
            }
            return c;
          });

          const getSafeCatKey = (c: Partial<CategoryItem>) => {
            const val = c.id || c.slug || c.name || "";
            return String(val).toLowerCase().trim();
          };

          const map = new Map<string, CategoryItem>();
          mapped.forEach((c) => {
            const key = getSafeCatKey(c);
            if (key) map.set(key, c);
          });

          // Merge with local backup categories so custom categories never disappear
          if (typeof window !== "undefined") {
            try {
              const localCustom = localStorage.getItem("pulmocare_custom_categories");
              if (localCustom) {
                const parsed = JSON.parse(localCustom);
                if (Array.isArray(parsed)) {
                  parsed.forEach((c) => {
                    if (c && typeof c === "object" && isCatClean(c)) {
                      const key = getSafeCatKey(c);
                      if (key) map.set(key, c);
                    }
                  });
                }
              }
            } catch {}
          }

          return Array.from(map.values()).filter(isCatClean);
        };

        // Try unified cached storefront endpoint first (1 single roundtrip)
        const sfRes = await fetch("/api/storefront-data").then((r) => r.json()).catch(() => null);

        let gotProducts = false;
        let gotCategories = false;

        if (sfRes && sfRes.success) {
          if (sfRes.products && sfRes.products.length > 0) {
            const merged = mergeWithDefaultProducts(sfRes.products);
            setProducts(merged);
            gotProducts = true;
            try { localStorage.setItem("pulmocare_cache_prods", JSON.stringify(merged)); } catch (e) {}
          }
          if (sfRes.categories && sfRes.categories.length > 0) {
            const normCats = normalizeCategories(sfRes.categories);
            setCategories(normCats);
            gotCategories = true;
            try { localStorage.setItem("pulmocare_cache_cats", JSON.stringify(normCats)); } catch (e) {}
          }
          if (sfRes.blogs && sfRes.blogs.length > 0) {
            setBlogPosts(sfRes.blogs);
            try { localStorage.setItem("pulmocare_cache_blogs", JSON.stringify(sfRes.blogs)); } catch (e) {}
          }
          if (sfRes.reviews && sfRes.reviews.length > 0) {
            setReviews(sfRes.reviews);
            try { localStorage.setItem("pulmocare_cache_revs", JSON.stringify(sfRes.reviews)); } catch (e) {}
          }
          if (sfRes.settings) {
            setPricingSettings(sfRes.settings);
            try { localStorage.setItem("pulmocare_pricing_settings", JSON.stringify(sfRes.settings)); } catch (e) {}
          }
        } else {
          // Fallback: parallel fetch of individual endpoints
          const [prodRes, catRes, blogRes, revRes, setRes] = await Promise.all([
            fetch("/api/products").then((r) => r.json()).catch(() => ({ success: false })),
            fetch("/api/categories").then((r) => r.json()).catch(() => ({ success: false })),
            fetch("/api/blogs").then((r) => r.json()).catch(() => ({ success: false })),
            fetch("/api/reviews").then((r) => r.json()).catch(() => ({ success: false })),
            fetch("/api/settings").then((r) => r.json()).catch(() => ({ success: false })),
          ]);

          if (setRes && setRes.success && setRes.settings) {
            setPricingSettings(setRes.settings);
            try { localStorage.setItem("pulmocare_pricing_settings", JSON.stringify(setRes.settings)); } catch (e) {}
          }

          if (prodRes.success && prodRes.products && prodRes.products.length > 0) {
            setProducts(mergeWithDefaultProducts(prodRes.products));
            gotProducts = true;
          }
          if (catRes.success && catRes.categories && catRes.categories.length > 0) {
            setCategories(normalizeCategories(catRes.categories));
            gotCategories = true;
          }
          if (blogRes.success && blogRes.blogs) setBlogPosts(blogRes.blogs);
          if (revRes.success && revRes.reviews) setReviews(revRes.reviews);
        }

        // If the DB came back empty, trigger the idempotent seed and re-read.
        if (!gotProducts || !gotCategories) {
          await fetch("/api/seed").catch(() => {});
          const [seededProds, seededCats] = await Promise.all([
            fetch("/api/products").then((r) => r.json()).catch(() => ({ success: false })),
            fetch("/api/categories").then((r) => r.json()).catch(() => ({ success: false })),
          ]);

          if (!gotProducts) {
            if (seededProds.success && seededProds.products && seededProds.products.length > 0) {
              setProducts(mergeWithDefaultProducts(seededProds.products));
            } else {
              setProducts(getDefaultProducts());
            }
          }
          if (!gotCategories && seededCats.success && seededCats.categories && seededCats.categories.length > 0) {
            setCategories(normalizeCategories(seededCats.categories));
          }
        }

        // Check if on admin page, then load admin data
        const isClient = typeof window !== "undefined";
        if (isClient && (window.location.pathname.startsWith("/admin") || localStorage.getItem("pulmocare_admin_auth"))) {
          await refreshAdminData();
        }

        // Fetch bundles
        const bundleRes = await fetch("/api/bundles").then((r) => r.json()).catch(() => ({ success: false }));
        if (bundleRes.success && bundleRes.bundles && bundleRes.bundles.length > 0) {
          setBundles(bundleRes.bundles);
        }
      } catch (err) {
        console.error("Failed to load storefront data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStorefrontData();
  }, []);

  const login = (email: string, pass: string): boolean => {
    if (email === "admin@pulmocare.in" && pass === "admin123") {
      const user = { name: "Pulmo Care Admin", email, role: "Super Administrator" };
      setIsAdminAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem("pulmocare_admin_auth", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem("pulmocare_admin_auth");
  };

  // Products CRUD Handlers
  const addProduct = async (newProduct: Product) => {
    // 1. Save to localStorage backup immediately so it's NEVER lost across reloads
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("pulmocare_custom_products");
        const list: Product[] = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((p) => p.id?.toLowerCase() !== newProduct.id?.toLowerCase());
        localStorage.setItem("pulmocare_custom_products", JSON.stringify([newProduct, ...filtered]));
      } catch {}
    }

    // 2. Persist to MongoDB Atlas
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts((prev) => [data.product, ...prev.filter((p) => p.id?.toLowerCase() !== data.product.id?.toLowerCase())]);
        return data.product;
      } else {
        console.warn("MongoDB Atlas product save notice:", data.error);
        setProducts((prev) => [newProduct, ...prev.filter((p) => p.id?.toLowerCase() !== newProduct.id?.toLowerCase())]);
        return newProduct;
      }
    } catch (err) {
      console.error("Error adding product to MongoDB Atlas", err);
      setProducts((prev) => [newProduct, ...prev.filter((p) => p.id?.toLowerCase() !== newProduct.id?.toLowerCase())]);
      return newProduct;
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("pulmocare_custom_products");
        if (stored) {
          const list: Product[] = JSON.parse(stored);
          const nextList = list.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
          localStorage.setItem("pulmocare_custom_products", JSON.stringify(nextList));
        }
      } catch {}
    }
    try {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
    } catch (err) {
      console.error("Error updating product in MongoDB Atlas", err);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id && (p as any)._id !== id));
    if (typeof window !== "undefined") {
      try {
        const dStr = localStorage.getItem("pulmocare_deleted_products");
        const dList: string[] = dStr ? JSON.parse(dStr) : [];
        if (!dList.includes(id)) dList.push(id);
        localStorage.setItem("pulmocare_deleted_products", JSON.stringify(dList));

        const stored = localStorage.getItem("pulmocare_custom_products");
        if (stored) {
          const list: Product[] = JSON.parse(stored);
          localStorage.setItem("pulmocare_custom_products", JSON.stringify(list.filter((p) => p.id !== id && (p as any)._id !== id)));
        }

        const cached = localStorage.getItem("pulmocare_cache_prods");
        if (cached) {
          const list: Product[] = JSON.parse(cached);
          localStorage.setItem("pulmocare_cache_prods", JSON.stringify(list.filter((p) => p.id !== id && (p as any)._id !== id)));
        }
      } catch {}
    }
    try {
      await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting product from MongoDB Atlas", err);
    }
  };

  // Categories CRUD Handlers
  const addCategory = async (newCategory: CategoryItem) => {
    // 1. Immediately cache in localStorage so category is NEVER lost
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("pulmocare_custom_categories");
        const list: CategoryItem[] = stored ? JSON.parse(stored) : [];
        const getCatKey = (item: any) => String(item?.id || item?.slug || item?.name || "").toLowerCase().trim();
        const filtered = Array.isArray(list) ? list.filter((c) => getCatKey(c) !== getCatKey(newCategory)) : [];
        localStorage.setItem("pulmocare_custom_categories", JSON.stringify([...filtered, newCategory]));
      } catch {}
    }

    // 2. Persist to MongoDB Atlas
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      const data = await res.json();
      const getCatKey = (item: any) => String(item?.id || item?.slug || item?.name || "").toLowerCase().trim();
      if (data.success && data.category) {
        setCategories((prev) => [...prev.filter((c) => getCatKey(c) !== getCatKey(data.category)), data.category]);
      } else {
        setCategories((prev) => [...prev.filter((c) => getCatKey(c) !== getCatKey(newCategory)), newCategory]);
      }
    } catch (err) {
      console.error("Error adding category to MongoDB Atlas", err);
      const getCatKey = (item: any) => String(item?.id || item?.slug || item?.name || "").toLowerCase().trim();
      setCategories((prev) => [...prev.filter((c) => getCatKey(c) !== getCatKey(newCategory)), newCategory]);
    }
  };

  const updateCategory = async (updatedCategory: CategoryItem) => {
    setCategories((prev) => prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)));
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("pulmocare_custom_categories");
        if (stored) {
          const list: CategoryItem[] = JSON.parse(stored);
          const nextList = list.map((c) => (c.id === updatedCategory.id ? updatedCategory : c));
          localStorage.setItem("pulmocare_custom_categories", JSON.stringify(nextList));
        }
      } catch {}
    }
    try {
      await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory),
      });
    } catch (err) {
      console.error("Error updating category in MongoDB Atlas", err);
    }
  };

  const deleteCategory = async (id: string) => {
    const catToDelete = categories.find((c) => c.id === id || c.slug === id);
    const idKey = String(id).toLowerCase().trim();
    const slugKey = catToDelete ? String(catToDelete.slug).toLowerCase().trim() : idKey;
    const nameKey = catToDelete ? String(catToDelete.name).toLowerCase().trim() : idKey;

    setCategories((prev) =>
      prev.filter(
        (c) =>
          c.id !== id &&
          c.slug !== id &&
          c.slug !== slugKey &&
          String(c.name).toLowerCase().trim() !== nameKey
      )
    );

    if (typeof window !== "undefined") {
      try {
        const dStr = localStorage.getItem("pulmocare_deleted_categories");
        const dList: string[] = dStr ? JSON.parse(dStr) : [];
        if (!dList.includes(idKey)) dList.push(idKey);
        if (!dList.includes(slugKey)) dList.push(slugKey);
        if (!dList.includes(nameKey)) dList.push(nameKey);
        localStorage.setItem("pulmocare_deleted_categories", JSON.stringify(dList));

        const stored = localStorage.getItem("pulmocare_custom_categories");
        if (stored) {
          const list: CategoryItem[] = JSON.parse(stored);
          const filtered = list.filter(
            (c) =>
              c.id !== id &&
              c.slug !== id &&
              c.slug !== slugKey &&
              String(c.name).toLowerCase().trim() !== nameKey
          );
          localStorage.setItem("pulmocare_custom_categories", JSON.stringify(filtered));
        }

        const cached = localStorage.getItem("pulmocare_cache_cats");
        if (cached) {
          const list: CategoryItem[] = JSON.parse(cached);
          const filtered = list.filter(
            (c) =>
              c.id !== id &&
              c.slug !== id &&
              c.slug !== slugKey &&
              String(c.name).toLowerCase().trim() !== nameKey
          );
          localStorage.setItem("pulmocare_cache_cats", JSON.stringify(filtered));
        }
      } catch {}
    }
    try {
      await fetch(`/api/categories?id=${encodeURIComponent(id)}&slug=${encodeURIComponent(slugKey)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error deleting category from MongoDB Atlas", err);
    }
  };

  // Blog CRUD Handlers
  const addBlogPost = async (newPost: BlogPost) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await res.json();
      setBlogPosts((prev) => [data.blog || newPost, ...prev]);
    } catch (err) {
      console.error("Error publishing article to MongoDB Atlas", err);
      setBlogPosts((prev) => [newPost, ...prev]);
    }
  };

  const updateBlogPost = async (updatedPost: BlogPost) => {
    setBlogPosts((prev) => prev.map((b) => (b.slug === updatedPost.slug ? updatedPost : b)));
    try {
      await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
    } catch (err) {
      console.error("Error updating article in MongoDB Atlas", err);
    }
  };

  const deleteBlogPost = async (slug: string) => {
    setBlogPosts((prev) => prev.filter((b) => b.slug !== slug));
    try {
      await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting article from MongoDB Atlas", err);
    }
  };

  // Reviews CRUD Handlers
  const addReview = async (review: ReviewItem) => {
    setReviews((prev) => {
      const updated = [review, ...prev.filter((r) => r.id !== review.id)];
      try {
        localStorage.setItem("pulmocare_cache_revs", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      const data = await res.json();
      if (data.review) {
        setReviews((prev) => {
          const updated = prev.map((r) => (r.id === review.id ? data.review : r));
          try {
            localStorage.setItem("pulmocare_cache_revs", JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
    } catch (err) {
      console.error("Error adding review to MongoDB Atlas", err);
    }
  };

  const deleteReview = async (id: string) => {
    setReviews((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem("pulmocare_cache_revs", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (typeof window !== "undefined") {
      try {
        const dStr = localStorage.getItem("pulmocare_deleted_reviews");
        const dList: string[] = dStr ? JSON.parse(dStr) : [];
        if (!dList.includes(id)) dList.push(id);
        localStorage.setItem("pulmocare_deleted_reviews", JSON.stringify(dList));
      } catch {}
    }

    try {
      await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting review from MongoDB Atlas", err);
    }
  };

  const approveReview = async (id: string) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status: "Approved" } : r));
    setReviews(updated);
    try {
      const target = updated.find((r) => r.id === id);
      if (target) {
        await fetch("/api/reviews", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(target),
        });
      }
    } catch (err) {
      console.error("Error approving review in MongoDB Atlas", err);
    }
  };

  // Inquiries CRUD Handlers
  const addInquiry = async (inquiry: InquiryItem) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
      const data = await res.json();
      setInquiries((prev) => [data.inquiry || inquiry, ...prev]);
    } catch (err) {
      console.error("Error submitting contact inquiry to MongoDB Atlas", err);
      setInquiries((prev) => [inquiry, ...prev]);
    }
  };

  const deleteInquiry = async (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    try {
      await fetch(`/api/inquiries?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting contact inquiry from MongoDB Atlas", err);
    }
  };

  const updateInquiryStatus = async (id: string, newStatus: string, _name?: string) => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq));
    setInquiries(updated);
    try {
      const target = updated.find((inq) => inq.id === id);
      if (target) {
        await fetch("/api/inquiries", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(target),
        });
      }
    } catch (err) {
      console.error("Error updating inquiry status in MongoDB Atlas", err);
    }
  };

  // Orders CRUD Handlers
  const addOrder = async (order: OrderItem) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await res.json();
      setOrders((prev) => [data.order || order, ...prev]);
    } catch (err) {
      console.error("Error saving checkout order to MongoDB Atlas", err);
      setOrders((prev) => [order, ...prev]);
    }
  };

  const deleteOrder = async (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    try {
      await fetch(`/api/orders?orderId=${encodeURIComponent(orderId)}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting order from MongoDB Atlas", err);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, orderStatus: newStatus } : o));
    setOrders(updated);
    try {
      const target = updated.find((o) => o.orderId === orderId);
      if (target) {
        await fetch("/api/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(target),
        });
      }
    } catch (err) {
      console.error("Error updating order status in MongoDB Atlas", err);
    }
  };

  // Sleep Study Booking Handlers
  const addSleepStudyBooking = async (newBooking: SleepStudyBookingItem) => {
    try {
      const res = await fetch("/api/sleep-study-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      const data = await res.json();
      if (data.success && data.booking) {
        setSleepStudyBookings((prev) => [data.booking, ...prev]);
      } else {
        setSleepStudyBookings((prev) => [newBooking, ...prev]);
      }
    } catch (err) {
      console.error("Error adding sleep study booking", err);
      setSleepStudyBookings((prev) => [newBooking, ...prev]);
    }
  };

  const deleteSleepStudyBooking = async (bookingId: string) => {
    setSleepStudyBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
    try {
      await fetch(`/api/sleep-study-bookings?bookingId=${encodeURIComponent(bookingId)}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting sleep study booking", err);
    }
  };

  const updateSleepStudyBookingStatus = async (bookingId: string, status: string) => {
    setSleepStudyBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, status } : b))
    );
    try {
      await fetch("/api/sleep-study-bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status }),
      });
    } catch (err) {
      console.error("Error updating sleep study booking status", err);
    }
  };

  const refreshBundles = async () => {
    try {
      const res = await fetch("/api/bundles").then((r) => r.json()).catch(() => ({ success: false }));
      if (res.success && res.bundles) {
        setBundles(res.bundles);
      }
    } catch (err) {
      console.error("Failed to refresh bundles", err);
    }
  };

  const addBundle = async (bundleData: Partial<BundleItem>): Promise<BundleItem | null> => {
    try {
      const res = await fetch("/api/bundles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bundleData),
      });
      const data = await res.json();
      if (data.success && data.bundle) {
        setBundles((prev) => [data.bundle, ...prev]);
        return data.bundle;
      }
      return null;
    } catch (err) {
      console.error("Error creating bundle", err);
      return null;
    }
  };

  const updateBundle = async (bundleData: Partial<BundleItem>) => {
    setBundles((prev) =>
      prev.map((b) => (b.bundleId === bundleData.bundleId ? ({ ...b, ...bundleData } as BundleItem) : b))
    );
    try {
      const res = await fetch("/api/bundles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bundleData),
      });
      const data = await res.json();
      if (data.success && data.bundle) {
        setBundles((prev) =>
          prev.map((b) => (b.bundleId === data.bundle.bundleId ? data.bundle : b))
        );
      }
    } catch (err) {
      console.error("Error updating bundle", err);
    }
  };

  const deleteBundle = async (bundleId: string) => {
    setBundles((prev) => prev.filter((b) => b.bundleId !== bundleId));
    try {
      await fetch(`/api/bundles?bundleId=${encodeURIComponent(bundleId)}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting bundle", err);
    }
  };

  const updatePricingSettings = async (newSettings: Partial<SitePricingSettings>) => {
    const updated: SitePricingSettings = { ...pricingSettings, ...newSettings };
    setPricingSettings(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("pulmocare_pricing_settings", JSON.stringify(updated));
      } catch {}
    }
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success && data.settings) {
        setPricingSettings(data.settings);
      }
    } catch (err) {
      console.error("Error saving pricing settings to MongoDB Atlas", err);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        isAuthChecked,
        adminUser,
        login,
        logout,
        isLoading,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        reviews,
        addReview,
        deleteReview,
        approveReview,
        inquiries,
        addInquiry,
        deleteInquiry,
        updateInquiryStatus,
        orders,
        addOrder,
        deleteOrder,
        updateOrderStatus,
        sleepStudyBookings,
        addSleepStudyBooking,
        deleteSleepStudyBooking,
        updateSleepStudyBookingStatus,
        refreshAdminData,
        bundles,
        addBundle,
        updateBundle,
        deleteBundle,
        refreshBundles,
        pricingSettings,
        updatePricingSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
