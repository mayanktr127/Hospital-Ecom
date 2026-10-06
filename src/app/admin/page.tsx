"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdmin, ReviewItem, CategoryItem, OrderItem } from "@/context/AdminContext";
import { useToast } from "@/context/ToastContext";
import { Product } from "@/types/product";
import { BlogPost } from "@/context/AdminContext";
import { isRentalProduct, isRentalCategory } from "@/utils/rental";
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  FileText,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Search,
  ExternalLink,
  ShieldCheck,
  Tag,
  CheckCircle,
  X,
  Sparkles,
  Layers,
  Calendar,
  User,
  Clock,
  Bell,
  Info,
  Upload,
  TrendingUp,
  TrendingDown,
  Truck,
  MapPin,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Filter,
  Check,
  Menu,
  Phone,
  Mail,
  Sliders,
  Settings,
  HelpCircle,
  Users,
  Star,
  ThumbsUp,
  Eye,
  Printer,
} from "lucide-react";
import { BundleMakerTab } from "@/components/admin/BundleMakerTab";

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    isAdminAuthenticated,
    adminUser,
    logout,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    reviews,
    addReview,
    deleteReview,
    approveReview,
    inquiries,
    deleteInquiry,
    updateInquiryStatus,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    orders,
    deleteOrder,
    updateOrderStatus,
    sleepStudyBookings,
    deleteSleepStudyBooking,
    updateSleepStudyBookingStatus,
    bundles,
  } = useAdmin();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "products"
    | "categories"
    | "blogs"
    | "reviews"
    | "tracking"
    | "messages"
    | "sleep-studies"
    | "bundles"
  >("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search & Filter States
  const [globalSearch, setGlobalSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [blogSearch, setBlogSearch] = useState("");
  const [reviewSearch, setReviewSearch] = useState("");
  const [inquirySearch, setInquirySearch] = useState("");
  const [ssSearch, setSsSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [viewingOrder, setViewingOrder] = useState<OrderItem | null>(null);
  const [selectedAnalyticsMonthIndex, setSelectedAnalyticsMonthIndex] = useState<number | null>(null);

  // Notification Center State & Aggregator
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [notificationCategoryFilter, setNotificationCategoryFilter] = useState<string>("all");
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("pulmocare_admin_read_notifs");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const allNotifications = useMemo(() => {
    const list: Array<{
      id: string;
      category: "inquiry" | "order" | "bundle" | "sleep" | "inventory" | "review";
      categoryLabel: string;
      title: string;
      description: string;
      timeAgo: string;
      rawTime: number;
      targetTab: "messages" | "tracking" | "bundles" | "sleep-studies" | "products" | "reviews";
      unread: boolean;
      badgeColor: string;
    }> = [];

    // 1. Customer Inquiries & Price Quote Requests
    (inquiries || []).forEach((inq) => {
      const created = inq.createdAt ? new Date(inq.createdAt).getTime() : Date.now() - 3600000;
      list.push({
        id: `notif-inq-${inq.id}`,
        category: "inquiry",
        categoryLabel: "Inquiry & Quote",
        title: `Quote Request: ${inq.device || "Equipment"}`,
        description: `${inq.fullName} (${inq.city || "Client"}) • "${inq.inquiryType || "Price Quote"}"`,
        timeAgo: inq.createdAt ? new Date(inq.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recent",
        rawTime: created,
        targetTab: "messages",
        unread: !readNotificationIds.includes(`notif-inq-${inq.id}`),
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      });
    });

    // 2. Orders & E-Commerce Transactions
    (orders || []).forEach((ord) => {
      const created = ord.createdAt ? new Date(ord.createdAt).getTime() : Date.now() - 7200000;
      list.push({
        id: `notif-ord-${ord.orderId}`,
        category: "order",
        categoryLabel: "Store Order",
        title: `New Order #${ord.orderId} (₹${ord.totalAmount?.toLocaleString("en-IN") || "0"})`,
        description: `${ord.customerName} • Status: ${ord.orderStatus || "Processing"} • ${ord.items?.length || 1} items`,
        timeAgo: ord.createdAt ? new Date(ord.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Recent",
        rawTime: created,
        targetTab: "tracking",
        unread: !readNotificationIds.includes(`notif-ord-${ord.orderId}`),
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      });
    });

    // 3. Bundles (Paid & Quotations)
    (bundles || []).forEach((bdl) => {
      const isPaid = bdl.status === "paid";
      const created = bdl.createdAt ? new Date(bdl.createdAt).getTime() : Date.now() - 10800000;
      list.push({
        id: `notif-bdl-${bdl.bundleId}`,
        category: "bundle",
        categoryLabel: isPaid ? "Bundle Paid" : "Bundle Created",
        title: isPaid ? `Payment Received: ${bdl.bundleId} (₹${bdl.totalAmount?.toLocaleString("en-IN")})` : `Quotation: ${bdl.bundleId}`,
        description: bdl.clientName ? `Customer: ${bdl.clientName} • ${bdl.items?.length || 0} items` : `Quotation with ${bdl.items?.length || 0} items`,
        timeAgo: bdl.createdAt ? new Date(bdl.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Recent",
        rawTime: created,
        targetTab: "bundles",
        unread: !readNotificationIds.includes(`notif-bdl-${bdl.bundleId}`),
        badgeColor: isPaid ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-purple-100 text-purple-800 border-purple-200",
      });
    });

    // 4. Sleep Study Diagnostic Bookings
    (sleepStudyBookings || []).forEach((sb) => {
      const created = sb.createdAt ? new Date(sb.createdAt).getTime() : Date.now() - 14400000;
      list.push({
        id: `notif-ss-${sb.bookingId}`,
        category: "sleep",
        categoryLabel: "Sleep Diagnostic",
        title: `Sleep Study: ${sb.patientName}`,
        description: `${sb.level || "Home Sleep Study"} in ${sb.city || "Bengaluru"} • Phone: ${sb.phone}`,
        timeAgo: sb.createdAt ? new Date(sb.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Recent",
        rawTime: created,
        targetTab: "sleep-studies",
        unread: !readNotificationIds.includes(`notif-ss-${sb.bookingId}`),
        badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      });
    });

    // 5. Inventory & Stock Alerts
    (products || []).filter((p) => p.inStock === false).forEach((p) => {
      list.push({
        id: `notif-inv-${p.id}`,
        category: "inventory",
        categoryLabel: "Out of Stock",
        title: `Stock Alert: ${p.name}`,
        description: `Marked Out of Stock in catalog (${p.category})`,
        timeAgo: "Attention Required",
        rawTime: Date.now() - 86400000,
        targetTab: "products",
        unread: !readNotificationIds.includes(`notif-inv-${p.id}`),
        badgeColor: "bg-red-100 text-red-800 border-red-200",
      });
    });

    // 6. Customer Reviews Pending Moderation
    (reviews || []).filter((r) => r.status === "pending").forEach((r) => {
      list.push({
        id: `notif-rev-${r.id}`,
        category: "review",
        categoryLabel: "Review Awaiting",
        title: `New ${r.rating}★ Review: ${r.productName}`,
        description: `By ${r.author}: "${r.comment.slice(0, 45)}..."`,
        timeAgo: "Pending Approval",
        rawTime: Date.now() - 172800000,
        targetTab: "reviews",
        unread: !readNotificationIds.includes(`notif-rev-${r.id}`),
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      });
    });

    return list.sort((a, b) => b.rawTime - a.rawTime);
  }, [inquiries, orders, bundles, sleepStudyBookings, products, reviews, readNotificationIds]);

  const unreadCount = allNotifications.filter((n) => n.unread).length;

  const filteredNotifications = useMemo(() => {
    if (notificationCategoryFilter === "all") return allNotifications;
    return allNotifications.filter((n) => n.category === notificationCategoryFilter);
  }, [allNotifications, notificationCategoryFilter]);

  const markAllNotificationsAsRead = () => {
    const allIds = allNotifications.map((n) => n.id);
    setReadNotificationIds(allIds);
    try {
      localStorage.setItem("pulmocare_admin_read_notifs", JSON.stringify(allIds));
    } catch {}
    addToast("Notifications Cleared", "All notifications marked as read.");
  };

  const markNotificationAsRead = (id: string) => {
    if (!readNotificationIds.includes(id)) {
      const updated = [...readNotificationIds, id];
      setReadNotificationIds(updated);
      try {
        localStorage.setItem("pulmocare_admin_read_notifs", JSON.stringify(updated));
      } catch {}
    }
  };

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Blog Modal State
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Category Modal State
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  // Category Form Fields
  const [cId, setCId] = useState("");
  const [cName, setCName] = useState("");
  const [cSlug, setCSlug] = useState("");
  const [cBadge, setCBadge] = useState("");
  const [cImage, setCImage] = useState("");
  const [cDesc, setCDesc] = useState("");
  const [isUploadingCatImage, setIsUploadingCatImage] = useState(false);

  const handleOpenCategoryModal = (cat?: CategoryItem) => {
    if (cat) {
      setEditingCategory(cat);
      setCId(cat.id);
      setCName(cat.name);
      setCSlug(cat.slug);
      setCBadge(cat.badge || "");
      setCImage(cat.image);
      setCDesc(cat.desc);
    } else {
      setEditingCategory(null);
      setCId(`cat-${Date.now()}`);
      setCName("");
      setCSlug("");
      setCBadge("");
      setCImage("");
      setCDesc("");
    }
    setCategoryModalOpen(true);
  };

  const handleCatImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCatImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setCImage(data.url);
        addToast("Multer Upload Success", "Category image stored in /uploads directory.");
      } else {
        addToast("Upload Failed", data.error || "Could not upload image.", "error");
      }
    } catch (err) {
      console.error("Multer upload error", err);
      addToast("Upload Error", "Failed to upload image file.", "error");
    } finally {
      setIsUploadingCatImage(false);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName) {
      addToast("Required Field", "Please provide a Category Name.", "warning");
      return;
    }

    const categorySlug = cSlug || cName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const catObj: CategoryItem = {
      id: cId || `cat-${Date.now()}`,
      name: cName,
      slug: categorySlug,
      badge: cBadge || undefined,
      image: cImage || "/images/pulmocare/pulmocare_prisma-smart.png",
      desc: cDesc || "Clinical healthcare equipment and devices.",
    };

    if (editingCategory) {
      await updateCategory(catObj);
      addToast("Category Updated", `Category "${cName}" updated in MongoDB Atlas.`);
    } else {
      await addCategory(catObj);
      addToast("Category Created", `Category "${cName}" created & live on frontend!`);
    }

    setCategoryModalOpen(false);
  };

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rProductId, setRProductId] = useState("prisma-25s");
  const [rProductName, setRProductName] = useState("Prisma 25S");
  const [rAuthor, setRAuthor] = useState("");
  const [rRating, setRRating] = useState(5);
  const [rComment, setRComment] = useState("");

  // Product Form Fields
  const [pId, setPId] = useState("");
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("Ventilation & Sleep");
  const [pPrice, setPPrice] = useState("");
  const [pOriginalPrice, setPOriginalPrice] = useState("");
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pBadge, setPBadge] = useState("");
  const [pBrand, setPBrand] = useState("Löwenstein Medical");
  const [pSku, setPSku] = useState("");
  const [pInStock, setPInStock] = useState(true);
  const [pIsFeatured, setPIsFeatured] = useState(false);
  const [pIsOffer, setPIsOffer] = useState(false);
  const [pPricingMode, setPPricingMode] = useState<"price" | "rental" | "on_request">("price");
  const [pFeaturesText, setPFeaturesText] = useState("");
  const [pSpecsText, setPSpecsText] = useState("");
  const [pBoxContentsText, setPBoxContentsText] = useState("");
  const [pWarranty, setPWarranty] = useState("2 Years Warranty");
  const [pBrochureUrl, setPBrochureUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setPImage(data.url);
        addToast("Upload Success", "Product image uploaded successfully.");
      } else {
        addToast("Upload Failed", data.error || "Could not upload image.", "error");
      }
    } catch (err) {
      console.error("Image upload error", err);
      addToast("Upload Error", "Failed to upload image file.", "error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handlePdfFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      addToast("Invalid File Type", "Please choose a valid .pdf brochure document.", "warning");
      return;
    }

    setIsUploadingPdf(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setPBrochureUrl(data.url);
        addToast("Brochure Uploaded", "Product PDF brochure attached successfully.");
      } else {
        addToast("Upload Failed", data.error || "Could not upload brochure PDF.", "error");
      }
    } catch (err) {
      console.error("PDF upload error", err);
      addToast("Upload Error", "Failed to upload brochure file.", "error");
    } finally {
      setIsUploadingPdf(false);
    }
  };

  // Blog Form Fields
  const [bSlug, setBSlug] = useState("");
  const [bTitle, setBTitle] = useState("");
  const [bCategory, setBCategory] = useState<any>("Sleep Therapy");
  const [bAuthor, setBAuthor] = useState("");
  const [bReadTime, setBReadTime] = useState("");
  const [bImage, setBImage] = useState("");
  const [bExcerpt, setBExcerpt] = useState("");
  const [bContentText, setBContentText] = useState("");
  const [isUploadingBlogImage, setIsUploadingBlogImage] = useState(false);

  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBlogImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setBImage(data.url);
        addToast("Image Uploaded", "Article image attached successfully.");
      } else {
        addToast("Upload Failed", data.error || "Could not upload image.", "error");
      }
    } catch (err) {
      console.error("Blog image upload error", err);
      addToast("Upload Error", "Failed to upload article image.", "error");
    } finally {
      setIsUploadingBlogImage(false);
    }
  };

  useEffect(() => {
    if (!isAdminAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAdminAuthenticated, router]);

  if (!isAdminAuthenticated) return null;

  // Handlers for Product Form
  const handleOpenProductModal = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
      setPId(prod.id);
      setPName(prod.name);
      setPCategory(prod.category);
      const isActuallyOnRequest = !prod.price || prod.price <= 0;
      setPPrice(prod.price && prod.price > 0 ? prod.price.toString() : "");
      setPOriginalPrice(prod.originalPrice && prod.originalPrice > 0 ? prod.originalPrice.toString() : prod.price ? Math.round(prod.price * 1.35).toString() : "");
      setPImage(prod.image);
      setPDescription(prod.description || "");
      setPBadge(prod.badge || "");
      setPBrand(prod.brand || "Löwenstein Medical");
      setPSku(prod.sku || `SKU-${prod.id.toUpperCase()}`);
      setPInStock(prod.inStock !== false);
      setPIsFeatured(Boolean(prod.isFeatured));
      setPIsOffer(Boolean(prod.isOffer));
      if (isActuallyOnRequest) {
        setPPricingMode("on_request");
      } else if (isRentalProduct(prod)) {
        setPPricingMode("rental");
      } else {
        setPPricingMode("price");
      }
      setPFeaturesText((prod.features || []).join("\n"));
      setPSpecsText(
        (prod.specifications || [])
          .map((s) => `${s.label || s.key || "Spec"}: ${s.value}`)
          .join("\n")
      );
      setPBoxContentsText((prod.boxContents || []).join("\n"));
      setPWarranty(prod.warranty || "2 Years German Warranty");
      setPBrochureUrl(prod.brochureUrl || "");
    } else {
      setEditingProduct(null);
      const newId = `prod-${Date.now()}`;
      setPId(newId);
      setPName("");
      setPCategory("Ventilation & Sleep");
      setPPrice("45990");
      setPOriginalPrice("65000");
      setPImage("/images/pulmocare/pulmocare_prisma-smart.png");
      setPDescription("Clinical-grade respiratory device engineered in Germany.");
      setPBadge("CLINICAL GRADE");
      setPBrand("Löwenstein Medical");
      setPSku(`SKU-${Date.now().toString().slice(-6)}`);
      setPInStock(true);
      setPIsFeatured(true);
      setPIsOffer(false);
      setPPricingMode(isRentalCategory("Ventilation & Sleep") ? "rental" : "price");
      setPFeaturesText("High-performance clinical ventilation\nGerman precision engineering\nUltra-quiet operation (<26 dB)\nIntegrated humidification option");
      setPSpecsText("Operating Noise: 26 dB(A)\nPressure Range: 4 - 20 hPa\nWeight: 1.4 kg\nDimensions: 170 x 135 x 180 mm\nPower Supply: 100 - 240V AC");
      setPBoxContentsText("Main Device Unit\nPower Cord & Adapter\nAir Filter\nUser Manual (EN/DE)\nCarrying Bag");
      setPWarranty("2 Years German Manufacturer Warranty");
      setPBrochureUrl("/doc-files/sample_doc.pdf");
    }
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedFeatures = pFeaturesText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const parsedSpecs = pSpecsText
      .split("\n")
      .map((line) => {
        const parts = line.split(":");
        const label = parts[0]?.trim();
        const value = parts.slice(1).join(":").trim();
        if (label && value) {
          return { label, value };
        }
        return null;
      })
      .filter(Boolean) as { label: string; value: string }[];

    const parsedBoxContents = pBoxContentsText
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    const isPriceOnRequest = pPricingMode === "on_request";
    const numPrice = parseFloat(pPrice);
    const numOriginalPrice = parseFloat(pOriginalPrice);
    const finalPrice = isPriceOnRequest || isNaN(numPrice) || numPrice <= 0 ? undefined : numPrice;
    const finalOriginalPrice = isPriceOnRequest || isNaN(numOriginalPrice) || numOriginalPrice <= 0 ? undefined : numOriginalPrice;

    const prodObj: Product = {
      id: pId || `prod-${Date.now()}`,
      name: pName,
      category: pCategory as any,
      price: finalPrice,
      originalPrice: finalOriginalPrice,
      image: pImage || "/images/pulmocare/pulmocare_prisma-smart.png",
      rating: editingProduct?.rating || 5,
      reviewsCount: editingProduct?.reviewsCount || 4,
      inStock: pInStock,
      isFeatured: pIsFeatured,
      isOffer: pIsOffer,
      isRental: pPricingMode === "rental" || pPricingMode === "on_request",
      description: pDescription,
      badge: pBadge,
      brand: pBrand,
      sku: pSku,
      features: parsedFeatures,
      specifications: parsedSpecs,
      boxContents: parsedBoxContents,
      warranty: pWarranty,
      brochureUrl: pBrochureUrl,
    };

    try {
      if (editingProduct) {
        await updateProduct(prodObj);
        addToast("Product Updated", `Updated ${pName} in MongoDB Atlas.`);
      } else {
        await addProduct(prodObj);
        addToast("Product Created", `Added ${pName} to MongoDB Atlas.`);
      }
      setProductModalOpen(false);
    } catch (err: any) {
      addToast("Save Failed", err?.message || "Could not save product to MongoDB Atlas.", "error");
    }
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteProduct(id);
      addToast("Product Deleted", `Removed ${name} from inventory.`);
    }
  };

  // Handlers for Blog Form
  const handleOpenBlogModal = (blog?: BlogPost) => {
    if (blog) {
      setEditingBlog(blog);
      setBSlug(blog.slug);
      setBTitle(blog.title);
      setBCategory(blog.category);
      setBAuthor(blog.author);
      setBReadTime(blog.readTime);
      setBImage(blog.image || "/images/pulmocare/pulmocare_prisma-smart.png");
      setBExcerpt(blog.excerpt);
      setBContentText(
        Array.isArray(blog.content)
          ? blog.content.join("\n\n")
          : typeof blog.content === "string"
            ? blog.content
            : ""
      );
    } else {
      setEditingBlog(null);
      setBSlug(`clinical-guide-${Date.now()}`);
      setBTitle("");
      setBCategory("Sleep Therapy");
      setBAuthor("Dr. Aris Thorne, MD (Pulmonology)");
      setBReadTime("6 min read");
      setBImage("/images/pulmocare/pulmocare_prisma-smart.png");
      setBExcerpt("");
      setBContentText("");
    }
    setBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedContent = bContentText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);
    const finalContent = parsedContent.length > 0 ? parsedContent : [bContentText.trim()];

    const blogObj: any = {
      slug: bSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      title: bTitle,
      category: bCategory,
      author: bAuthor,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: bReadTime || "5 min read",
      image: bImage || "/images/pulmocare/pulmocare_prisma-smart.png",
      excerpt: bExcerpt,
      content: finalContent,
    };

    if (editingBlog) {
      updateBlogPost(blogObj);
      addToast("Article Updated", `Saved edits to ${bTitle}.`);
    } else {
      addBlogPost(blogObj);
      addToast("Article Published", `Published new clinical article ${bTitle}.`);
    }
    setBlogModalOpen(false);
  };

  const handleDeleteBlog = (slug: string, title: string) => {
    if (confirm(`Are you sure you want to delete article "${title}"?`)) {
      deleteBlogPost(slug);
      addToast("Article Deleted", `Removed article from blog portal.`);
    }
  };

  // Handlers for Review Form
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewObj: ReviewItem = {
      id: `rev-${Date.now()}`,
      productId: rProductId,
      productName: rProductName,
      author: rAuthor || "Verified Patient",
      rating: rRating,
      comment: rComment,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      status: "Approved",
    };

    addReview(reviewObj);
    addToast("Review Added", `Published review by ${rAuthor} for ${rProductName}.`);
    setReviewModalOpen(false);
  };

  const handleDeleteReview = (id: string, author: string) => {
    if (confirm(`Are you sure you want to delete review by ${author}?`)) {
      deleteReview(id);
      addToast("Review Deleted", `Removed review by ${author} from database.`);
    }
  };

  const handleDeleteInquiry = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete contact inquiry from ${name}?`)) {
      await deleteInquiry(id);
      addToast("Inquiry Deleted", `Removed inquiry from ${name} from database.`);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: string, name: string) => {
    await updateInquiryStatus(id, status);
    addToast("Status Updated", `Inquiry from ${name} updated to ${status}.`);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredBlogs = blogPosts.filter(
    (b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase())
  );

  const filteredReviews = reviews.filter(
    (r) =>
      r.productName.toLowerCase().includes(reviewSearch.toLowerCase()) ||
      r.author.toLowerCase().includes(reviewSearch.toLowerCase()) ||
      r.comment.toLowerCase().includes(reviewSearch.toLowerCase())
  );

  const filteredInquiries = inquiries.filter(
    (inq) =>
      inq.fullName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.city.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.device.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.inquiryType.toLowerCase().includes(inquirySearch.toLowerCase())
  );

  // Dynamic Real Dashboard Metrics & Analytics (Live MongoDB Atlas Data)
  const dashboardMetrics = useMemo(() => {
    // 1. On Delivery / Active In-Transit Orders
    const onDeliveryOrders = (orders || []).filter((o) => {
      const s = (o.orderStatus || "").toLowerCase();
      return (
        s === "on progress" ||
        s === "in transit" ||
        s === "on delivery" ||
        s === "dispatched" ||
        s === "pending"
      );
    });
    const onDeliveryCount = onDeliveryOrders.length;

    // 2. Success / Completed Deliveries
    const deliveredOrders = (orders || []).filter(
      (o) => (o.orderStatus || "").toLowerCase() === "delivered"
    );
    const deliveredCount = deliveredOrders.length;

    // 3. Real Revenue (Orders + Paid Bundles)
    const ordersRevenue = (orders || []).reduce(
      (sum, ord) => sum + (Number(ord.totalAmount) || 0),
      0
    );
    const existingOrderIds = new Set((orders || []).map((o) => o.orderId));
    const bundleRevenue = (bundles || [])
      .filter(
        (b) =>
          b.status === "paid" &&
          (!b.paymentDetails?.orderId || !existingOrderIds.has(b.paymentDetails.orderId))
      )
      .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
    const totalRevenue = ordersRevenue + bundleRevenue;

    // 4. Latest Active Shipment / Tracker Order
    const latestActiveOrder =
      (orders || []).find(
        (o) =>
          o.orderStatus === "On Progress" ||
          o.orderStatus === "In Transit" ||
          o.orderStatus === "Dispatched" ||
          o.orderStatus === "Pending"
      ) ||
      (orders || [])[0] ||
      null;

    // 5. Monthly Analytics (5 months dynamic rolling window)
    const months: Array<{
      monthKey: string;
      shortLabel: string;
      fullLabel: string;
      orderCount: number;
      deliveredCount: number;
      revenue: number;
    }> = [];

    const now = new Date();
    let anchorDate = now;
    if (orders && orders.length > 0) {
      const orderTimestamps = orders
        .map((o) => (o.createdAt ? new Date(o.createdAt).getTime() : 0))
        .filter((t) => !isNaN(t) && t > 0);
      if (orderTimestamps.length > 0) {
        const latestTime = Math.max(...orderTimestamps);
        if (latestTime > now.getTime()) {
          anchorDate = new Date(latestTime);
        }
      }
    }

    for (let i = 4; i >= 0; i--) {
      const d = new Date(anchorDate.getFullYear(), anchorDate.getMonth() - i, 1);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months.push({
        monthKey,
        shortLabel: d.toLocaleString("en-US", { month: "short" }),
        fullLabel: d.toLocaleString("en-US", { month: "long", year: "numeric" }),
        orderCount: 0,
        deliveredCount: 0,
        revenue: 0,
      });
    }

    // Distribute orders into months
    (orders || []).forEach((ord) => {
      let ordDate: Date | null = null;
      if (ord.createdAt) {
        const parsed = new Date(ord.createdAt);
        if (!isNaN(parsed.getTime())) ordDate = parsed;
      }
      if (!ordDate) ordDate = anchorDate;

      const key = `${ordDate.getFullYear()}-${String(ordDate.getMonth() + 1).padStart(2, "0")}`;
      const found = months.find((m) => m.monthKey === key);
      const target = found || months[months.length - 1];

      target.orderCount += 1;
      target.revenue += Number(ord.totalAmount) || 0;
      if ((ord.orderStatus || "").toLowerCase() === "delivered") {
        target.deliveredCount += 1;
      }
    });

    return {
      onDeliveryCount,
      deliveredCount,
      totalRevenue,
      latestActiveOrder,
      months,
      totalOrders: (orders || []).length,
    };
  }, [orders, bundles]);

  const activeAnalyticsMonthIndex = useMemo(() => {
    if (
      selectedAnalyticsMonthIndex !== null &&
      selectedAnalyticsMonthIndex >= 0 &&
      selectedAnalyticsMonthIndex < dashboardMetrics.months.length
    ) {
      return selectedAnalyticsMonthIndex;
    }
    const withOrders = dashboardMetrics.months.findIndex((m) => m.orderCount > 0);
    if (withOrders !== -1) {
      return dashboardMetrics.months.reduce(
        (bestIdx, m, idx, arr) => (m.orderCount >= arr[bestIdx].orderCount ? idx : bestIdx),
        dashboardMetrics.months.length - 1
      );
    }
    return dashboardMetrics.months.length - 1;
  }, [selectedAnalyticsMonthIndex, dashboardMetrics.months]);

  const activeAnalyticsMonthData =
    dashboardMetrics.months[activeAnalyticsMonthIndex] ||
    dashboardMetrics.months[dashboardMetrics.months.length - 1];

  return (
    <div className="min-h-screen bg-[#f6f4fb] text-[#12315c] font-inter flex relative">
      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="w-64 bg-white border-r border-[#e9edf4] p-6 flex flex-col justify-between relative z-10 h-full overflow-y-auto shadow-[0_30px_70px_rgba(24,42,65,0.14)]">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#f6f4fb]">
                <Link href="/" className="flex items-center gap-2">
                  <img src="/images/pulmocare/pulmocare_logo.png" alt="Pulmo Care Logo" className="h-7 w-auto object-contain" />
                </Link>
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-[#f6f4fb] text-[#64748B]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block px-3 mb-2">Main Menu</span>
                <button
                  onClick={() => { setActiveTab("dashboard"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "dashboard" ? "bg-[#dcebfb] text-[#2a6ecb]" : "text-[#64748B]"}`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => { setActiveTab("products"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "products" ? "bg-[#dcebfb] text-[#2a6ecb]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4" />
                    <span>Products Catalog</span>
                  </div>
                  <span className="bg-[#f6f4fb] text-[#2a6ecb] text-[10px] px-2 py-0.5 rounded-full font-mono">{products.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab("categories"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "categories" ? "bg-[#EBF5FF] text-[#0066FF]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4" />
                    <span>Categories Catalog</span>
                  </div>
                  <span className="bg-[#F1F5F9] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono">{categories.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab("blogs"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "blogs" ? "bg-[#dcebfb] text-[#2a6ecb]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4" />
                    <span>Clinical Blog</span>
                  </div>
                  <span className="bg-[#f6f4fb] text-[#2a6ecb] text-[10px] px-2 py-0.5 rounded-full font-mono">{blogPosts.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab("reviews"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "reviews" ? "bg-[#dcebfb] text-[#2a6ecb]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-[#f2b134] fill-[#f2b134]" />
                    <span>Customer Reviews</span>
                  </div>
                  <span className="bg-[#f6f4fb] text-[#2a6ecb] text-[10px] px-2 py-0.5 rounded-full font-mono">{reviews.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab("tracking"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "tracking" ? "bg-[#dcebfb] text-[#2a6ecb]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4" />
                    <span>Tracking &amp; Orders</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    activeTab === "tracking" ? "bg-[#2a6ecb] text-white" : "bg-[#f6f4fb] text-[#2a6ecb]"
                  }`}>
                    {orders.length}
                  </span>
                </button>
                <button
                  onClick={() => { setActiveTab("messages"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "messages" ? "bg-[#dcebfb] text-[#2a6ecb]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquiries &amp; Support</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-[#2a6ecb] text-white text-[10px] flex items-center justify-center font-bold">4</span>
                </button>
                <button
                  onClick={() => { setActiveTab("sleep-studies"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "sleep-studies" ? "bg-[#0066FF] text-white shadow-xs" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4" />
                    <span>Sleep Study Bookings</span>
                  </div>
                  <span className="bg-[#EBF5FF] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">{sleepStudyBookings.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab("bundles"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "bundles" ? "bg-[#0066FF] text-white shadow-xs" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <PackagePlus className="w-4 h-4" />
                    <span>Bundle Maker</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${activeTab === "bundles" ? "bg-white/20 text-white" : "bg-[#EBF5FF] text-[#0066FF]"}`}>
                    {bundles.length}
                  </span>
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block px-3 mb-2">Others</span>
                <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#f7f6fb]">
                  <Layers className="w-4 h-4" />
                  <span>Hospital Units</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#f7f6fb]">
                  <Users className="w-4 h-4" />
                  <span>Team Members</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#f7f6fb]">
                  <Settings className="w-4 h-4" />
                  <span>System Setup</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* 1. LEFT SIDEBAR (Desktop) */}
      <aside className="w-64 bg-white border-r border-[#e9edf4] p-6 flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#f6f4fb]">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/pulmocare/pulmocare_logo.png"
                alt="Pulmo Care Logo"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <button className="p-1 rounded-lg hover:bg-[#f6f4fb] text-[#64748B]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block px-3 mb-2">
              Main Menu
            </span>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-[#dcebfb] text-[#2a6ecb] shadow-xs"
                  : "text-[#64748B] hover:bg-[#f7f6fb] hover:text-[#2a6ecb]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#dcebfb] text-[#2a6ecb] shadow-xs"
                  : "text-[#64748B] hover:bg-[#f7f6fb] hover:text-[#2a6ecb]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Products Catalog</span>
              </div>
              <span className="bg-[#f6f4fb] text-[#2a6ecb] text-[10px] px-2 py-0.5 rounded-full font-mono">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "categories"
                  ? "bg-[#EBF5FF] text-[#0066FF] shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Categories Catalog</span>
              </div>
              <span className="bg-[#F1F5F9] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono">{categories.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-[#dcebfb] text-[#2a6ecb] shadow-xs"
                  : "text-[#64748B] hover:bg-[#f7f6fb] hover:text-[#2a6ecb]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Clinical Blog</span>
              </div>
              <span className="bg-[#f6f4fb] text-[#2a6ecb] text-[10px] px-2 py-0.5 rounded-full font-mono">{blogPosts.length}</span>
            </button>

            {/* CUSTOMER REVIEWS TAB */}
            <button
              onClick={() => setActiveTab("reviews")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "reviews"
                  ? "bg-[#dcebfb] text-[#2a6ecb] shadow-xs"
                  : "text-[#64748B] hover:bg-[#f7f6fb] hover:text-[#2a6ecb]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-[#f2b134] fill-[#f2b134]" />
                <span>Customer Reviews</span>
              </div>
              <span className="bg-[#f6f4fb] text-[#2a6ecb] text-[10px] px-2 py-0.5 rounded-full font-mono">{reviews.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("tracking")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "tracking"
                  ? "bg-[#dcebfb] text-[#2a6ecb] shadow-xs"
                  : "text-[#64748B] hover:bg-[#f7f6fb] hover:text-[#2a6ecb]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4" />
                <span>Tracking &amp; Orders</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === "tracking" ? "bg-[#2a6ecb] text-white" : "bg-[#f6f4fb] text-[#2a6ecb]"
              }`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "messages"
                  ? "bg-[#dcebfb] text-[#2a6ecb] shadow-xs"
                  : "text-[#64748B] hover:bg-[#f7f6fb] hover:text-[#2a6ecb]"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Inquiries &amp; Support</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-[#2a6ecb] text-white text-[10px] flex items-center justify-center font-bold">4</span>
            </button>

            <button
              onClick={() => setActiveTab("sleep-studies")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "sleep-studies"
                  ? "bg-[#0066FF] text-white shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Sleep Study Bookings</span>
              </div>
              <span className="bg-[#EBF5FF] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                {sleepStudyBookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("bundles")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "bundles"
                  ? "bg-[#0066FF] text-white shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <PackagePlus className="w-4 h-4" />
                <span>Bundle Maker</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === "bundles" ? "bg-white/20 text-white" : "bg-[#EBF5FF] text-[#0066FF]"
              }`}>
                {bundles.length}
              </span>
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block px-3 mb-2">
              Others
            </span>

            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#f7f6fb]">
              <Layers className="w-4 h-4" />
              <span>Hospital Units</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#f7f6fb]">
              <Users className="w-4 h-4" />
              <span>Team Members</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#f7f6fb]">
              <Settings className="w-4 h-4" />
              <span>System Setup</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#e9edf4] px-4 md:px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 w-full max-w-sm">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl border border-[#e9edf4] bg-white text-[#12315c]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search deliveries, devices..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[#e9edf4] bg-white text-xs text-[#12315c] focus:border-[#2a6ecb] transition-all font-inter"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Interactive Notification Center */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationPanelOpen((prev) => !prev)}
                className={`p-2 rounded-full border transition-all relative cursor-pointer ${
                  notificationPanelOpen
                    ? "bg-[#EBF5FF] border-[#2a6ecb] text-[#2a6ecb] shadow-xs"
                    : "border-[#e9edf4] bg-white hover:bg-[#f7f6fb] text-[#64748B]"
                }`}
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#dc4b56] text-white text-[10px] font-archivo font-extrabold flex items-center justify-center shadow-xs">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {notificationPanelOpen && (
                <>
                  {/* Backdrop for click away on all screens */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationPanelOpen(false)}
                  />

                  <div className="absolute right-0 mt-2 w-[90vw] sm:w-[420px] max-w-[440px] bg-white rounded-3xl border border-[#e9edf4] shadow-[0_20px_60px_rgba(24,42,65,0.18)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-[#F8FAFC] to-white border-b border-[#F1F5F9] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#EBF5FF] text-[#0066FF] flex items-center justify-center">
                          <Bell className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-archivo font-extrabold text-sm text-[#0A192F]">
                            Notifications
                          </h4>
                          <p className="text-[10px] text-[#64748B]">
                            {unreadCount} unread • {allNotifications.length} total events
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                          <button
                            type="button"
                            onClick={markAllNotificationsAsRead}
                            className="text-[11px] font-archivo font-bold text-[#0066FF] hover:underline cursor-pointer"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setNotificationPanelOpen(false)}
                          className="p-1 rounded-lg hover:bg-[#F1F5F9] text-[#64748B] cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="px-3 py-2 bg-[#F8FAFC] border-b border-[#F1F5F9] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                      {[
                        { id: "all", label: "All", count: allNotifications.length },
                        { id: "inquiry", label: "Inquiries", count: allNotifications.filter((n) => n.category === "inquiry").length },
                        { id: "order", label: "Orders", count: allNotifications.filter((n) => n.category === "order").length },
                        { id: "bundle", label: "Bundles", count: allNotifications.filter((n) => n.category === "bundle").length },
                        { id: "sleep", label: "Sleep Study", count: allNotifications.filter((n) => n.category === "sleep").length },
                        { id: "inventory", label: "Stock Alerts", count: allNotifications.filter((n) => n.category === "inventory").length },
                      ].map((cat) => {
                        const active = notificationCategoryFilter === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setNotificationCategoryFilter(cat.id)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-archivo font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                              active
                                ? "bg-[#0066FF] text-white shadow-2xs"
                                : "bg-white text-[#64748B] hover:text-[#0A192F] border border-[#E2E8F0]"
                            }`}
                          >
                            <span>{cat.label}</span>
                            <span
                              className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
                                active ? "bg-white/25 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                              }`}
                            >
                              {cat.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Notification Items List */}
                    <div className="max-h-[380px] overflow-y-auto divide-y divide-[#F1F5F9]">
                      {filteredNotifications.length === 0 ? (
                        <div className="p-8 text-center text-[#64748B]">
                          <Bell className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2 opacity-60" />
                          <p className="text-xs font-bold font-archivo text-[#0A192F]">No notifications here</p>
                          <p className="text-[11px] text-[#94A3B8] mt-0.5">Everything is up to date in this category.</p>
                        </div>
                      ) : (
                        filteredNotifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              markNotificationAsRead(notif.id);
                              setActiveTab(notif.targetTab as any);
                              setNotificationPanelOpen(false);
                            }}
                            className={`p-3.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer flex items-start gap-3 text-left ${
                              notif.unread ? "bg-[#F0F7FF]/50" : "bg-white"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                notif.unread ? "bg-[#0066FF]" : "bg-transparent"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${notif.badgeColor}`}>
                                  {notif.categoryLabel}
                                </span>
                                <span className="text-[10px] text-[#94A3B8] font-medium shrink-0">
                                  {notif.timeAgo}
                                </span>
                              </div>
                              <h5 className="font-archivo font-bold text-xs text-[#0A192F] line-clamp-1">
                                {notif.title}
                              </h5>
                              <p className="text-[11px] text-[#64748B] line-clamp-2 mt-0.5">
                                {notif.description}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#CBD5E1] shrink-0 mt-2" />
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 bg-[#F8FAFC] border-t border-[#F1F5F9] text-center">
                      <span className="text-[10px] text-[#64748B] font-medium">
                        Click any notification to open its respective admin management tab.
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-[#e9edf4]">
              <div className="w-8 h-8 rounded-full bg-[#2a6ecb] text-white flex items-center justify-center font-bold text-xs">
                P
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-[#12315c] block">Welcome, {adminUser?.name || "Jane"}</span>
                <span className="text-[10px] text-[#64748B]">Super Administrator</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/admin/login");
                }}
                className="p-1.5 rounded-lg hover:bg-[#fbe6ee] text-[#64748B] hover:text-[#dc4b56] transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-8 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-archivo font-semibold text-2xl md:text-3xl text-[#182a41] tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-xs text-[#64748B]">Real-time hospital equipment distribution &amp; inventory performance.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenProductModal()}
                    className="px-5 py-2 rounded-full bg-[#2a6ecb] hover:bg-[#2a6ecb] text-white font-archivo font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ New Device</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 3 Real Metric Cards */}
                <div className="lg:col-span-3 space-y-5">
                  {/* Card 1: On Delivery */}
                  <div className="bg-white rounded-[20px] p-5 border border-[#e9edf4] shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Truck className="w-4 h-4 text-[#2a6ecb]" />
                        On Delivery
                      </span>
                      <span className="text-[#1fb37a] font-bold text-[11px] flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        {dashboardMetrics.totalOrders > 0
                          ? `${Math.round((dashboardMetrics.onDeliveryCount / dashboardMetrics.totalOrders) * 100)}%`
                          : "0%"}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-archivo font-semibold text-3xl text-[#182a41]">
                        {dashboardMetrics.onDeliveryCount.toLocaleString("en-IN")}
                      </h3>
                      <p className="text-[11px] text-[#64748b]">
                        {dashboardMetrics.totalOrders > 0
                          ? `${dashboardMetrics.onDeliveryCount} of ${dashboardMetrics.totalOrders} orders active`
                          : "Active dispatches in transit"}
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Success Deliveries */}
                  <div className="bg-white rounded-[20px] p-5 border border-[#e9edf4] shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <CheckCircle className="w-4 h-4 text-[#2a6ecb]" />
                        Success Deliveries
                      </span>
                      <span className="text-[#1fb37a] font-bold text-[11px] flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        {dashboardMetrics.totalOrders > 0
                          ? `${Math.round((dashboardMetrics.deliveredCount / dashboardMetrics.totalOrders) * 100)}%`
                          : "100%"}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-archivo font-semibold text-3xl text-[#182a41]">
                        {dashboardMetrics.deliveredCount.toLocaleString("en-IN")}
                      </h3>
                      <p className="text-[11px] text-[#64748b]">
                        {dashboardMetrics.deliveredCount} fulfilled out of {dashboardMetrics.totalOrders} logged
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Revenue */}
                  <div className="bg-white rounded-[20px] p-5 border border-[#e9edf4] shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Tag className="w-4 h-4 text-[#2a6ecb]" />
                        Revenue
                      </span>
                      <span className="text-[#1fb37a] font-bold text-[11px] flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> Live Atlas
                      </span>
                    </div>

                    <div>
                      <h3 className="font-archivo font-semibold text-3xl text-[#182a41]">
                        ₹{dashboardMetrics.totalRevenue.toLocaleString("en-IN")}
                      </h3>
                      <p className="text-[11px] text-[#64748b]">
                        From {dashboardMetrics.totalOrders} customer order{dashboardMetrics.totalOrders === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center: Dynamic Delivery Analytics Bar Chart */}
                <div className="lg:col-span-5 bg-white rounded-[20px] p-6 border border-[#e9edf4] shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-6">
                  <div className="flex items-center justify-between border-b border-[#f6f4fb] pb-4">
                    <div>
                      <h3 className="font-archivo font-bold text-lg text-[#182a41]">Delivery Analytics</h3>
                      <p className="text-[11px] text-[#64748b]">Real order throughput &amp; delivery progression</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#dcebfb] text-[#2a6ecb] px-2.5 py-1 rounded-full border border-[#2a6ecb]/20">
                      {dashboardMetrics.totalOrders} Total Orders
                    </span>
                  </div>

                  <div className="h-64 flex items-end justify-between gap-3 pt-6 px-4 relative border-b border-[#f6f4fb]">
                    {/* Dynamic Tooltip pinned to selected month */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-[#182a41] text-white p-2.5 rounded-xl text-[11px] shadow-xl z-10 space-y-1 font-mono border border-slate-700 pointer-events-none transition-all">
                      <div className="text-[10px] text-[#94a3b8] flex items-center justify-between gap-3">
                        <span>{activeAnalyticsMonthData.fullLabel}</span>
                        <span className="text-emerald-400 font-bold uppercase text-[9px]">Live Data</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 font-bold">
                          <span className="w-2 h-2 rounded-full bg-[#2a6ecb]" />
                          {activeAnalyticsMonthData.orderCount} Order{activeAnalyticsMonthData.orderCount === 1 ? "" : "s"}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-[#38bdf8] font-archivo font-bold">
                          ₹{activeAnalyticsMonthData.revenue.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* 5 Dynamic Rolling Months */}
                    {dashboardMetrics.months.map((m, idx) => {
                      const isSelected = idx === activeAnalyticsMonthIndex;
                      const maxOrders = Math.max(1, ...dashboardMetrics.months.map((item) => item.orderCount));
                      const heightPercent = m.orderCount > 0 ? Math.max(30, Math.round((m.orderCount / maxOrders) * 85)) : 16;

                      return (
                        <div
                          key={m.monthKey}
                          onClick={() => setSelectedAnalyticsMonthIndex(idx)}
                          onMouseEnter={() => setSelectedAnalyticsMonthIndex(idx)}
                          className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                        >
                          <div className="w-full flex items-end justify-center h-44">
                            <div
                              style={{ height: `${heightPercent}%` }}
                              className={`w-full rounded-xl transition-all duration-300 relative ${
                                isSelected
                                  ? "bg-[#2a6ecb] shadow-lg shadow-[#2a6ecb]/30 ring-2 ring-[#2a6ecb]/30"
                                  : "bg-[#f6f4fb] group-hover:bg-[#dcebfb]"
                              }`}
                            >
                              {m.orderCount > 0 && (
                                <span
                                  className={`absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                                    isSelected ? "bg-[#182a41] text-white" : "bg-slate-200 text-[#182a41]"
                                  }`}
                                >
                                  {m.orderCount}
                                </span>
                              )}
                            </div>
                          </div>
                          <span
                            className={`text-xs transition-colors ${
                              isSelected
                                ? "font-bold text-[#2a6ecb]"
                                : "font-medium text-[#64748b] group-hover:text-[#182a41]"
                            }`}
                          >
                            {m.shortLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Dynamic Live Shipment Route Box */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-[20px] p-5 border border-[#e9edf4] shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-4">
                    <div className="w-full h-36 bg-gradient-to-br from-[#f6f9fe] to-[#eef4fc] rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-4 border border-[#e9edf4]">
                      <div className="relative z-10 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs text-xs font-bold text-[#182a41] mb-2 border border-[#e9edf4]">
                        <MapPin className="w-3.5 h-3.5 text-[#dc4b56]" />
                        <span>Live Shipment Route</span>
                      </div>

                      {dashboardMetrics.latestActiveOrder ? (
                        <div className="relative z-10 w-full text-center space-y-1">
                          <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-[#182a41]">
                            <span className="truncate max-w-[100px]">Pulmo Care HQ</span>
                            <span className="text-[#2a6ecb] font-mono">➔</span>
                            <span className="truncate max-w-[120px] text-[#2a6ecb]">
                              {dashboardMetrics.latestActiveOrder.city || "Destination"}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#64748b] truncate">
                            {dashboardMetrics.latestActiveOrder.customerName} • {dashboardMetrics.latestActiveOrder.state || "IN"}
                          </p>
                        </div>
                      ) : (
                        <p className="text-[11px] text-[#64748b] relative z-10">No dispatches in transit</p>
                      )}

                      {/* Visual grid pattern */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2a6ecb_1px,transparent_1px)] [background-size:12px_12px]" />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#64748b] block">Tracker ID</span>
                      <div className="flex items-center justify-between mt-0.5">
                        <h4 className="font-archivo font-semibold text-lg text-[#182a41] truncate max-w-[190px]">
                          {dashboardMetrics.latestActiveOrder?.orderId || "NO-ORDERS"}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                            dashboardMetrics.latestActiveOrder?.orderStatus === "Delivered"
                              ? "bg-[#e0f3ec] text-[#1fb37a]"
                              : dashboardMetrics.latestActiveOrder?.orderStatus === "Cancelled"
                              ? "bg-[#fbe6ee] text-[#dc4b56]"
                              : "bg-[#fdeadf] text-[#e8a33d]"
                          }`}
                        >
                          {dashboardMetrics.latestActiveOrder?.orderStatus || "Idle"}
                        </span>
                      </div>
                    </div>

                    {dashboardMetrics.latestActiveOrder && (
                      <button
                        onClick={() => setActiveTab("tracking")}
                        className="w-full py-2 px-3 rounded-xl bg-[#f7f6fb] hover:bg-[#dcebfb] text-[#2a6ecb] font-archivo font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>View in Tracking &amp; Fulfillment</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[20px] p-6 border border-[#e9edf4] shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-archivo font-bold text-lg text-[#182a41]">Live Website Orders &amp; Tracking Data</h3>
                    <p className="text-xs text-[#64748B]">Real-time customer checkout orders submitted via the storefront, stored in MongoDB Atlas.</p>
                  </div>
                  <span className="bg-[#dcebfb] text-[#2a6ecb] font-archivo font-semibold text-xs px-3.5 py-1.5 rounded-full border border-[#2a6ecb]/20">
                    {orders.length} Orders Logged
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-inter border-collapse">
                    <thead>
                      <tr className="bg-[#f7f6fb] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#e9edf4]">
                        <th className="py-3 px-4">Order ID &amp; Customer</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Destination &amp; Address</th>
                        <th className="py-3 px-4">Purchased Items</th>
                        <th className="py-3 px-4">Total (₹) &amp; Payment</th>
                        <th className="py-3 px-4 text-right">Status &amp; Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f6f4fb]">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-[#64748B]">
                            <Truck className="w-8 h-8 mx-auto text-[#CBD5E1] mb-2" />
                            <p className="font-archivo font-bold text-sm text-[#182a41]">No Orders Logged Yet</p>
                            <p className="text-xs text-[#64748B] mt-0.5">
                              Customer purchases from the storefront and paid custom bundles will appear here in real time.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        orders.map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-[#f7f6fb] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#2a6ecb]">
                            <span>{ord.orderId}</span>
                            <span className="font-sans font-bold text-[#182a41] block text-xs mt-0.5">{ord.customerName}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <a href={`tel:${ord.phone}`} className="text-[#2a6ecb] font-mono text-[11px] hover:underline block font-bold">
                              {ord.phone}
                            </a>
                            <span className="text-[10px] text-[#64748b] block">{ord.email}</span>
                          </td>
                          <td className="py-3.5 px-4 text-[#64748b] max-w-xs">
                            <span className="font-bold text-[#182a41] block">{ord.city}, {ord.state}</span>
                            <span className="text-[10px] text-[#64748B] line-clamp-1">{ord.street} ({ord.pincode})</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-1">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <img src={it.image} alt={it.name} className="w-6 h-6 object-contain rounded bg-white p-0.5 border" />
                                  <span className="font-semibold text-[#182a41] text-[11px] line-clamp-1">{it.name} × {it.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-archivo font-semibold text-[#182a41] block">₹{ord.totalAmount.toLocaleString("en-IN")}.00</span>
                            <span className="text-[10px] text-[#2a6ecb] font-bold block">{ord.paymentMethod}</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                ord.orderStatus === "Delivered"
                                  ? "bg-[#e0f3ec] text-emerald-800"
                                  : ord.orderStatus === "Cancelled"
                                  ? "bg-[#fbe6ee] text-rose-800"
                                  : "bg-[#fdeadf] text-[#e8a33d]"
                              }`}>
                                {ord.orderStatus}
                              </span>
                              {ord.orderStatus !== "Delivered" && (
                                <button
                                  onClick={async () => {
                                    await updateOrderStatus(ord.orderId, "Delivered");
                                    addToast("Order Status Updated", `Order ${ord.orderId} marked as Delivered.`);
                                  }}
                                  className="px-2 py-1 rounded-lg bg-[#e0f3ec] text-[#1fb37a] font-bold text-[10px] hover:bg-[#1fb37a] hover:text-white transition-colors cursor-pointer"
                                >
                                  Mark Delivered
                                </button>
                              )}
                              <button
                                onClick={async () => {
                                  if (confirm(`Delete order ${ord.orderId}?`)) {
                                    await deleteOrder(ord.orderId);
                                    addToast("Order Deleted", `Removed order ${ord.orderId} from MongoDB Atlas.`);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-[#fbe6ee] text-[#dc4b56] hover:bg-[#dc4b56] hover:text-white transition-colors cursor-pointer"
                                title="Delete Order"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT (CRUD) */}
          {activeTab === "products" && (
            <div className="bg-white rounded-[20px] border border-[#e9edf4] p-6 md:p-8 shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#f6f4fb]">
                <div>
                  <h2 className="font-archivo font-semibold text-2xl text-[#182a41]">Products Catalog Management</h2>
                  <p className="text-xs text-[#64748B]">Create, edit, or remove medical hardware devices from your inventory.</p>
                </div>

                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-5 py-2.5 rounded-full bg-[#2a6ecb] hover:bg-[#2a6ecb] text-white font-archivo font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#12315c] focus:border-[#2a6ecb]"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-inter border-collapse">
                  <thead>
                    <tr className="bg-[#f7f6fb] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#e9edf4]">
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f6f4fb]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#f7f6fb] transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-[#e9edf4] p-1 flex items-center justify-center shrink-0">
                            <img src={p.image} alt={p.name} className="max-h-8 max-w-full object-contain mix-blend-multiply" />
                          </div>
                          <div>
                            <span className="font-bold text-[#182a41] block">{p.name}</span>
                            <span className="text-[10px] text-[#64748b] font-mono">{p.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#64748B] font-medium">{p.category}</td>
                        <td className="py-3 px-4 font-bold text-[#182a41]">
                          <span className="block">{p.price ? `₹${p.price.toLocaleString("en-IN")}` : "On Request"}</span>
                          {isRentalProduct(p) && (
                            <span className="bg-[#EBF5FF] text-[#2a6ecb] px-2 py-0.5 rounded-full text-[10px] font-bold inline-block mt-1">
                              + Rental
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-[#e0f3ec] text-[#1fb37a] px-2 py-0.5 rounded-full text-[10px] font-bold">
                            In Stock
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenProductModal(p)}
                              className="p-1.5 rounded-lg bg-[#dcebfb] text-[#2a6ecb] hover:bg-[#2a6ecb] hover:text-white transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 rounded-lg bg-[#fbe6ee] text-[#dc4b56] hover:bg-[#dc4b56] hover:text-white transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: CATEGORIES MANAGEMENT (CRUD) */}
          {activeTab === "categories" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <h2 className="font-archivo font-extrabold text-2xl text-[#0F172A]">Categories Catalog Management</h2>
                  <p className="text-xs text-[#64748B]">Create new medical equipment categories that immediately appear on the storefront homepage and navigation menus.</p>
                </div>

                <button
                  onClick={() => handleOpenCategoryModal()}
                  className="px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              {/* Categories Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => {
                  const matchingProds = products.filter(
                    (p) =>
                      p.category === cat.name ||
                      p.category.toLowerCase().includes(cat.name.toLowerCase()) ||
                      cat.name.toLowerCase().includes(p.category.toLowerCase())
                  ).length;

                  return (
                    <div
                      key={cat.id}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-white px-3 py-1 rounded-full text-[11px] font-bold text-[#0066FF] border border-[#E2E8F0]">
                            {matchingProds} Products
                          </span>
                          {cat.badge && (
                            <span className="bg-[#0066FF] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                              {cat.badge}
                            </span>
                          )}
                        </div>

                        <div className="w-full h-32 bg-white rounded-2xl p-2 border border-[#E2E8F0] flex items-center justify-center mb-3">
                          <img src={cat.image} alt={cat.name} className="max-h-28 max-w-full object-contain" />
                        </div>

                        <h4 className="font-archivo font-bold text-base text-[#0F172A] leading-tight mb-1">
                          {cat.name}
                        </h4>
                        <span className="text-[11px] font-mono text-[#0066FF] block mb-2">/{cat.slug}</span>
                        <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">{cat.desc}</p>
                      </div>

                      <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenCategoryModal(cat)}
                          className="p-2 rounded-xl bg-blue-50 text-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-colors cursor-pointer"
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete category "${cat.name}"?`)) {
                              await deleteCategory(cat.id);
                              addToast("Category Deleted", `Removed category "${cat.name}" from MongoDB Atlas.`);
                            }
                          }}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: BLOG POSTS MANAGEMENT (CRUD) */}
          {activeTab === "blogs" && (
            <div className="bg-white rounded-[20px] border border-[#e9edf4] p-6 md:p-8 shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#f6f4fb]">
                <div>
                  <h2 className="font-archivo font-semibold text-2xl text-[#182a41]">Clinical Blog Articles</h2>
                  <p className="text-xs text-[#64748B]">Publish, update, or remove medical insights.</p>
                </div>

                <button
                  onClick={() => handleOpenBlogModal()}
                  className="px-5 py-2.5 rounded-full bg-[#2a6ecb] hover:bg-[#2a6ecb] text-white font-archivo font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Article</span>
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles by title or topic..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#12315c] focus:border-[#2a6ecb]"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-inter border-collapse">
                  <thead>
                    <tr className="bg-[#f7f6fb] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#e9edf4]">
                      <th className="py-3 px-4">Article Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Author</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f6f4fb]">
                    {filteredBlogs.map((b) => (
                      <tr key={b.slug} className="hover:bg-[#f7f6fb] transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#182a41] block line-clamp-1">{b.title}</span>
                          <span className="text-[10px] text-[#64748b] font-mono">/blog/{b.slug}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-[#2a6ecb] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                            {b.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#64748B] font-medium">{b.author.split(",")[0]}</td>
                        <td className="py-3 px-4 text-[#64748B]">{b.date}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenBlogModal(b)}
                              className="p-1.5 rounded-lg bg-[#dcebfb] text-[#2a6ecb] hover:bg-[#2a6ecb] hover:text-white transition-colors cursor-pointer"
                              title="Edit article"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.slug, b.title)}
                              className="p-1.5 rounded-lg bg-[#fbe6ee] text-[#dc4b56] hover:bg-[#dc4b56] hover:text-white transition-colors cursor-pointer"
                              title="Delete article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMER REVIEWS MANAGEMENT (CRUD) */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-[20px] border border-[#e9edf4] p-6 md:p-8 shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#f6f4fb]">
                <div>
                  <h2 className="font-archivo font-semibold text-2xl text-[#182a41]">Customer Reviews Moderation</h2>
                  <p className="text-xs text-[#64748B]">Read, approve, or delete patient and clinical reviews reflecting on product pages.</p>
                </div>

                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#2a6ecb] hover:bg-[#2a6ecb] text-white font-archivo font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              {/* Review Stat Summary Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f7f6fb] rounded-2xl p-4 border border-[#e9edf4]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase block">Total Reviews</span>
                  <span className="font-archivo font-semibold text-2xl text-[#182a41]">{reviews.length}</span>
                </div>
                <div className="bg-[#f7f6fb] rounded-2xl p-4 border border-[#e9edf4]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase block">Average Satisfaction</span>
                  <span className="font-archivo font-semibold text-2xl text-[#f2b134] flex items-center gap-1">
                    5.0 <Star className="w-5 h-5 fill-[#f2b134] inline" />
                  </span>
                </div>
                <div className="bg-[#f7f6fb] rounded-2xl p-4 border border-[#e9edf4]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase block">Status</span>
                  <span className="font-archivo font-semibold text-2xl text-[#1fb37a]">100% Approved</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search reviews by reviewer name, product, or comment..."
                  value={reviewSearch}
                  onChange={(e) => setReviewSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#12315c] focus:border-[#2a6ecb]"
                />
              </div>

              {/* Reviews Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-inter border-collapse">
                  <thead>
                    <tr className="bg-[#f7f6fb] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#e9edf4]">
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Reviewer</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Comment</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f6f4fb]">
                    {filteredReviews.map((r) => (
                      <tr key={r.id} className="hover:bg-[#f7f6fb] transition-colors">
                        <td className="py-3 px-4 font-bold text-[#2a6ecb]">{r.productName}</td>
                        <td className="py-3 px-4 font-medium text-[#182a41]">{r.author}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-0.5 text-[#f2b134]">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#f2b134]" />
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#64748b] max-w-xs truncate">"{r.comment}"</td>
                        <td className="py-3 px-4 text-[#64748B]">{r.date}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {r.status === "Pending" && (
                              <button
                                onClick={() => approveReview(r.id)}
                                className="p-1.5 rounded-lg bg-[#e0f3ec] text-[#1fb37a] hover:bg-[#1fb37a] hover:text-white transition-colors cursor-pointer"
                                title="Approve Review"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteReview(r.id, r.author)}
                              className="p-1.5 rounded-lg bg-[#fbe6ee] text-[#dc4b56] hover:bg-[#dc4b56] hover:text-white transition-colors cursor-pointer"
                              title="Delete Review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: TRACKING & ORDER MANAGEMENT */}
          {activeTab === "tracking" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header */}
              <div className="bg-white rounded-[20px] border border-[#e9edf4] p-6 md:p-8 shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#f6f4fb]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#dcebfb] text-[#2a6ecb] font-archivo font-bold text-xs uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Fulfillment &amp; Logistics</span>
                      </span>
                    </div>
                    <h2 className="font-archivo font-semibold text-2xl md:text-3xl text-[#182a41] tracking-tight">
                      Tracking &amp; Orders Fulfillment
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      Real-time customer storefront orders, hospital equipment dispatch, and delivery progression stored in MongoDB Atlas.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="bg-[#dcebfb] text-[#2a6ecb] font-archivo font-semibold text-xs px-3.5 py-1.5 rounded-full border border-[#2a6ecb]/20">
                      {orders.length} Orders Logged
                    </span>
                  </div>
                </div>

                {/* 4 Overview Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#f7f6fb] p-4.5 rounded-2xl border border-[#e9edf4]">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="font-bold uppercase text-[10px] tracking-wider">Total Orders</span>
                      <Package className="w-4 h-4 text-[#2a6ecb]" />
                    </div>
                    <h3 className="font-archivo font-bold text-2xl text-[#182a41] mt-1.5">
                      {orders.length}
                    </h3>
                    <p className="text-[10px] text-[#64748B]">All registered purchases</p>
                  </div>

                  <div className="bg-[#f7f6fb] p-4.5 rounded-2xl border border-[#e9edf4]">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="font-bold uppercase text-[10px] tracking-wider">Pending Action</span>
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="font-archivo font-bold text-2xl text-amber-600 mt-1.5">
                      {orders.filter((o) => o.orderStatus === "Pending").length}
                    </h3>
                    <p className="text-[10px] text-amber-700">Awaiting dispatch</p>
                  </div>

                  <div className="bg-[#f7f6fb] p-4.5 rounded-2xl border border-[#e9edf4]">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="font-bold uppercase text-[10px] tracking-wider">In Transit</span>
                      <Truck className="w-4 h-4 text-[#2a6ecb]" />
                    </div>
                    <h3 className="font-archivo font-bold text-2xl text-[#2a6ecb] mt-1.5">
                      {orders.filter((o) => o.orderStatus === "On Progress" || o.orderStatus === "On Delivery" || o.orderStatus === "Dispatched").length}
                    </h3>
                    <p className="text-[10px] text-[#2a6ecb]">Out for delivery</p>
                  </div>

                  <div className="bg-[#f7f6fb] p-4.5 rounded-2xl border border-[#e9edf4]">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="font-bold uppercase text-[10px] tracking-wider">Delivered</span>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="font-archivo font-bold text-2xl text-emerald-600 mt-1.5">
                      {orders.filter((o) => o.orderStatus === "Delivered").length}
                    </h3>
                    <p className="text-[10px] text-emerald-700">Completed shipments</p>
                  </div>
                </div>

                {/* Filter Tabs & Search Bar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {[
                      { key: "all", label: "All Orders", count: orders.length },
                      { key: "Pending", label: "Pending", count: orders.filter((o) => o.orderStatus === "Pending").length },
                      { key: "On Progress", label: "In Transit", count: orders.filter((o) => o.orderStatus === "On Progress" || o.orderStatus === "On Delivery" || o.orderStatus === "Dispatched").length },
                      { key: "Delivered", label: "Delivered", count: orders.filter((o) => o.orderStatus === "Delivered").length },
                      { key: "Cancelled", label: "Cancelled", count: orders.filter((o) => o.orderStatus === "Cancelled").length },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setOrderStatusFilter(tab.key)}
                        className={`px-3 py-1.5 rounded-xl font-archivo font-bold text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          orderStatusFilter === tab.key
                            ? "bg-[#2a6ecb] text-white shadow-xs"
                            : "bg-[#f7f6fb] text-[#64748B] hover:bg-[#e9edf4] hover:text-[#182a41]"
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                          orderStatusFilter === tab.key ? "bg-white/25 text-white" : "bg-[#e2e8f0] text-[#64748B]"
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="w-full md:w-72 relative">
                    <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="Search order ID, client, city..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f7f6fb] border border-[#e9edf4] text-xs text-[#182a41] focus:outline-none focus:border-[#2a6ecb]"
                    />
                  </div>
                </div>

                {/* Orders Table */}
                {(() => {
                  const filtered = orders.filter((o) => {
                    const q = orderSearch.toLowerCase();
                    const matchesSearch =
                      !q ||
                      o.orderId.toLowerCase().includes(q) ||
                      o.customerName.toLowerCase().includes(q) ||
                      o.phone.toLowerCase().includes(q) ||
                      o.email.toLowerCase().includes(q) ||
                      o.city.toLowerCase().includes(q) ||
                      (o.items && o.items.some((it) => it.name.toLowerCase().includes(q)));

                    const matchesStatus =
                      orderStatusFilter === "all" ||
                      (orderStatusFilter === "On Progress" && (o.orderStatus === "On Progress" || o.orderStatus === "On Delivery" || o.orderStatus === "Dispatched")) ||
                      o.orderStatus.toLowerCase() === orderStatusFilter.toLowerCase();

                    return matchesSearch && matchesStatus;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="py-16 text-center text-[#64748b] space-y-2">
                        <Truck className="w-10 h-10 mx-auto text-[#cbd5e1]" />
                        <p className="font-archivo font-bold text-sm text-[#182a41]">No Orders Found</p>
                        <p className="text-xs">No customer orders matching the current filter or search criteria.</p>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      {/* MOBILE VIEW: Ultra Clean Responsive Cards */}
                      <div className="block lg:hidden space-y-4">
                        {filtered.map((ord) => (
                          <div
                            key={ord.orderId}
                            className="bg-white rounded-2xl border border-[#e9edf4] p-4 sm:p-5 shadow-xs space-y-4 hover:border-[#2a6ecb]/40 transition-all text-left"
                          >
                            {/* Card Header: Order ID + Status Badge */}
                            <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#f1f5f9]">
                              <div>
                                <span className="font-mono font-bold text-sm text-[#2a6ecb] block">
                                  {ord.orderId}
                                </span>
                                <span className="text-[11px] text-[#64748B] block mt-0.5">
                                  {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Recent Purchase"}
                                </span>
                              </div>
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-archivo font-bold uppercase tracking-wide ${
                                  ord.orderStatus === "Delivered"
                                    ? "bg-[#e0f3ec] text-[#1fb37a]"
                                    : ord.orderStatus === "Cancelled"
                                    ? "bg-[#fbe6ee] text-[#dc4b56]"
                                    : ord.orderStatus === "On Progress" || ord.orderStatus === "On Delivery" || ord.orderStatus === "Dispatched"
                                    ? "bg-[#dcebfb] text-[#2a6ecb]"
                                    : "bg-[#fdeadf] text-[#e8a33d]"
                                }`}
                              >
                                {ord.orderStatus}
                              </span>
                            </div>

                            {/* Customer & Destination Details */}
                            <div className="bg-[#f8fafd] rounded-xl p-3 space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-archivo font-bold text-[#182a41] text-xs">
                                  {ord.customerName}
                                </span>
                                <a
                                  href={`tel:${ord.phone}`}
                                  className="text-[#2a6ecb] font-mono text-[11px] font-bold hover:underline flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{ord.phone}</span>
                                </a>
                              </div>
                              <div className="text-[11px] text-[#64748B] flex items-center gap-1 truncate">
                                <Mail className="w-3 h-3 shrink-0" />
                                <span>{ord.email}</span>
                              </div>
                              <div className="text-[11px] text-[#182a41] flex items-start gap-1 pt-1 border-t border-[#e9edf4]">
                                <MapPin className="w-3.5 h-3.5 text-[#dc4b56] shrink-0 mt-0.5" />
                                <span className="line-clamp-2">
                                  <strong>{ord.city}, {ord.state} ({ord.pincode})</strong> • {ord.street}
                                </span>
                              </div>
                            </div>

                            {/* Equipment List */}
                            <div className="space-y-2">
                              <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
                                Purchased Equipment ({ord.items?.length || 0})
                              </span>
                              <div className="space-y-1.5">
                                {(ord.items || []).map((it, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between gap-2 p-2 bg-[#f8fafd] rounded-xl border border-[#e9edf4]"
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <img
                                        src={it.image || "/images/pulmocare/pulmocare_prisma-smart.png"}
                                        alt={it.name}
                                        className="w-8 h-8 object-contain rounded-lg bg-white p-0.5 border border-[#e9edf4] shrink-0"
                                      />
                                      <div className="min-w-0">
                                        <p className="text-xs font-semibold text-[#182a41] truncate max-w-[180px]">
                                          {it.name}
                                        </p>
                                        <p className="text-[10px] text-[#64748B]">Qty: {it.quantity}</p>
                                      </div>
                                    </div>
                                    <span className="font-archivo font-bold text-xs text-[#182a41] shrink-0">
                                      ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Price & Payment */}
                            <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9]">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Total Amount</span>
                                <span className="font-archivo font-extrabold text-lg text-[#182a41]">
                                  ₹{ord.totalAmount.toLocaleString("en-IN")}.00
                                </span>
                              </div>
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EBF5FF] text-[#0066FF] border border-[#0066FF]/20">
                                {ord.paymentMethod || "Razorpay Verified"}
                              </span>
                            </div>

                            {/* Status Change & Action Buttons */}
                            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-1">
                                <span className="text-[10px] font-bold text-[#64748B] shrink-0">Status:</span>
                                <select
                                  value={ord.orderStatus}
                                  onChange={async (e) => {
                                    const nextStatus = e.target.value;
                                    await updateOrderStatus(ord.orderId, nextStatus);
                                    addToast("Status Updated", `Order ${ord.orderId} updated to ${nextStatus}.`);
                                  }}
                                  className="w-full text-xs font-archivo font-semibold bg-[#f8fafd] border border-[#e2e8f0] rounded-xl px-2.5 py-1.5 text-[#182a41] focus:outline-none focus:border-[#2a6ecb] cursor-pointer"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="On Progress">On Progress (In Transit)</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setViewingOrder(ord)}
                                  className="flex-1 sm:flex-none px-4 py-1.5 rounded-xl bg-[#2a6ecb] text-white hover:bg-[#1f5ab0] transition-colors font-archivo font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Details</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    if (confirm(`Delete order ${ord.orderId}?`)) {
                                      await deleteOrder(ord.orderId);
                                      addToast("Order Deleted", `Order ${ord.orderId} removed from database.`);
                                    }
                                  }}
                                  className="p-2 rounded-xl bg-[#fbe6ee] text-[#dc4b56] hover:bg-[#dc4b56] hover:text-white transition-colors cursor-pointer"
                                  title="Delete Order"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* DESKTOP VIEW: Clean, Organized Spacious Table */}
                      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#e9edf4]">
                        <table className="w-full text-left text-xs font-inter border-collapse bg-white">
                          <thead>
                            <tr className="bg-[#f7f6fb] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#e9edf4]">
                              <th className="py-3.5 px-5">Order ID &amp; Customer</th>
                              <th className="py-3.5 px-5">Destination &amp; Contact</th>
                              <th className="py-3.5 px-5">Purchased Equipment</th>
                              <th className="py-3.5 px-5">Total &amp; Payment</th>
                              <th className="py-3.5 px-5">Fulfillment Status</th>
                              <th className="py-3.5 px-5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#f1f5f9]">
                            {filtered.map((ord) => (
                              <tr key={ord.orderId} className="hover:bg-[#f8fafd] transition-colors">
                                {/* Order ID & Customer */}
                                <td className="py-4 px-5 align-top">
                                  <span className="font-mono font-bold text-[#2a6ecb] block text-xs">
                                    {ord.orderId}
                                  </span>
                                  <span className="font-archivo font-bold text-[#182a41] block text-xs mt-1">
                                    {ord.customerName}
                                  </span>
                                  <span className="text-[10px] text-[#64748B] block mt-0.5">
                                    {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString("en-IN") : "Recent Order"}
                                  </span>
                                </td>

                                {/* Destination & Contact */}
                                <td className="py-4 px-5 align-top max-w-xs">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <Phone className="w-3 h-3 text-[#2a6ecb] shrink-0" />
                                      <a href={`tel:${ord.phone}`} className="text-[#2a6ecb] font-mono text-[11px] hover:underline font-bold">
                                        {ord.phone}
                                      </a>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] truncate">
                                      <Mail className="w-3 h-3 shrink-0" />
                                      <span className="truncate">{ord.email}</span>
                                    </div>
                                    <div className="pt-1 text-[11px] text-[#182a41]">
                                      <span className="font-bold block">{ord.city}, {ord.state} ({ord.pincode})</span>
                                      <span className="text-[10px] text-[#64748B] line-clamp-1">{ord.street}</span>
                                    </div>
                                  </div>
                                </td>

                                {/* Purchased Equipment */}
                                <td className="py-4 px-5 align-top min-w-[220px]">
                                  <div className="space-y-2">
                                    {(ord.items || []).map((it, idx) => (
                                      <div key={idx} className="flex items-center gap-2.5 p-1.5 bg-[#f8fafd] rounded-xl border border-[#e9edf4]/80">
                                        <img
                                          src={it.image || "/images/pulmocare/pulmocare_prisma-smart.png"}
                                          alt={it.name}
                                          className="w-7 h-7 object-contain rounded bg-white p-0.5 border border-[#e9edf4] shrink-0"
                                        />
                                        <div className="min-w-0 flex-1">
                                          <span className="font-semibold text-[#182a41] text-[11px] block truncate max-w-[190px]" title={it.name}>
                                            {it.name}
                                          </span>
                                          <span className="text-[10px] text-[#64748B]">
                                            Qty: {it.quantity} • ₹{it.price.toLocaleString("en-IN")}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </td>

                                {/* Total & Payment */}
                                <td className="py-4 px-5 align-top">
                                  <span className="font-archivo font-extrabold text-sm text-[#182a41] block">
                                    ₹{ord.totalAmount.toLocaleString("en-IN")}.00
                                  </span>
                                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF5FF] text-[#0066FF] border border-[#0066FF]/20">
                                    {ord.paymentMethod || "Razorpay Verified"}
                                  </span>
                                </td>

                                {/* Fulfillment Status & Select */}
                                <td className="py-4 px-5 align-top min-w-[150px]">
                                  <div className="space-y-2">
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-archivo font-bold uppercase tracking-wide ${
                                      ord.orderStatus === "Delivered"
                                        ? "bg-[#e0f3ec] text-[#1fb37a]"
                                        : ord.orderStatus === "Cancelled"
                                        ? "bg-[#fbe6ee] text-[#dc4b56]"
                                        : ord.orderStatus === "On Progress" || ord.orderStatus === "On Delivery" || ord.orderStatus === "Dispatched"
                                        ? "bg-[#dcebfb] text-[#2a6ecb]"
                                        : "bg-[#fdeadf] text-[#e8a33d]"
                                    }`}>
                                      {ord.orderStatus}
                                    </span>

                                    <select
                                      value={ord.orderStatus}
                                      onChange={async (e) => {
                                        const nextStatus = e.target.value;
                                        await updateOrderStatus(ord.orderId, nextStatus);
                                        addToast("Status Updated", `Order ${ord.orderId} updated to ${nextStatus}.`);
                                      }}
                                      className="block w-full text-[11px] font-archivo font-semibold bg-[#f8fafd] border border-[#e2e8f0] rounded-lg px-2.5 py-1.5 text-[#182a41] focus:outline-none focus:border-[#2a6ecb] cursor-pointer"
                                    >
                                      <option value="Pending">Pending</option>
                                      <option value="On Progress">On Progress (In Transit)</option>
                                      <option value="Delivered">Delivered</option>
                                      <option value="Cancelled">Cancelled</option>
                                    </select>
                                  </div>
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-5 align-top text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setViewingOrder(ord)}
                                      className="px-3 py-1.5 rounded-xl bg-[#2a6ecb] hover:bg-[#1f5ab0] text-white transition-all font-archivo font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                                      title="View full order dossier"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>Details</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={async () => {
                                        if (confirm(`Are you sure you want to delete order ${ord.orderId}?`)) {
                                          await deleteOrder(ord.orderId);
                                          addToast("Order Deleted", `Order ${ord.orderId} removed from database.`);
                                        }
                                      }}
                                      className="p-1.5 rounded-xl bg-[#fbe6ee] text-[#dc4b56] hover:bg-[#dc4b56] hover:text-white transition-colors cursor-pointer"
                                      title="Delete Order"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Order Dossier Modal */}
              {viewingOrder && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
                  <div className="bg-white rounded-3xl border border-[#e9edf4] shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between bg-white shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#2a6ecb] text-white flex items-center justify-center shadow-md shrink-0">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-archivo font-extrabold text-lg text-[#182a41]">
                              Order Shipment Dossier
                            </h3>
                            <span className="font-mono text-xs font-bold text-[#2a6ecb] bg-[#dcebfb] px-2.5 py-0.5 rounded-full">
                              {viewingOrder.orderId}
                            </span>
                          </div>
                          <p className="text-xs text-[#64748B]">
                            Customer: {viewingOrder.customerName} • Placed {viewingOrder.createdAt ? new Date(viewingOrder.createdAt).toLocaleString("en-IN") : "Recently"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="w-9 h-9 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#182a41] flex items-center justify-center transition-colors cursor-pointer"
                          title="Print Packing Slip"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewingOrder(null)}
                          className="w-9 h-9 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#182a41] flex items-center justify-center transition-colors cursor-pointer"
                          title="Close"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Modal Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {/* Status Pipeline Visualizer */}
                      <div className="bg-[#f7f6fb] p-4 rounded-2xl border border-[#e9edf4] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-archivo font-bold text-[#182a41] uppercase tracking-wider">
                            Fulfillment Progression
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            viewingOrder.orderStatus === "Delivered"
                              ? "bg-[#e0f3ec] text-[#1fb37a]"
                              : viewingOrder.orderStatus === "Cancelled"
                              ? "bg-[#fbe6ee] text-[#dc4b56]"
                              : "bg-[#fdeadf] text-[#e8a33d]"
                          }`}>
                            Current: {viewingOrder.orderStatus}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className={`p-2.5 rounded-xl border ${
                            viewingOrder.orderStatus !== "Cancelled"
                              ? "bg-white border-[#2a6ecb] text-[#2a6ecb] font-bold"
                              : "bg-white/50 border-[#e2e8f0] text-[#94a3b8]"
                          }`}>
                            <span className="block text-xs">1. Order Placed</span>
                            <span className="text-[10px] text-[#64748b] block font-normal">Registered in DB</span>
                          </div>
                          <div className={`p-2.5 rounded-xl border ${
                            viewingOrder.orderStatus === "On Progress" || viewingOrder.orderStatus === "Delivered"
                              ? "bg-white border-[#2a6ecb] text-[#2a6ecb] font-bold"
                              : "bg-white/50 border-[#e2e8f0] text-[#94a3b8]"
                          }`}>
                            <span className="block text-xs">2. Dispatched</span>
                            <span className="text-[10px] text-[#64748b] block font-normal">Courier In Transit</span>
                          </div>
                          <div className={`p-2.5 rounded-xl border ${
                            viewingOrder.orderStatus === "Delivered"
                              ? "bg-[#e0f3ec] border-emerald-500 text-[#1fb37a] font-bold"
                              : "bg-white/50 border-[#e2e8f0] text-[#94a3b8]"
                          }`}>
                            <span className="block text-xs">3. Delivered</span>
                            <span className="text-[10px] text-[#64748b] block font-normal">Handed to Client</span>
                          </div>
                        </div>
                      </div>

                      {/* Customer & Delivery Address Dossier */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="bg-white p-4 rounded-2xl border border-[#e9edf4] space-y-2">
                          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                            Customer Details
                          </span>
                          <span className="font-archivo font-bold text-sm text-[#182a41] block">{viewingOrder.customerName}</span>
                          <div className="space-y-1 text-[#64748B]">
                            <p className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-[#2a6ecb]" />
                              <a href={`tel:${viewingOrder.phone}`} className="hover:underline font-mono font-bold text-[#182a41]">{viewingOrder.phone}</a>
                            </p>
                            <p className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-[#2a6ecb]" />
                              <span>{viewingOrder.email}</span>
                            </p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-[#e9edf4] space-y-2">
                          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                            Shipping Destination
                          </span>
                          <span className="font-archivo font-bold text-sm text-[#182a41] block">
                            {viewingOrder.city}, {viewingOrder.state} ({viewingOrder.pincode})
                          </span>
                          <p className="text-[#64748B] leading-relaxed">
                            {viewingOrder.street}
                            {viewingOrder.landmark ? ` • Landmark: ${viewingOrder.landmark}` : ""}
                          </p>
                        </div>
                      </div>

                      {/* Items Purchased List */}
                      <div className="bg-white rounded-2xl border border-[#e9edf4] overflow-hidden">
                        <div className="p-4 bg-[#f7f6fb] border-b border-[#e9edf4] flex justify-between items-center">
                          <span className="font-archivo font-bold text-xs uppercase text-[#182a41]">
                            Purchased Medical Equipment ({viewingOrder.items.length} Items)
                          </span>
                          <span className="font-mono text-xs font-bold text-[#2a6ecb]">
                            Total: ₹{viewingOrder.totalAmount.toLocaleString("en-IN")}.00
                          </span>
                        </div>

                        <div className="divide-y divide-[#f6f4fb] p-2">
                          {viewingOrder.items.map((it, idx) => (
                            <div key={idx} className="p-3 flex items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={it.image || "/images/pulmocare/pulmocare_prisma-smart.png"}
                                  alt={it.name}
                                  className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-[#e9edf4] shrink-0"
                                />
                                <div>
                                  <span className="font-archivo font-bold text-xs text-[#182a41] block">{it.name}</span>
                                  <span className="text-[11px] text-[#64748B]">
                                    Unit Price: ₹{it.price.toLocaleString("en-IN")}.00
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="font-bold text-xs text-[#182a41] block">
                                  ₹{(it.price * it.quantity).toLocaleString("en-IN")}.00
                                </span>
                                <span className="text-[10px] text-[#64748B] block">Qty: {it.quantity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {viewingOrder.prescriptionNote && (
                        <div className="bg-[#f7f6fb] p-3 rounded-xl border border-[#e9edf4] text-xs space-y-1">
                          <span className="font-bold text-[#182a41] uppercase text-[10px] block">Customer Prescription / Doctor Note:</span>
                          <p className="text-[#64748B]">{viewingOrder.prescriptionNote}</p>
                        </div>
                      )}
                    </div>

                    {/* Modal Footer */}
                    <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3 shrink-0">
                      <div className="flex items-center gap-2">
                        {viewingOrder.orderStatus !== "Delivered" && (
                          <button
                            type="button"
                            onClick={async () => {
                              await updateOrderStatus(viewingOrder.orderId, "Delivered");
                              setViewingOrder({ ...viewingOrder, orderStatus: "Delivered" });
                              addToast("Order Delivered", `Order ${viewingOrder.orderId} marked as Delivered.`);
                            }}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-archivo font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Delivered</span>
                          </button>
                        )}

                        {viewingOrder.orderStatus === "Pending" && (
                          <button
                            type="button"
                            onClick={async () => {
                              await updateOrderStatus(viewingOrder.orderId, "On Progress");
                              setViewingOrder({ ...viewingOrder, orderStatus: "On Progress" });
                              addToast("Order Dispatched", `Order ${viewingOrder.orderId} marked as In Transit.`);
                            }}
                            className="px-4 py-2 rounded-xl bg-[#2a6ecb] hover:bg-[#1f56a3] text-white font-archivo font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Mark In Transit</span>
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setViewingOrder(null)}
                        className="px-5 py-2 rounded-xl bg-white hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#182a41] border border-[#E2E8F0] font-archivo font-bold text-xs transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: INQUIRIES & CONTACT SUBMISSIONS */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-[20px] border border-[#e9edf4] p-6 md:p-8 shadow-[0_2px_8px_rgba(24,42,65,0.05)] space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#f6f4fb]">
                <div>
                  <h2 className="font-archivo font-semibold text-2xl text-[#182a41]">Contact Inquiries &amp; Customer Submissions</h2>
                  <p className="text-xs text-[#64748B]">Real-time leads filed through the website contact form, stored in MongoDB Atlas.</p>
                </div>

                <div className="w-full sm:w-72 relative">
                  <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search by name, phone, city..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-[#e9edf4] bg-white text-xs text-[#182a41] focus:border-[#2a6ecb]"
                  />
                </div>
              </div>

              {/* Inquiry Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f7f6fb] rounded-2xl p-4 border border-[#e9edf4]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase block">Total Submissions</span>
                  <span className="font-archivo font-semibold text-2xl text-[#182a41]">{inquiries.length}</span>
                </div>
                <div className="bg-[#dcebfb] rounded-2xl p-4 border border-[#2a6ecb]/20">
                  <span className="text-[10px] font-bold text-[#2a6ecb] uppercase block">New Uncontacted Leads</span>
                  <span className="font-archivo font-semibold text-2xl text-[#2a6ecb]">
                    {inquiries.filter((i) => i.status === "New Lead").length}
                  </span>
                </div>
                <div className="bg-[#e0f3ec] rounded-2xl p-4 border border-[#1fb37a]">
                  <span className="text-[10px] font-bold text-[#1fb37a] uppercase block">Resolved Inquiries</span>
                  <span className="font-archivo font-semibold text-2xl text-[#1fb37a]">
                    {inquiries.filter((i) => i.status === "Resolved").length}
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f7f6fb] text-[#64748B] font-archivo font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Contact Details</th>
                      <th className="py-3 px-4">Inquiry &amp; Device</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Message / Requirements</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f6f4fb]">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-[#f7f6fb] transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#182a41] block">{inq.fullName}</span>
                          <a href={`tel:${inq.phone}`} className="text-[#2a6ecb] hover:underline font-mono text-[11px] block">
                            {inq.phone}
                          </a>
                          <span className="text-[10px] text-[#64748b] block">{inq.email}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-[#2a6ecb]/10 text-[#2a6ecb] font-bold px-2 py-0.5 rounded-full text-[10px] block w-max mb-1">
                            {inq.inquiryType}
                          </span>
                          <span className="font-semibold text-[#182a41] text-[11px] block line-clamp-1">{inq.device}</span>
                        </td>
                        <td className="py-3 px-4 font-medium text-[#64748b]">{inq.city}</td>
                        <td className="py-3 px-4 text-[#334155] max-w-xs leading-relaxed">
                          <p className="line-clamp-2">{inq.message}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              role="switch"
                              aria-checked={inq.status === "Resolved"}
                              onClick={() => {
                                const nextStatus = inq.status === "Resolved" ? "New Lead" : "Resolved";
                                handleUpdateInquiryStatus(inq.id, nextStatus, inq.fullName);
                              }}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                inq.status === "Resolved" ? "bg-[#10b981]" : "bg-[#2a6ecb]"
                              }`}
                              title={`Click to toggle status to ${inq.status === "Resolved" ? "New Lead" : "Resolved"}`}
                            >
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                                  inq.status === "Resolved" ? "translate-x-4" : "translate-x-0"
                                }`}
                              />
                            </button>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide inline-flex items-center gap-1 ${
                                inq.status === "New Lead"
                                  ? "bg-[#2a6ecb]/15 text-[#2a6ecb]"
                                  : inq.status === "Contacted"
                                  ? "bg-[#fdeadf] text-[#e8a33d]"
                                  : "bg-[#e0f3ec] text-emerald-800"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  inq.status === "Resolved"
                                    ? "bg-emerald-500"
                                    : inq.status === "Contacted"
                                    ? "bg-amber-500"
                                    : "bg-[#2a6ecb]"
                                }`}
                              />
                              {inq.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {inq.status !== "Resolved" ? (
                              <button
                                onClick={() => handleUpdateInquiryStatus(inq.id, inq.status === "New Lead" ? "Contacted" : "Resolved", inq.fullName)}
                                className="px-2 py-1 rounded-lg bg-[#dcebfb] text-[#2a6ecb] font-bold text-[10px] hover:bg-[#2a6ecb] hover:text-white transition-colors cursor-pointer"
                              >
                                {inq.status === "New Lead" ? "Mark Contacted" : "Mark Resolved"}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUpdateInquiryStatus(inq.id, "New Lead", inq.fullName)}
                                className="px-2 py-1 rounded-lg bg-[#f1f5f9] text-[#64748b] font-bold text-[10px] hover:bg-[#e2e8f0] hover:text-[#182a41] transition-colors cursor-pointer"
                              >
                                Reopen
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteInquiry(inq.id, inq.fullName)}
                              className="p-1.5 rounded-lg bg-[#fbe6ee] text-[#dc4b56] hover:bg-[#dc4b56] hover:text-white transition-colors cursor-pointer"
                              title="Delete Inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. SLEEP STUDY BOOKINGS TAB */}
          {activeTab === "sleep-studies" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-archivo font-extrabold text-2xl text-[#0A192F]">
                    Sleep Study Bookings &amp; Patient Registrations
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Manage patient registrations for home/hospital overnight diagnostic sleep studies (Daily rate: ₹5,000 / Study).
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search patient, phone, level..."
                    value={ssSearch}
                    onChange={(e) => setSsSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E2E8F0] text-xs bg-white focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase block">Total Bookings</span>
                  <span className="font-archivo font-extrabold text-2xl text-[#0A192F]">
                    {sleepStudyBookings.length}
                  </span>
                </div>
                <div className="bg-[#EBF5FF] rounded-2xl p-4 border border-[#0066FF]/20 shadow-xs">
                  <span className="text-[10px] font-bold text-[#0066FF] uppercase block">Pending Confirmations</span>
                  <span className="font-archivo font-extrabold text-2xl text-[#0066FF]">
                    {sleepStudyBookings.filter((b) => b.status === "Pending").length}
                  </span>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-xs">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase block">Confirmed Studies</span>
                  <span className="font-archivo font-extrabold text-2xl text-emerald-800">
                    {sleepStudyBookings.filter((b) => b.status === "Confirmed").length}
                  </span>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 shadow-xs">
                  <span className="text-[10px] font-bold text-purple-700 uppercase block">Completed Studies</span>
                  <span className="font-archivo font-extrabold text-2xl text-purple-800">
                    {sleepStudyBookings.filter((b) => b.status === "Completed").length}
                  </span>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#E2E8F0]">
                      <tr>
                        <th className="py-3.5 px-4">Booking Ref / Date</th>
                        <th className="py-3.5 px-4">Patient Name &amp; Contact</th>
                        <th className="py-3.5 px-4">Physical Stats</th>
                        <th className="py-3.5 px-4">Sleep Schedule</th>
                        <th className="py-3.5 px-4">Level Selected</th>
                        <th className="py-3.5 px-4">Study Date &amp; Address</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {sleepStudyBookings.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-xs text-[#94A3B8]">
                            No sleep study bookings received yet.
                          </td>
                        </tr>
                      ) : (
                        sleepStudyBookings
                          .filter(
                            (b) =>
                              b.patientName.toLowerCase().includes(ssSearch.toLowerCase()) ||
                              b.phone.toLowerCase().includes(ssSearch.toLowerCase()) ||
                              b.email.toLowerCase().includes(ssSearch.toLowerCase()) ||
                              b.level.toLowerCase().includes(ssSearch.toLowerCase()) ||
                              b.city.toLowerCase().includes(ssSearch.toLowerCase()) ||
                              b.bookingId.toLowerCase().includes(ssSearch.toLowerCase())
                          )
                          .map((b) => (
                            <tr key={b.bookingId} className="hover:bg-[#F8FAFC] transition-colors">
                              <td className="py-3.5 px-4">
                                <span className="font-mono font-bold text-[#0066FF] block">{b.bookingId}</span>
                                <span className="text-[10px] text-[#94A3B8] block">
                                  {b.createdAt ? new Date(b.createdAt).toLocaleDateString("en-IN") : "Recent"}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="font-bold text-[#0A192F] block">{b.patientName}</span>
                                <a href={`tel:${b.phone}`} className="text-[#0066FF] hover:underline font-mono text-[11px] block">
                                  {b.phone}
                                </a>
                                <span className="text-[10px] text-[#64748B] block">{b.email}</span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="block font-medium text-[#0A192F]">Ht: {b.height}</span>
                                <span className="block font-medium text-[#0A192F]">Wt: {b.weight}</span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="block text-[11px] text-[#0A192F]">Bed: <strong>{b.bedTime}</strong></span>
                                <span className="block text-[11px] text-[#0A192F]">Up: <strong>{b.upTime}</strong></span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-archivo font-extrabold uppercase tracking-wide inline-block ${
                                    b.level.includes("Lvl 1")
                                      ? "bg-purple-100 text-purple-800 border border-purple-300"
                                      : b.level.includes("Lvl 2")
                                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                                      : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  }`}
                                >
                                  {b.level}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 max-w-xs">
                                <span className="font-bold text-[#0A192F] block">{b.studyDate}</span>
                                <span className="text-[11px] text-[#64748B] block line-clamp-1">{b.address}, {b.city}</span>
                              </td>
                              <td className="py-3.5 px-4">
                                <select
                                  value={b.status}
                                  onChange={(e) => {
                                    updateSleepStudyBookingStatus(b.bookingId, e.target.value);
                                    addToast("Status Updated", `Booking #${b.bookingId} set to ${e.target.value}.`);
                                  }}
                                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border cursor-pointer ${
                                    b.status === "Pending"
                                      ? "bg-amber-50 text-amber-700 border-amber-300"
                                      : b.status === "Confirmed"
                                      ? "bg-blue-50 text-blue-700 border-blue-300"
                                      : b.status === "Completed"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                      : "bg-rose-50 text-rose-700 border-rose-300"
                                  }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete sleep study booking #${b.bookingId} for ${b.patientName}?`)) {
                                      deleteSleepStudyBooking(b.bookingId);
                                      addToast("Booking Deleted", `Removed booking #${b.bookingId}.`);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: BUNDLE MAKER & QUOTATION CREATOR */}
          {activeTab === "bundles" && <BundleMakerTab />}
        </main>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 md:p-8 shadow-[0_30px_70px_rgba(24,42,65,0.14)] border border-[#e9edf4] max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#f6f4fb] mb-6">
              <div>
                <h3 className="font-archivo font-semibold text-2xl text-[#182a41]">
                  {editingProduct ? "Edit Product Details" : "Add New Product"}
                </h3>
                <p className="text-xs text-[#64748B]">All fields entered here automatically synchronize with the storefront catalog and modal preview.</p>
              </div>
              <button onClick={() => setProductModalOpen(false)} className="p-2 rounded-full hover:bg-[#f6f4fb] text-[#64748B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs">
              {/* Basic Details: Title & SKU */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="e.g. Prisma SMART Auto CPAP"
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-sm text-[#182a41] font-medium focus:border-[#2a6ecb]"
                  />
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">SKU / Model Code</label>
                  <input
                    type="text"
                    value={pSku}
                    onChange={(e) => setPSku(e.target.value)}
                    placeholder="e.g. LM-PSMART-2026"
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] font-mono focus:border-[#2a6ecb]"
                  />
                </div>
              </div>

              {/* Classification: Category, Brand, Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Category *</label>
                  <select
                    value={pCategory}
                    onChange={(e) => {
                      setPCategory(e.target.value);
                      // Pre-select the listing type this category normally uses;
                      // the admin can still override it below.
                      setPPricingMode(isRentalCategory(e.target.value) ? "rental" : "price");
                    }}
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] font-semibold focus:border-[#2a6ecb]"
                  >
                    {categories && categories.length > 0 ? (
                      <>
                        {pCategory && !categories.some((c) => c.name.toLowerCase() === pCategory.toLowerCase()) && (
                          <option value={pCategory}>{pCategory} (Custom)</option>
                        )}
                        {categories.map((c) => (
                          <option key={c.id || c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </>
                    ) : (
                      <>
                        <option value="Ventilation & Sleep">Ventilation &amp; Sleep</option>
                        <option value="CPAP Therapy">CPAP Therapy</option>
                        <option value="Bilevel-S & ST Devices">Bilevel-S &amp; ST Devices</option>
                        <option value="ASV & Titration Devices">ASV &amp; Titration Devices</option>
                        <option value="Humidifiers">Humidifiers</option>
                        <option value="Ventilation">Ventilation</option>
                        <option value="Oxygen Therapy">Oxygen Therapy</option>
                        <option value="Sleep Diagnostics">Sleep Diagnostics</option>
                        <option value="Masks">Masks</option>
                        <option value="Diagnostic">Diagnostic</option>
                        <option value="Surgical">Surgical</option>
                        <option value="PPE & Protection">PPE &amp; Protection</option>
                        <option value="Disinfection">Disinfection</option>
                        <option value="Personal Care">Personal Care</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Brand / Manufacturer</label>
                  <input
                    type="text"
                    value={pBrand}
                    onChange={(e) => setPBrand(e.target.value)}
                    placeholder="e.g. Löwenstein Medical"
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] focus:border-[#2a6ecb]"
                  />
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={pBadge}
                    onChange={(e) => setPBadge(e.target.value)}
                    placeholder="e.g. INTENSIVE CARE / HOT OFFER"
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] focus:border-[#2a6ecb]"
                  />
                </div>
              </div>

              {/* Pricing: Sale vs Rental mode vs On Request mode */}
              <div className="space-y-4 bg-[#f7f6fb] p-4 rounded-2xl border border-[#e9edf4]">
                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-2">
                    Pricing &amp; Procurement Mode *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPPricingMode("price")}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        pPricingMode === "price"
                          ? "bg-white border-[#2a6ecb] ring-2 ring-[#2a6ecb]/25 shadow-xs"
                          : "bg-white/60 border-[#e9edf4] hover:border-[#7fb0ee]"
                      }`}
                    >
                      <span className="font-archivo font-bold text-xs text-[#182a41] block">
                        Fixed Purchase
                      </span>
                      <span className="text-[11px] text-[#64748B] leading-snug block mt-0.5">
                        Fixed price with direct &ldquo;Add to Cart&rdquo; checkout.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPPricingMode("rental")}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        pPricingMode === "rental"
                          ? "bg-white border-[#2a6ecb] ring-2 ring-[#2a6ecb]/25 shadow-xs"
                          : "bg-white/60 border-[#e9edf4] hover:border-[#7fb0ee]"
                      }`}
                    >
                      <span className="font-archivo font-bold text-xs text-[#182a41] block">
                        Purchase + Rental
                      </span>
                      <span className="text-[11px] text-[#64748B] leading-snug block mt-0.5">
                        Fixed price plus &ldquo;Also on rental &mdash; contact us&rdquo;.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPPricingMode("on_request")}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        pPricingMode === "on_request"
                          ? "bg-white border-amber-500 ring-2 ring-amber-500/25 shadow-xs"
                          : "bg-white/60 border-[#e9edf4] hover:border-amber-300"
                      }`}
                    >
                      <span className="font-archivo font-bold text-xs text-amber-700 block flex items-center gap-1">
                        <span>On Request</span>
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-100 text-amber-800 font-extrabold">Quote</span>
                      </span>
                      <span className="text-[11px] text-[#64748B] leading-snug block mt-0.5">
                        No listed price. &ldquo;Price on Request&rdquo; with inquiry form.
                      </span>
                    </button>
                  </div>

                  {pPricingMode === "rental" && (
                    <p className="text-[11px] text-[#2a6ecb] font-semibold mt-2">
                      Customers see the fixed retail price and can also contact for monthly device rental.
                    </p>
                  )}

                  {pPricingMode === "on_request" && (
                    <div className="mt-2.5 p-3 bg-amber-50/90 border border-amber-200 rounded-2xl flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-[11px] text-amber-900 leading-relaxed">
                        <strong className="font-bold">Price on Request Activated:</strong> On the website, this device will display <span className="font-bold text-amber-800">&ldquo;Price on Request&rdquo;</span> and a <span className="font-bold text-amber-800">&ldquo;Request Quote / Enquire Now&rdquo;</span> button. When customers submit their request, it immediately logs into your <strong className="font-bold">Customer Inquiries</strong> portal.
                      </div>
                    </div>
                  )}
                </div>

                {pPricingMode !== "on_request" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">
                        Selling Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={pPrice === "0" ? "" : pPrice}
                        placeholder="e.g. 45990"
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setPPrice(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-sm font-bold text-[#0a1f3c] focus:border-[#2a6ecb]"
                      />
                    </div>

                    <div>
                      <label className="block font-archivo font-bold text-[#64748b] uppercase mb-1">Original Price / MSRP (₹)</label>
                      <input
                        type="number"
                        value={pOriginalPrice === "0" ? "" : pOriginalPrice}
                        placeholder="e.g. 65000"
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setPOriginalPrice(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-sm font-semibold text-[#64748b] focus:border-[#2a6ecb]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center justify-between text-xs text-[#64748B]">
                    <span>Catalog Price Status:</span>
                    <span className="font-archivo font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      Price on Request (Unlisted / Quote Only)
                    </span>
                  </div>
                )}
              </div>

              {/* Inventory & Display Toggles */}
              <div className="flex flex-wrap items-center gap-6 p-4 bg-[#f6f4fb] rounded-2xl border border-[#e9edf4]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={pInStock}
                    onChange={(e) => setPInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2a6ecb] focus:ring-[#2a6ecb]"
                  />
                  <span className="font-archivo font-bold text-xs text-[#182a41]">In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={pIsFeatured}
                    onChange={(e) => setPIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2a6ecb] focus:ring-[#2a6ecb]"
                  />
                  <span className="font-archivo font-bold text-xs text-[#182a41]">Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={pIsOffer}
                    onChange={(e) => setPIsOffer(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2a6ecb] focus:ring-[#2a6ecb]"
                  />
                  <span className="font-archivo font-bold text-xs text-[#182a41]">Special Offer Badge</span>
                </label>
              </div>

              {/* Product Image Selection & Upload */}
              <div className="space-y-2">
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">
                  Product Image (Upload via Multer or Paste URL)
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2.5 rounded-xl bg-[#dcebfb] text-[#2a6ecb] hover:bg-[#2a6ecb] hover:text-white font-archivo font-bold text-xs cursor-pointer transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingImage ? "Uploading via Multer..." : "Upload Image File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                      disabled={isUploadingImage}
                    />
                  </label>
                  <span className="text-[10px] text-[#64748b] uppercase font-bold">OR</span>
                  <input
                    type="text"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    placeholder="Paste image path (e.g. /images/pulmocare/pulmocare_prisma-smart.png)"
                    className="flex-1 p-2.5 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] focus:border-[#2a6ecb]"
                  />
                </div>

                {pImage && (
                  <div className="mt-2 flex items-center gap-3 p-3 bg-[#f7f6fb] rounded-2xl border border-[#e9edf4]">
                    <img src={pImage} alt="Preview" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-[#e9edf4] shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-[#1fb37a] block">Image Asset Selected</span>
                      <span className="text-[11px] text-[#64748B] font-mono line-clamp-1">{pImage}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={pDescription}
                  onChange={(e) => setPDescription(e.target.value)}
                  placeholder="Enter detailed clinical equipment description..."
                  className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] focus:border-[#2a6ecb]"
                />
              </div>

              {/* Features List */}
              <div>
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">
                  Key Highlights &amp; Features (1 feature per line)
                </label>
                <textarea
                  rows={3}
                  value={pFeaturesText}
                  onChange={(e) => setPFeaturesText(e.target.value)}
                  placeholder="Auto-adjusting Sleep Apnea Therapy technology&#10;Deep-blue backlight graphics display&#10;Integrated warm-air humidification"
                  className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] font-mono focus:border-[#2a6ecb]"
                />
              </div>

              {/* Specifications: Label: Value */}
              <div>
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">
                  German Technical Specifications (Format: <code className="text-[#2a6ecb]">Label: Value</code> per line)
                </label>
                <textarea
                  rows={4}
                  value={pSpecsText}
                  onChange={(e) => setPSpecsText(e.target.value)}
                  placeholder="Operating Noise: 26 dB(A)&#10;Pressure Range: 4 to 20 hPa&#10;Weight: 1.4 kg&#10;Warranty: 2 Years"
                  className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] font-mono focus:border-[#2a6ecb]"
                />
              </div>

              {/* Box Contents & Warranty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">
                    What's in the Box (1 item per line)
                  </label>
                  <textarea
                    rows={3}
                    value={pBoxContentsText}
                    onChange={(e) => setPBoxContentsText(e.target.value)}
                    placeholder="Prisma SMART Device&#10;AQUA Humidifier Chamber&#10;Breathing Tube"
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] font-mono focus:border-[#2a6ecb]"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Warranty Terms</label>
                    <input
                      type="text"
                      value={pWarranty}
                      onChange={(e) => setPWarranty(e.target.value)}
                      placeholder="e.g. 2 Years German Warranty"
                      className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] focus:border-[#2a6ecb]"
                    />
                  </div>

                  <div>
                    <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">
                      Brochure / Spec PDF <span className="text-[#64748b] text-[10px] font-normal">(Optional — Upload PDF or Paste Link)</span>
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <label className="px-4 py-2.5 rounded-xl bg-[#dcebfb] text-[#2a6ecb] hover:bg-[#2a6ecb] hover:text-white font-archivo font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-2 shrink-0">
                        <Upload className="w-4 h-4" />
                        <span>{isUploadingPdf ? "Uploading..." : "Upload PDF"}</span>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handlePdfFileUpload}
                          className="hidden"
                          disabled={isUploadingPdf}
                        />
                      </label>
                      <input
                        type="text"
                        value={pBrochureUrl}
                        onChange={(e) => setPBrochureUrl(e.target.value)}
                        placeholder="e.g. /doc-files/sample_doc.pdf"
                        className="flex-1 p-2.5 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] focus:border-[#2a6ecb]"
                      />
                    </div>
                    {pBrochureUrl && (
                      <div className="mt-2 flex items-center justify-between p-2.5 bg-[#f7f6fb] rounded-2xl border border-[#e9edf4]">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-[#2a6ecb] shrink-0" />
                          <span className="text-xs font-semibold text-[#182a41] truncate max-w-[280px]">
                            {pBrochureUrl.startsWith("data:") ? "Uploaded PDF Brochure Document" : pBrochureUrl}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={pBrochureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#2a6ecb] hover:underline font-bold"
                          >
                            Preview
                          </a>
                          <button
                            type="button"
                            onClick={() => setPBrochureUrl("")}
                            className="text-[11px] text-red-500 hover:text-red-700 font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex justify-end gap-3 border-t border-[#f6f4fb]">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-6 py-3 rounded-full border border-[#e9edf4] font-archivo font-bold text-xs hover:bg-[#f7f6fb] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#2a6ecb] hover:bg-[#4b8ee6] text-white font-archivo font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE BLOG ARTICLE MODAL */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[20px] max-w-2xl w-full p-6 md:p-8 shadow-[0_30px_70px_rgba(24,42,65,0.14)] border border-[#e9edf4] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#f6f4fb] mb-6">
              <h3 className="font-archivo font-semibold text-2xl text-[#182a41]">
                {editingBlog ? "Edit Article" : "Create New Clinical Article"}
              </h3>
              <button onClick={() => setBlogModalOpen(false)} className="p-2 rounded-full hover:bg-[#f6f4fb] text-[#64748B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div>
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={bTitle}
                  onChange={(e) => setBTitle(e.target.value)}
                  placeholder="e.g. Understanding CPAP and BiLevel Therapy"
                  className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-sm text-[#182a41]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Category</label>
                  <select
                    value={bCategory}
                    onChange={(e) => setBCategory(e.target.value as any)}
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41]"
                  >
                    <option value="Sleep Therapy">Sleep Therapy</option>
                    <option value="Ventilation">Ventilation</option>
                    <option value="Oxygen Care">Oxygen Care</option>
                    <option value="Diagnostics">Diagnostics</option>
                    <option value="Masks">Masks</option>
                  </select>
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={bAuthor}
                    onChange={(e) => setBAuthor(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41]"
                  />
                </div>
              </div>

              {/* Article Image Upload & Selection */}
              <div className="space-y-2">
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">
                  Featured Article Image <span className="text-[#64748b] text-[10px] font-normal">(Upload Image or Paste Link)</span>
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <label className="px-4 py-2.5 rounded-xl bg-[#dcebfb] text-[#2a6ecb] hover:bg-[#2a6ecb] hover:text-white font-archivo font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-2 shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingBlogImage ? "Uploading..." : "Upload Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBlogImageUpload}
                      className="hidden"
                      disabled={isUploadingBlogImage}
                    />
                  </label>
                  <input
                    type="text"
                    value={bImage}
                    onChange={(e) => setBImage(e.target.value)}
                    placeholder="e.g. /images/pulmocare/pulmocare_prisma-smart.png"
                    className="flex-1 p-2.5 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] focus:border-[#2a6ecb]"
                  />
                </div>

                {bImage && (
                  <div className="mt-2 flex items-center gap-3 p-2.5 bg-[#f7f6fb] rounded-2xl border border-[#e9edf4]">
                    <img
                      src={bImage}
                      alt="Article Thumbnail"
                      className="w-14 h-14 object-cover rounded-xl bg-white p-1 border border-[#e9edf4] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-[#1fb37a] block">Featured Image Attached</span>
                      <span className="text-[11px] text-[#64748B] font-mono truncate block">
                        {bImage.startsWith("data:") ? "Uploaded Image (Base64)" : bImage}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBImage("")}
                      className="text-[11px] text-red-500 hover:text-red-700 font-bold px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  required
                  value={bExcerpt}
                  onChange={(e) => setBExcerpt(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41]"
                />
              </div>

              <div>
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Article Body Content (Paragraphs separated by double line break)</label>
                <textarea
                  rows={6}
                  required
                  value={bContentText}
                  onChange={(e) => setBContentText(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41] font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#f6f4fb]">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#e9edf4] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#2a6ecb] hover:bg-[#2a6ecb] text-white font-archivo font-bold text-xs uppercase"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE REVIEW MODAL */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[20px] max-w-lg w-full p-6 md:p-8 shadow-[0_30px_70px_rgba(24,42,65,0.14)] border border-[#e9edf4] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#f6f4fb] mb-6">
              <h3 className="font-archivo font-semibold text-2xl text-[#182a41]">Add Customer Review</h3>
              <button onClick={() => setReviewModalOpen(false)} className="p-2 rounded-full hover:bg-[#f6f4fb] text-[#64748B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Target Product</label>
                <select
                  value={rProductId}
                  onChange={(e) => {
                    setRProductId(e.target.value);
                    const found = products.find((p) => p.id === e.target.value);
                    if (found) setRProductName(found.name);
                  }}
                  className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Reviewer Name</label>
                  <input
                    type="text"
                    required
                    value={rAuthor}
                    onChange={(e) => setRAuthor(e.target.value)}
                    placeholder="e.g. Dr. Rajesh K."
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41]"
                  />
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Rating (Stars)</label>
                  <select
                    value={rRating}
                    onChange={(e) => setRRating(parseInt(e.target.value))}
                    className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41]"
                  >
                    <option value={5}>5 Stars (⭐ ⭐ ⭐ ⭐ ⭐)</option>
                    <option value={4}>4 Stars (⭐ ⭐ ⭐ ⭐)</option>
                    <option value={3}>3 Stars (⭐ ⭐ ⭐)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-archivo font-bold text-[#182a41] uppercase mb-1">Review Comment</label>
                <textarea
                  rows={3}
                  required
                  value={rComment}
                  onChange={(e) => setRComment(e.target.value)}
                  placeholder="e.g. Exceptional build quality and quiet operation."
                  className="w-full p-3 rounded-2xl border border-[#e9edf4] bg-white text-xs text-[#182a41]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#f6f4fb]">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#e9edf4] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#2a6ecb] hover:bg-[#2a6ecb] text-white font-archivo font-bold text-xs uppercase"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT CATEGORY MODAL */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#E2E8F0]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-6">
              <h3 className="font-archivo font-extrabold text-2xl text-[#0F172A]">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button onClick={() => setCategoryModalOpen(false)} className="p-2 rounded-full hover:bg-[#F1F5F9] text-[#64748B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={cName}
                  onChange={(e) => {
                    setCName(e.target.value);
                    if (!editingCategory) {
                      setCSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                    }
                  }}
                  placeholder="e.g. Suction & Nebulization"
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={cSlug}
                    onChange={(e) => setCSlug(e.target.value)}
                    placeholder="e.g. suction-nebulization"
                    className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Badge (Optional)</label>
                  <input
                    type="text"
                    value={cBadge}
                    onChange={(e) => setCBadge(e.target.value)}
                    placeholder="e.g. New Launch / Bestseller"
                    className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">
                  Category Cover Image (Upload via Multer or Paste URL)
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 rounded-xl bg-[#EBF5FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white font-archivo font-bold text-xs cursor-pointer transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingCatImage ? "Uploading via Multer..." : "Upload Image File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCatImageFileUpload}
                      className="hidden"
                      disabled={isUploadingCatImage}
                    />
                  </label>
                  <span className="text-[10px] text-[#94A3B8] uppercase font-bold">OR</span>
                </div>

                <input
                  type="text"
                  value={cImage}
                  onChange={(e) => setCImage(e.target.value)}
                  placeholder="Paste image URL or /uploads/cat_... path"
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                />

                {cImage && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                    <img src={cImage} alt="Preview" className="w-10 h-10 object-contain rounded-lg bg-white p-1 border" />
                    <span className="text-[10px] text-[#64748B] font-mono line-clamp-1">{cImage}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={cDesc}
                  onChange={(e) => setCDesc(e.target.value)}
                  placeholder="Brief clinical description of this equipment category..."
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E2E8F0] text-[#64748B] font-archivo font-bold hover:bg-[#F8FAFC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold uppercase tracking-wider"
                >
                  {editingCategory ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
