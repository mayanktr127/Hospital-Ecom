"use client";

import React, { useState, useMemo } from "react";
import { useAdmin, BundleItem, BundleProductItem } from "@/context/AdminContext";
import { useToast } from "@/context/ToastContext";
import { Product } from "@/types/product";
import { NASAL_MASK_PRODUCT, FULL_FACE_MASK_PRODUCT } from "@/utils/maskAddon";
import {
  PackagePlus,
  Search,
  Plus,
  Minus,
  Trash2,
  Copy,
  ExternalLink,
  Check,
  Share2,
  Calendar,
  User,
  Phone,
  Mail,
  DollarSign,
  Tag,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  RefreshCw,
  Send,
  SlidersHorizontal,
  ChevronDown,
  X,
  Eye,
  Printer,
  Building2,
  MapPin,
  CreditCard,
  FileText,
} from "lucide-react";

interface SelectedDraftItem {
  product: Product;
  quantity: number;
  customPrice: number;
}

export const BundleMakerTab: React.FC = () => {
  const { products, bundles, addBundle, deleteBundle, refreshBundles } = useAdmin();
  const { addToast } = useToast();

  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search & Filter for Product Selection
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceStatusFilter, setPriceStatusFilter] = useState<"all" | "listed" | "unlisted">("all");

  // Bundle Form Meta Fields
  const [bundleTitle, setBundleTitle] = useState("");
  const [bundleDescription, setBundleDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [customDiscountedPrice, setCustomDiscountedPrice] = useState<number | null>(null);
  const [expiryDays, setExpiryDays] = useState<number>(15);

  // Draft Selected Items
  const [selectedItems, setSelectedItems] = useState<SelectedDraftItem[]>([]);

  // Generated Link Modal / Success Banner
  const [recentlyCreatedBundle, setRecentlyCreatedBundle] = useState<BundleItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search in Existing Bundles
  const [bundleSearch, setBundleSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "paid">("all");
  const [expandedBundleId, setExpandedBundleId] = useState<string | null>(null);
  const [detailedViewBundle, setDetailedViewBundle] = useState<BundleItem | null>(null);

  // Combine products with masks so admin can bundle everything
  const allAvailableProducts = useMemo(() => {
    const list = [...products];
    if (!list.some((p) => p.id === NASAL_MASK_PRODUCT.id)) {
      list.push(NASAL_MASK_PRODUCT);
    }
    if (!list.some((p) => p.id === FULL_FACE_MASK_PRODUCT.id)) {
      list.push(FULL_FACE_MASK_PRODUCT);
    }
    return list;
  }, [products]);

  // Unique categories
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    allAvailableProducts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [allAvailableProducts]);

  // Filtered Products for Picker
  const filteredProducts = useMemo(() => {
    return allAvailableProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.id && p.id.toLowerCase().includes(productSearch.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(productSearch.toLowerCase()));

      const matchesCat = categoryFilter === "all" || p.category === categoryFilter;

      const hasPrice = typeof p.price === "number" && p.price > 0;
      const matchesPrice =
        priceStatusFilter === "all" ||
        (priceStatusFilter === "listed" && hasPrice) ||
        (priceStatusFilter === "unlisted" && !hasPrice);

      return matchesSearch && matchesCat && matchesPrice;
    });
  }, [allAvailableProducts, productSearch, categoryFilter, priceStatusFilter]);

  // Calculations for Draft Bundle
  const draftSubtotal = useMemo(() => {
    return selectedItems.reduce((acc, it) => acc + it.customPrice * it.quantity, 0);
  }, [selectedItems]);

  const draftTotalCatalogValue = useMemo(() => {
    return selectedItems.reduce((acc, it) => acc + (it.product.price || 0) * it.quantity, 0);
  }, [selectedItems]);

  const effectiveDiscount = useMemo(() => {
    if (customDiscountedPrice !== null) {
      return Math.max(0, draftSubtotal - customDiscountedPrice);
    }
    return discountAmount;
  }, [customDiscountedPrice, draftSubtotal, discountAmount]);

  const draftFinalTotal = useMemo(() => {
    if (customDiscountedPrice !== null) {
      return Math.max(0, customDiscountedPrice);
    }
    return Math.max(0, draftSubtotal - discountAmount);
  }, [customDiscountedPrice, draftSubtotal, discountAmount]);

  // Handlers for Item Selection
  const handleAddProductToBundle = (product: Product) => {
    setSelectedItems((prev) => {
      const existing = prev.find((it) => it.product.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          customPrice: product.price && product.price > 0 ? product.price : 0,
        },
      ];
    });
  };

  const handleUpdateItemQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setSelectedItems((prev) =>
      prev.map((it) => (it.product.id === productId ? { ...it, quantity: qty } : it))
    );
  };

  const handleUpdateCustomPrice = (productId: string, price: number) => {
    setSelectedItems((prev) =>
      prev.map((it) =>
        it.product.id === productId ? { ...it, customPrice: Math.max(0, price) } : it
      )
    );
  };

  const handleApplyQuickAdjustment = (productId: string, percentage: number) => {
    setSelectedItems((prev) =>
      prev.map((it) => {
        if (it.product.id === productId) {
          const base = it.customPrice || it.product.price || 1000;
          const adjusted = Math.round(base * (1 + percentage / 100));
          return { ...it, customPrice: Math.max(0, adjusted) };
        }
        return it;
      })
    );
  };

  const handleRemoveItem = (productId: string) => {
    setSelectedItems((prev) => prev.filter((it) => it.product.id !== productId));
  };

  const handleCreateBundle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      addToast("Empty Bundle", "Please add at least one product to the bundle.", "warning");
      return;
    }
    if (!bundleTitle.trim()) {
      addToast("Title Required", "Please enter a descriptive bundle title.", "warning");
      return;
    }

    setIsSubmitting(true);

    const items: BundleProductItem[] = selectedItems.map((it) => ({
      productId: it.product.id,
      name: it.product.name,
      category: it.product.category || "Medical Equipment",
      image: it.product.image || "/images/pulmocare/pulmocare_prisma-smart.png",
      catalogPrice: it.product.price && it.product.price > 0 ? it.product.price : null,
      customPrice: it.customPrice,
      quantity: it.quantity,
      subtotal: it.customPrice * it.quantity,
    }));

    const expiresAt = expiryDays > 0 ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString() : undefined;

    const newBundle = await addBundle({
      title: bundleTitle,
      description: bundleDescription,
      clientName: clientName || undefined,
      clientEmail: clientEmail || undefined,
      clientPhone: clientPhone || undefined,
      items,
      totalAmount: draftFinalTotal,
      discountAmount: effectiveDiscount,
      expiresAt,
    });

    setIsSubmitting(false);

    if (newBundle) {
      setRecentlyCreatedBundle(newBundle);
      addToast("Bundle Created!", `Custom link generated for ${newBundle.bundleId}`);
      // Reset form
      setSelectedItems([]);
      setBundleTitle("");
      setBundleDescription("");
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setDiscountAmount(0);
      setCustomDiscountedPrice(null);
      setIsCreating(false);
    } else {
      addToast("Creation Failed", "Failed to save bundle. Please check your connection.", "error");
    }
  };

  const getCustomLink = (bundleId: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/bundle/${bundleId}`;
  };

  const handleCopyLink = async (bundleId: string) => {
    const link = getCustomLink(bundleId);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedId(bundleId);
      addToast("Link Copied!", "Custom bundle payment link copied to clipboard.");
      setTimeout(() => setCopiedId(null), 3000);
    } catch (err) {
      prompt("Copy this custom bundle payment link:", link);
    }
  };

  const handleShareWhatsApp = (bundle: BundleItem) => {
    const link = getCustomLink(bundle.bundleId);
    const text = `Hello! Here is your custom Löwenstein Medical quotation and direct payment link for "${bundle.title}" from Pulmo Care:\n\nTotal Payable: ₹${bundle.totalAmount.toLocaleString("en-IN")}.00\nPayment Link: ${link}\n\nIncludes official clinical warranty and priority express delivery.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Filtered Existing Bundles Table
  const filteredBundles = useMemo(() => {
    return bundles.filter((b) => {
      const matchesSearch =
        b.bundleId.toLowerCase().includes(bundleSearch.toLowerCase()) ||
        b.title.toLowerCase().includes(bundleSearch.toLowerCase()) ||
        (b.clientName && b.clientName.toLowerCase().includes(bundleSearch.toLowerCase()));

      const matchesStatus = statusFilter === "all" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bundles, bundleSearch, statusFilter]);

  // Stats
  const paidBundlesCount = bundles.filter((b) => b.status === "paid").length;
  const pendingBundlesCount = bundles.filter((b) => b.status === "active").length;
  const totalPaidRevenue = bundles
    .filter((b) => b.status === "paid")
    .reduce((acc, b) => acc + (b.totalAmount || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. TOP HEADER & METRICS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e9edf4] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#EBF5FF] text-[#0066FF] font-archivo font-bold text-xs uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commercial Quotations Engine</span>
            </span>
          </div>
          <h2 className="font-archivo font-extrabold text-2xl sm:text-3xl text-[#0A192F]">
            Product Bundle Maker
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl">
            Pick from all catalog equipment (listed &amp; unlisted), customize pricing per product, generate secure custom payment links, and send directly to hospitals or private clients.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => refreshBundles()}
            className="p-3 bg-[#F8FAFC] hover:bg-[#EDF2F7] text-[#64748B] rounded-2xl border border-[#E2E8F0] transition-colors cursor-pointer"
            title="Refresh Bundles"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsCreating(true);
              setRecentlyCreatedBundle(null);
            }}
            className="btn btn-primary !py-3.5 !px-6 rounded-2xl flex items-center gap-2 cursor-pointer shadow-md"
          >
            <PackagePlus className="w-4 h-4" />
            <span>+ Create New Bundle</span>
          </button>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e9edf4] shadow-2xs">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">Total Bundles</span>
          <span className="font-archivo font-black text-2xl text-[#0A192F] mt-1 block">{bundles.length}</span>
          <span className="text-[10px] text-[#64748B]">All generated quotations</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e9edf4] shadow-2xs">
          <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider block">Paid &amp; Confirmed</span>
          <span className="font-archivo font-black text-2xl text-[#10B981] mt-1 block">{paidBundlesCount}</span>
          <span className="text-[10px] text-[#64748B]">Processed via Cards / UPI</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e9edf4] shadow-2xs">
          <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider block">Pending Payment</span>
          <span className="font-archivo font-black text-2xl text-[#F59E0B] mt-1 block">{pendingBundlesCount}</span>
          <span className="text-[10px] text-[#64748B]">Awaiting client checkout</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e9edf4] shadow-2xs">
          <span className="text-[11px] font-bold text-[#0066FF] uppercase tracking-wider block">Bundle Revenue</span>
          <span className="font-archivo font-black text-2xl text-[#0066FF] mt-1 block">
            ₹{totalPaidRevenue.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-[#64748B]">Realized via bundle links</span>
        </div>
      </div>

      {/* RECENTLY CREATED SUCCESS BANNER */}
      {recentlyCreatedBundle && (
        <div className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white font-archivo font-bold text-xs uppercase px-3 py-1 rounded-full">
                Custom Link Generated
              </span>
              <span className="text-white/80 font-mono text-xs">{recentlyCreatedBundle.bundleId}</span>
            </div>
            <h3 className="font-archivo font-bold text-xl sm:text-2xl text-white">
              {recentlyCreatedBundle.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90">
              Total Amount: <strong>₹{recentlyCreatedBundle.totalAmount.toLocaleString("en-IN")}.00</strong> • {recentlyCreatedBundle.items.length} Products Included
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleCopyLink(recentlyCreatedBundle.bundleId)}
              className="bg-white text-[#0066FF] font-archivo font-bold text-xs px-5 py-3 rounded-xl shadow-md hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 cursor-pointer"
            >
              {copiedId === recentlyCreatedBundle.bundleId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === recentlyCreatedBundle.bundleId ? "Copied Link!" : "Copy Payment Link"}</span>
            </button>

            <a
              href={`/bundle/${recentlyCreatedBundle.bundleId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white font-archivo font-bold text-xs px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Preview Link</span>
            </a>

            <button
              onClick={() => handleShareWhatsApp(recentlyCreatedBundle)}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-archivo font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp Link</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. POPUP MODAL: INTERACTIVE BUNDLE BUILDER */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#e9edf4] shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center shadow-md shrink-0">
                  <PackagePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-archivo font-extrabold text-lg sm:text-xl text-[#0A192F]">
                    Assemble Custom Product Bundle
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Select products from the catalog, configure custom prices, and generate a client payment link.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="w-9 h-9 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0A192F] flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleCreateBundle} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Meta Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-archivo font-bold text-[#0A192F] uppercase">
                    Bundle Quotation Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={bundleTitle}
                    onChange={(e) => setBundleTitle(e.target.value)}
                    placeholder="e.g. ICU Ventilation Therapy Setup (Dr. Sharma - Apollo)"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-archivo font-bold text-[#0A192F] uppercase">
                    Validity / Expiry
                  </label>
                  <select
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value={7}>Valid for 7 Days</option>
                    <option value={15}>Valid for 15 Days</option>
                    <option value={30}>Valid for 30 Days</option>
                    <option value={0}>No Expiry (Always Active)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-archivo font-bold text-[#0A192F] uppercase">
                    Client / Hospital Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Fortis Hospital Bannerghatta"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-archivo font-bold text-[#0A192F] uppercase">
                    Client Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. procurement@fortis.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-archivo font-bold text-[#0A192F] uppercase">
                    Client Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-3">
                  <label className="text-xs font-archivo font-bold text-[#0A192F] uppercase">
                    Terms / Clinical Notes (Shown on Quotation Page)
                  </label>
                  <textarea
                    rows={2}
                    value={bundleDescription}
                    onChange={(e) => setBundleDescription(e.target.value)}
                    placeholder="e.g. Package includes 2 Years Official German Clinical Warranty, Free Patient Mask Interfaces, and complimentary on-site biomedical installation."
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              {/* TWO-COLUMN BUILDER MATRIX */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-[#F1F5F9]">
                {/* LEFT COLUMN: All Catalog Equipment Picker (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-archivo font-bold text-sm text-[#0A192F] uppercase tracking-wider">
                        1. Select Equipment From Catalog
                      </h4>
                      <p className="text-[11px] text-[#64748B]">
                        Includes all {allAvailableProducts.length} devices (both listed prices and unlisted / Price on Request).
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#0066FF] bg-[#EBF5FF] px-2.5 py-1 rounded-full">
                      {filteredProducts.length} Available
                    </span>
                  </div>

                  {/* Filters */}
                  <div className="space-y-2 bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
                    <div className="relative">
                      <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Search any product or SKU..."
                        className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-[#E2E8F0] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      {/* Category Pills */}
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[11px] font-semibold text-[#0A192F]"
                      >
                        <option value="all">All Categories</option>
                        {categoriesList.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      {/* Price Status Pills */}
                      <div className="flex items-center border border-[#E2E8F0] rounded-lg overflow-hidden bg-white text-[11px] font-semibold">
                        <button
                          type="button"
                          onClick={() => setPriceStatusFilter("all")}
                          className={`px-2.5 py-1.5 ${priceStatusFilter === "all" ? "bg-[#0066FF] text-white" : "text-[#64748B]"}`}
                        >
                          All
                        </button>
                        <button
                          type="button"
                          onClick={() => setPriceStatusFilter("listed")}
                          className={`px-2.5 py-1.5 ${priceStatusFilter === "listed" ? "bg-[#0066FF] text-white" : "text-[#64748B]"}`}
                        >
                          Listed Prices
                        </button>
                        <button
                          type="button"
                          onClick={() => setPriceStatusFilter("unlisted")}
                          className={`px-2.5 py-1.5 ${priceStatusFilter === "unlisted" ? "bg-[#0066FF] text-white" : "text-[#64748B]"}`}
                        >
                          Price on Request
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Products List (Scrollable) */}
                  <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                    {filteredProducts.length === 0 ? (
                      <div className="py-8 text-center text-xs text-[#64748B]">
                        No equipment found matching criteria.
                      </div>
                    ) : (
                      filteredProducts.map((p) => {
                        const hasPrice = typeof p.price === "number" && p.price > 0;
                        const isSelected = selectedItems.some((it) => it.product.id === p.id);
                        const selectedCount = selectedItems.find((it) => it.product.id === p.id)?.quantity || 0;

                        return (
                          <div
                            key={p.id}
                            className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                              isSelected
                                ? "bg-[#EBF5FF]/50 border-[#0066FF]/40 shadow-xs"
                                : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 rounded-xl object-contain bg-[#F8FAFC] p-1 border border-[#E2E8F0] shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="font-archivo font-bold text-xs text-[#0A192F] block truncate">
                                  {p.name}
                                </span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] text-[#64748B] truncate">
                                    {p.category}
                                  </span>
                                  <span
                                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                                      hasPrice
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        : "bg-amber-50 text-amber-700 border border-amber-200"
                                    }`}
                                  >
                                    {hasPrice ? `Catalog: ₹${p.price?.toLocaleString("en-IN")}` : "Price on Request"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0">
                              <button
                                type="button"
                                onClick={() => handleAddProductToBundle(p)}
                                className={`px-3 py-1.5 rounded-xl font-archivo font-bold text-xs flex items-center gap-1 cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-[#0066FF] text-white shadow-xs"
                                    : "bg-[#F1F5F9] text-[#0A192F] hover:bg-[#E2E8F0]"
                                }`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>{isSelected ? `Added (${selectedCount})` : "Add"}</span>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN: Selected Bundle Items & Custom Price Matrix (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0] space-y-4">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                      <h4 className="font-archivo font-bold text-sm text-[#0A192F] uppercase tracking-wider">
                        2. Bundle Items &amp; Custom Pricing
                      </h4>
                      <span className="text-xs font-bold text-[#0066FF]">
                        {selectedItems.length} Products
                      </span>
                    </div>

                    {/* Items List with Price Controls */}
                    <div className="space-y-3 mt-3 max-h-[340px] overflow-y-auto pr-1">
                      {selectedItems.length === 0 ? (
                        <div className="py-12 text-center text-[#64748B] space-y-2">
                          <PackagePlus className="w-8 h-8 mx-auto text-[#94A3B8]" />
                          <p className="text-xs">No products added yet.</p>
                          <p className="text-[11px] text-[#94A3B8]">
                            Click "+ Add" on any equipment in the left catalog to assemble this bundle.
                          </p>
                        </div>
                      ) : (
                        selectedItems.map((it) => {
                          const itemSubtotal = it.customPrice * it.quantity;

                          return (
                            <div
                              key={it.product.id}
                              className="bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-2xs space-y-2.5"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <img
                                    src={it.product.image || "/images/pulmocare/pulmocare_prisma-smart.png"}
                                    alt={it.product.name}
                                    className="w-12 h-12 rounded-xl object-contain bg-[#F8FAFC] p-1 border border-[#E2E8F0] shadow-2xs shrink-0"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <span className="font-archivo font-bold text-xs text-[#0A192F] block truncate" title={it.product.name}>
                                      {it.product.name}
                                    </span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      <span className="text-[10px] text-[#64748B] truncate">
                                        {it.product.category || "Medical Equipment"}
                                      </span>
                                      <span className="text-[9px] font-semibold text-[#CBD5E1]">•</span>
                                      <span className="text-[10px] font-medium text-[#64748B]">
                                        {it.product.price ? `Catalog: ₹${it.product.price.toLocaleString("en-IN")}` : "Catalog: Unlisted"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(it.product.id)}
                                  className="text-[#94A3B8] hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Price & Quantity Adjuster Row */}
                              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#F1F5F9]">
                                {/* Quantity Controls */}
                                <div>
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                                    Quantity
                                  </span>
                                  <div className="flex items-center border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] h-8 px-1">
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateItemQuantity(it.product.id, it.quantity - 1)}
                                      className="w-6 h-6 flex items-center justify-center text-[#64748B] hover:text-[#0A192F] cursor-pointer"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="flex-1 text-center font-archivo font-bold text-xs text-[#0A192F]">
                                      {it.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateItemQuantity(it.product.id, it.quantity + 1)}
                                      className="w-6 h-6 flex items-center justify-center text-[#64748B] hover:text-[#0A192F] cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>

                                {/* Custom Unit Price Input (Fixed Zero Issue: Image 2) */}
                                <div>
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                                    Custom Unit Price (₹)
                                  </span>
                                  <div className="relative">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#64748B] font-mono">
                                      ₹
                                    </span>
                                    <input
                                      type="number"
                                      min={0}
                                      value={it.customPrice === 0 ? "" : it.customPrice}
                                      placeholder="0"
                                      onFocus={(e) => e.target.select()}
                                      onChange={(e) => {
                                        const raw = e.target.value;
                                        handleUpdateCustomPrice(it.product.id, raw === "" ? 0 : Math.max(0, Number(raw)));
                                      }}
                                      className="w-full pl-6 pr-2 py-1 h-8 rounded-lg border border-[#E2E8F0] bg-white font-archivo font-bold text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Quick Adjustments Pills & Item Total */}
                              <div className="flex items-center justify-between pt-1 text-[10px]">
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleApplyQuickAdjustment(it.product.id, -10)}
                                    className="px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] font-semibold"
                                    title="Discount 10%"
                                  >
                                    -10%
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleApplyQuickAdjustment(it.product.id, -5)}
                                    className="px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] font-semibold"
                                    title="Discount 5%"
                                  >
                                    -5%
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleApplyQuickAdjustment(it.product.id, 10)}
                                    className="px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] font-semibold"
                                    title="Add 10%"
                                  >
                                    +10%
                                  </button>
                                  {it.product.price && (
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateCustomPrice(it.product.id, it.product.price || 0)}
                                      className="px-1.5 py-0.5 rounded bg-[#EBF5FF] text-[#0066FF] hover:bg-[#dcebfb] font-semibold"
                                      title="Reset to Catalog"
                                    >
                                      Reset
                                    </button>
                                  )}
                                </div>

                                <span className="font-archivo font-bold text-xs text-[#0A192F]">
                                  Subtotal: ₹{itemSubtotal.toLocaleString("en-IN")}.00
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Summary & Price Adjustment */}
                  {selectedItems.length > 0 && (
                    <div className="pt-3 border-t border-[#E2E8F0] space-y-2.5 text-xs">
                      <div className="flex justify-between text-[#64748B]">
                        <span>Items Custom Subtotal:</span>
                        <span className="font-archivo font-bold text-[#0A192F]">
                          ₹{draftSubtotal.toLocaleString("en-IN")}.00
                        </span>
                      </div>

                      {/* Discounted Price Section (Feature: Image 3 & Fixed Zero Issue) */}
                      <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="font-archivo font-bold text-xs text-[#0A192F] block">
                              Discounted Price (₹):
                            </span>
                            <span className="text-[10px] text-[#64748B] block truncate">
                              {effectiveDiscount > 0
                                ? `Special discount applied: ₹${effectiveDiscount.toLocaleString("en-IN")} (${((effectiveDiscount / (draftSubtotal || 1)) * 100).toFixed(1)}% off)`
                                : "Set final package discounted price"}
                            </span>
                          </div>
                          <div className="w-36 relative shrink-0">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#64748B] font-mono">₹</span>
                            <input
                              type="number"
                              min={0}
                              value={
                                customDiscountedPrice !== null
                                  ? (customDiscountedPrice === 0 ? "" : customDiscountedPrice)
                                  : (discountAmount > 0
                                      ? (draftSubtotal - discountAmount === 0 ? "" : draftSubtotal - discountAmount)
                                      : (draftSubtotal === 0 ? "" : draftSubtotal))
                              }
                              placeholder={draftSubtotal > 0 ? draftSubtotal.toString() : "0"}
                              onFocus={(e) => e.target.select()}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === "") {
                                  setCustomDiscountedPrice(null);
                                  setDiscountAmount(0);
                                } else {
                                  const num = Math.max(0, Number(val));
                                  setCustomDiscountedPrice(num);
                                  setDiscountAmount(Math.max(0, draftSubtotal - num));
                                }
                              }}
                              className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] font-archivo font-bold text-xs text-right text-[#0066FF] focus:outline-none focus:border-[#0066FF] focus:bg-white"
                            />
                          </div>
                        </div>

                        {/* Quick Preset Buttons */}
                        <div className="flex items-center justify-between pt-1 border-t border-[#F1F5F9] text-[10px]">
                          <span className="text-[#94A3B8] font-semibold">Quick Discounts:</span>
                          <div className="flex items-center gap-1">
                            {[5, 10, 15, 20].map((pct) => (
                              <button
                                key={pct}
                                type="button"
                                onClick={() => {
                                  const discounted = Math.round(draftSubtotal * (1 - pct / 100));
                                  setCustomDiscountedPrice(discounted);
                                  setDiscountAmount(draftSubtotal - discounted);
                                }}
                                className="px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] font-semibold transition-colors cursor-pointer"
                              >
                                -{pct}%
                              </button>
                            ))}
                            {(effectiveDiscount > 0 || customDiscountedPrice !== null) && (
                              <button
                                key="reset-discount"
                                type="button"
                                onClick={() => {
                                  setCustomDiscountedPrice(null);
                                  setDiscountAmount(0);
                                }}
                                className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-colors cursor-pointer"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm font-extrabold text-[#0A192F] pt-2 border-t border-[#E2E8F0]">
                        <span>Final Client Payable:</span>
                        <span className="font-archivo text-base text-[#0066FF]">
                          ₹{draftFinalTotal.toLocaleString("en-IN")}.00
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn btn-primary !py-3.5 !text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? "Generating Link..." : "Generate Custom Payment Link"}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. GENERATED BUNDLES MANAGEMENT TABLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e9edf4] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
          <div>
            <h3 className="font-archivo font-extrabold text-xl text-[#0A192F]">
              Generated Product Bundles ({filteredBundles.length})
            </h3>
            <p className="text-xs text-[#64748B]">
              Shareable links, quotation records, and live payment status tracking.
            </p>
          </div>

          {/* Search & Status Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={bundleSearch}
                onChange={(e) => setBundleSearch(e.target.value)}
                placeholder="Search bundle ID or client..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#0A192F]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Pending Payment</option>
              <option value="paid">Paid &amp; Confirmed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {filteredBundles.length === 0 ? (
          <div className="py-16 text-center text-[#64748B] space-y-3">
            <PackagePlus className="w-12 h-12 mx-auto text-[#94A3B8]" />
            <h4 className="font-archivo font-bold text-base text-[#0A192F]">No Bundles Found</h4>
            <p className="text-xs max-w-sm mx-auto">
              Create your first custom equipment bundle to generate instant payment links for hospitals and clients.
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="btn btn-primary !py-2.5 !px-5 text-xs inline-flex items-center gap-1.5 cursor-pointer mt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Bundle Now</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase tracking-wider text-[10px] font-archivo">
                  <th className="py-3 px-3 whitespace-nowrap">Bundle Reference</th>
                  <th className="py-3 px-3 min-w-[200px]">Title &amp; Client</th>
                  <th className="py-3 px-3 min-w-[210px] whitespace-nowrap">Equipment Included</th>
                  <th className="py-3 px-3 text-right whitespace-nowrap">Total Price</th>
                  <th className="py-3 px-3 text-center whitespace-nowrap">Status</th>
                  <th className="py-3 px-3 text-center whitespace-nowrap">Share &amp; Payment Link</th>
                  <th className="py-3 px-3 text-right min-w-[160px] whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filteredBundles.map((b) => {
                  const isPaid = b.status === "paid";

                  return (
                    <React.Fragment key={b.bundleId}>
                      <tr className={`${isPaid ? "bg-emerald-50/25 hover:bg-emerald-50/45" : "hover:bg-[#F8FAFC]"} transition-colors`}>
                        {/* Bundle ID */}
                        <td className="py-3.5 px-3">
                          <button
                            type="button"
                            onClick={() => setDetailedViewBundle(b)}
                            className="font-mono font-bold text-xs text-[#0066FF] hover:underline block text-left cursor-pointer"
                            title="Click to view detailed dossier"
                          >
                            {b.bundleId}
                          </button>
                          <span className="text-[10px] text-[#64748B]">
                            {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "Active"}
                          </span>
                        </td>

                        {/* Title & Client */}
                        <td className="py-3.5 px-3 max-w-[220px]">
                          <span className="font-archivo font-bold text-xs text-[#0A192F] block truncate">
                            {b.title}
                          </span>
                          {b.clientName ? (
                            <span className="text-[11px] text-[#64748B] block truncate">
                              Client: <strong>{b.clientName}</strong>
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#94A3B8] italic">General Quotation</span>
                          )}
                          {isPaid && b.paymentDetails?.payerName && (
                            <span className="text-[10px] text-emerald-700 block truncate font-medium">
                              Paid by: {b.paymentDetails.payerName}
                            </span>
                          )}
                        </td>

                        {/* Equipment Thumbnails with Expand Action (Fixed Alignment: Image 4) */}
                        <td className="py-3.5 px-3 min-w-[210px] whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setExpandedBundleId(expandedBundleId === b.bundleId ? null : b.bundleId)}
                            className="inline-flex items-center gap-3 shrink-0 whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer group text-left"
                            title="Click to view all products in this bundle"
                          >
                            <div className="flex items-center -space-x-2.5 shrink-0">
                              {b.items.slice(0, 3).map((item, idx) => (
                                <img
                                  key={idx}
                                  src={item.image}
                                  alt={item.name}
                                  className="w-9 h-9 rounded-full object-contain bg-white p-1 border-2 border-white shadow-xs shrink-0 ring-1 ring-slate-200"
                                  title={`${item.name} (Qty: ${item.quantity})`}
                                />
                              ))}
                            </div>
                            <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF5FF] text-[#0066FF] text-[11px] font-bold group-hover:bg-[#dbeafe] transition-colors shadow-2xs">
                              <span>{b.items.length} {b.items.length === 1 ? "device" : "devices"}</span>
                              <ChevronDown className={`w-3.5 h-3.5 text-[#0066FF] transition-transform ${expandedBundleId === b.bundleId ? "rotate-180" : ""}`} />
                            </span>
                          </button>
                        </td>

                        {/* Total Price */}
                        <td className="py-3.5 px-3 text-right font-archivo font-bold text-sm text-[#0A192F] whitespace-nowrap">
                          ₹{b.totalAmount.toLocaleString("en-IN")}.00
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          {isPaid ? (
                            <div className="inline-flex flex-col items-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>PAID</span>
                              </span>
                              {b.paymentDetails?.transactionId && (
                                <span className="text-[9px] font-mono text-[#0066FF] mt-1 max-w-[130px] truncate" title={b.paymentDetails.transactionId}>
                                  {b.paymentDetails.transactionId}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Pending Payment</span>
                            </span>
                          )}
                        </td>

                        {/* Share & Copy Link */}
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleCopyLink(b.bundleId)}
                              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                isPaid
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  : "border-[#E2E8F0] bg-white text-[#0066FF] hover:bg-[#EBF5FF]"
                              }`}
                              title={isPaid ? "Copy link (Quotation Paid)" : "Copy custom payment link"}
                            >
                              {copiedId === b.bundleId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>

                            <a
                              href={`/bundle/${b.bundleId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0A192F] hover:bg-[#F8FAFC] transition-colors"
                              title="Open preview page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            <button
                              type="button"
                              onClick={() => handleShareWhatsApp(b)}
                              className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#25D366] hover:bg-emerald-50 transition-colors cursor-pointer"
                              title="Share on WhatsApp"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Actions: Detailed View Button (Feature: Image 5) & Delete */}
                        <td className="py-3.5 px-3 text-right min-w-[160px] whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setDetailedViewBundle(b)}
                              className="px-3 py-1.5 rounded-xl border border-[#0066FF]/25 bg-[#EBF5FF] hover:bg-[#0066FF] text-[#0066FF] hover:text-white transition-all font-archivo font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              title="View full customer dossier & payment details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Detailed View</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete bundle ${b.bundleId}?`)) {
                                  deleteBundle(b.bundleId);
                                  addToast("Bundle Deleted", `Quotation ${b.bundleId} has been removed.`);
                                }
                              }}
                              className="p-1.5 text-[#94A3B8] hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete bundle"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Item Details Row */}
                      {expandedBundleId === b.bundleId && (
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] animate-in fade-in duration-200">
                          <td colSpan={7} className="p-4 sm:p-5">
                            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs space-y-4">
                              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-archivo font-extrabold text-[#0A192F] uppercase tracking-wider">
                                      Bundle Equipment Details ({b.items.length} Items)
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF5FF] text-[#0066FF] font-mono">
                                      {b.bundleId}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#64748B] mt-0.5">
                                    {b.clientName ? `Prepared specifically for ${b.clientName}` : "General Clinical Quotation"} • Total: ₹{b.totalAmount.toLocaleString("en-IN")}.00
                                  </p>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setDetailedViewBundle(b)}
                                    className="px-3 py-1.5 rounded-xl border border-[#0066FF]/30 bg-[#EBF5FF] hover:bg-[#0066FF] text-[#0066FF] hover:text-white font-archivo font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Detailed View</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyLink(b.bundleId)}
                                    className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EBF5FF] text-[#0066FF] font-archivo font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                                  >
                                    {copiedId === b.bundleId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedId === b.bundleId ? "Copied!" : "Copy Link"}</span>
                                  </button>
                                  <a
                                    href={`/bundle/${b.bundleId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-archivo font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>Open In New Tab</span>
                                  </a>
                                </div>
                              </div>

                              {/* Equipment Cards Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {b.items.map((it, idx) => (
                                  <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3">
                                    <img
                                      src={it.image}
                                      alt={it.name}
                                      className="w-12 h-12 rounded-lg object-contain bg-white p-1 border border-[#E2E8F0] shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <span className="font-archivo font-bold text-xs text-[#0A192F] block truncate" title={it.name}>
                                        {it.name}
                                      </span>
                                      <span className="text-[10px] text-[#64748B] block truncate">
                                        {it.category}
                                      </span>
                                      <div className="flex items-center justify-between text-[11px] mt-1 pt-1 border-t border-[#E2E8F0]/70">
                                        <span className="text-[#64748B]">
                                          Qty: <strong className="text-[#0A192F]">{it.quantity}</strong> × ₹{it.customPrice.toLocaleString("en-IN")}
                                        </span>
                                        <span className="font-mono font-bold text-[#0066FF]">
                                          ₹{(it.customPrice * it.quantity).toLocaleString("en-IN")}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Shareable Link Bar */}
                              <div className="flex items-center gap-2 pt-2 border-t border-[#F1F5F9]">
                                <span className="text-[10px] font-bold uppercase text-[#64748B] shrink-0">
                                  Direct Customer Link:
                                </span>
                                <input
                                  type="text"
                                  readOnly
                                  value={getCustomLink(b.bundleId)}
                                  onClick={(e) => (e.target as HTMLInputElement).select()}
                                  className="flex-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] font-mono text-[11px] text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. COMPREHENSIVE CUSTOMER & QUOTATION DETAILED VIEW MODAL (Feature: Image 5) */}
      {detailedViewBundle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#e9edf4] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center shadow-md shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-archivo font-extrabold text-base sm:text-lg text-[#0A192F] truncate">
                      Customer Dossier &amp; Quotation Details
                    </h3>
                    <span className="font-mono text-xs font-bold text-[#0066FF] bg-[#EBF5FF] px-2.5 py-0.5 rounded-full shrink-0">
                      {detailedViewBundle.bundleId}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] truncate">
                    {detailedViewBundle.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {detailedViewBundle.status === "paid" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PAID &amp; CONFIRMED</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>PENDING PAYMENT</span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-9 h-9 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0A192F] flex items-center justify-center transition-colors cursor-pointer"
                  title="Print Quotation Dossier"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setDetailedViewBundle(null)}
                  className="w-9 h-9 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0A192F] flex items-center justify-center transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* 4 Financial & Payment Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Total Amount</span>
                  <span className="font-archivo font-black text-xl text-[#0A192F] mt-1 block">
                    ₹{detailedViewBundle.totalAmount.toLocaleString("en-IN")}.00
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    {detailedViewBundle.status === "paid" ? "Paid in full" : "Payable by customer"}
                  </span>
                </div>

                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Payment Status</span>
                  <span className={`font-archivo font-bold text-sm mt-1 block uppercase ${detailedViewBundle.status === "paid" ? "text-emerald-700" : "text-amber-700"}`}>
                    {detailedViewBundle.status === "paid" ? "Payment Verified" : "Pending Checkout"}
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    {detailedViewBundle.paymentDetails?.paymentMethod
                      ? `Via ${detailedViewBundle.paymentDetails.paymentMethod.toUpperCase()}`
                      : "Razorpay / Cards / UPI"}
                  </span>
                </div>

                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Transaction / UTR</span>
                  <span className="font-mono font-bold text-xs text-[#0066FF] mt-1 block truncate" title={detailedViewBundle.paymentDetails?.transactionId || "N/A"}>
                    {detailedViewBundle.paymentDetails?.transactionId || "Awaiting Payment"}
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    {detailedViewBundle.paymentDetails?.paidAt
                      ? new Date(detailedViewBundle.paymentDetails.paidAt).toLocaleDateString()
                      : "Not yet processed"}
                  </span>
                </div>

                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Order Reference</span>
                  <span className="font-mono font-bold text-xs text-[#0A192F] mt-1 block truncate">
                    {detailedViewBundle.paymentDetails?.orderId || detailedViewBundle.bundleId}
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    {detailedViewBundle.expiresAt ? `Valid till ${new Date(detailedViewBundle.expiresAt).toLocaleDateString()}` : "No expiry"}
                  </span>
                </div>
              </div>

              {/* Customer Details & Quotation Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Customer & Shipping Details */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#F1F5F9]">
                    <div className="w-7 h-7 rounded-lg bg-[#EBF5FF] text-[#0066FF] flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-archivo font-bold text-sm text-[#0A192F]">
                        Customer &amp; Shipping Profile
                      </h4>
                      <p className="text-[10px] text-[#64748B]">
                        Details provided by the customer for checkout &amp; delivery
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Full Name:</span>
                      <span className="font-archivo font-bold text-[#0A192F] text-sm">
                        {detailedViewBundle.paymentDetails?.payerName || detailedViewBundle.clientName || "Not Provided Yet"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Phone Number:</span>
                        {detailedViewBundle.paymentDetails?.payerPhone || detailedViewBundle.clientPhone ? (
                          <a
                            href={`tel:${detailedViewBundle.paymentDetails?.payerPhone || detailedViewBundle.clientPhone}`}
                            className="font-semibold text-[#0066FF] hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <Phone className="w-3 h-3 shrink-0" />
                            <span>{detailedViewBundle.paymentDetails?.payerPhone || detailedViewBundle.clientPhone}</span>
                          </a>
                        ) : (
                          <span className="text-[#64748B]">Not provided</span>
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Email Address:</span>
                        {detailedViewBundle.paymentDetails?.payerEmail || detailedViewBundle.clientEmail ? (
                          <a
                            href={`mailto:${detailedViewBundle.paymentDetails?.payerEmail || detailedViewBundle.clientEmail}`}
                            className="font-semibold text-[#0066FF] hover:underline flex items-center gap-1 mt-0.5 truncate"
                          >
                            <Mail className="w-3 h-3 shrink-0" />
                            <span className="truncate">{detailedViewBundle.paymentDetails?.payerEmail || detailedViewBundle.clientEmail}</span>
                          </a>
                        ) : (
                          <span className="text-[#64748B]">Not provided</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Delivery / Shipping Address:</span>
                      <div className="flex items-start gap-1.5 mt-0.5 text-[#0A192F]">
                        <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                        <span>
                          {detailedViewBundle.paymentDetails?.shippingAddress
                            ? `${detailedViewBundle.paymentDetails.shippingAddress}, ${detailedViewBundle.paymentDetails.city || ""}, ${detailedViewBundle.paymentDetails.state || ""} - ${detailedViewBundle.paymentDetails.pincode || ""}`
                            : (detailedViewBundle.status === "paid" ? "Registered Healthcare Facility Delivery" : "Customer will provide delivery address when completing payment via link.")}
                        </span>
                      </div>
                    </div>

                    {detailedViewBundle.paymentDetails?.city && (
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F1F5F9] text-[11px]">
                        <div>
                          <span className="text-[#94A3B8] block text-[9px] uppercase font-bold">City</span>
                          <span className="font-semibold text-[#0A192F]">{detailedViewBundle.paymentDetails.city}</span>
                        </div>
                        <div>
                          <span className="text-[#94A3B8] block text-[9px] uppercase font-bold">State</span>
                          <span className="font-semibold text-[#0A192F]">{detailedViewBundle.paymentDetails.state || "—"}</span>
                        </div>
                        <div>
                          <span className="text-[#94A3B8] block text-[9px] uppercase font-bold">PIN Code</span>
                          <span className="font-semibold text-[#0A192F]">{detailedViewBundle.paymentDetails.pincode}</span>
                        </div>
                      </div>
                    )}

                    {detailedViewBundle.paymentDetails?.paidAt && (
                      <div className="pt-2 border-t border-[#F1F5F9]">
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Payment Settled Timestamp:</span>
                        <span className="font-mono text-[11px] text-[#0A192F]">
                          {new Date(detailedViewBundle.paymentDetails.paidAt).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Quotation Specs & Administrative Notes */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#F1F5F9]">
                    <div className="w-7 h-7 rounded-lg bg-[#EBF5FF] text-[#0066FF] flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-archivo font-bold text-sm text-[#0A192F]">
                        Quotation Specifications
                      </h4>
                      <p className="text-[10px] text-[#64748B]">
                        Parameters set during bundle generation
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Assigned Client / Facility:</span>
                      <span className="font-archivo font-bold text-[#0A192F]">
                        {detailedViewBundle.clientName || "General Quotation (Open link for any client)"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Created On:</span>
                        <span className="text-[#0A192F]">
                          {detailedViewBundle.createdAt ? new Date(detailedViewBundle.createdAt).toLocaleString("en-IN") : "—"}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Offer Validity:</span>
                        <span className="text-[#0A192F]">
                          {detailedViewBundle.expiresAt ? new Date(detailedViewBundle.expiresAt).toLocaleDateString("en-IN") : "No Expiry (Always Active)"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Clinical Notes &amp; Terms:</span>
                      <p className="text-[#64748B] mt-0.5 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-[11px] leading-relaxed">
                        {detailedViewBundle.description || "Package includes 2 Years Official German Clinical Warranty, Free Patient Mask Interfaces, and complimentary on-site biomedical installation."}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F1F5F9]">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">Direct Custom Payment Link:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={getCustomLink(detailedViewBundle.bundleId)}
                          onClick={(e) => (e.target as HTMLInputElement).select()}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] font-mono text-[11px] text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                        />
                        <button
                          type="button"
                          onClick={() => handleCopyLink(detailedViewBundle.bundleId)}
                          className="px-3 py-1.5 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white font-archivo font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Included Equipment Table */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xs">
                <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-archivo font-bold text-xs uppercase tracking-wider text-[#0A192F]">
                      Equipment Included in Bundle ({detailedViewBundle.items.length} Products)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#0066FF]">
                    Total Devices: {detailedViewBundle.items.reduce((acc, it) => acc + it.quantity, 0)} Units
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase tracking-wider text-[10px] font-archivo bg-white">
                        <th className="py-2.5 px-4">Product Details</th>
                        <th className="py-2.5 px-3 text-center">Catalog Price</th>
                        <th className="py-2.5 px-3 text-right">Quoted Unit Price</th>
                        <th className="py-2.5 px-3 text-center">Quantity</th>
                        <th className="py-2.5 px-4 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {detailedViewBundle.items.map((it, idx) => (
                        <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={it.image}
                                alt={it.name}
                                className="w-10 h-10 rounded-xl object-contain bg-white p-1 border border-[#E2E8F0] shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="font-archivo font-bold text-xs text-[#0A192F] block truncate">
                                  {it.name}
                                </span>
                                <span className="text-[10px] text-[#64748B] block">
                                  {it.category}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3 text-center text-[#64748B]">
                            {it.catalogPrice ? `₹${it.catalogPrice.toLocaleString("en-IN")}` : "Unlisted"}
                          </td>

                          <td className="py-3 px-3 text-right font-archivo font-bold text-[#0A192F]">
                            ₹{it.customPrice.toLocaleString("en-IN")}.00
                          </td>

                          <td className="py-3 px-3 text-center font-bold text-[#0A192F]">
                            ×{it.quantity}
                          </td>

                          <td className="py-3 px-4 text-right font-mono font-bold text-[#0066FF]">
                            ₹{(it.customPrice * it.quantity).toLocaleString("en-IN")}.00
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Subtotal & Final Price Footer */}
                <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#64748B]">
                    <span>Items Custom Subtotal:</span>
                    <span className="font-mono font-bold text-[#0A192F]">
                      ₹{detailedViewBundle.items.reduce((acc, it) => acc + it.customPrice * it.quantity, 0).toLocaleString("en-IN")}.00
                    </span>
                  </div>

                  {detailedViewBundle.discountAmount ? (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discounted Price Deduction:</span>
                      <span className="font-mono font-bold">
                        -₹{detailedViewBundle.discountAmount.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                  ) : null}

                  <div className="flex justify-between text-base font-extrabold text-[#0A192F] pt-2 border-t border-[#E2E8F0]">
                    <span>Final Amount Paid / Payable:</span>
                    <span className="font-archivo text-lg text-[#0066FF]">
                      ₹{detailedViewBundle.totalAmount.toLocaleString("en-IN")}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions Footer */}
            <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyLink(detailedViewBundle.bundleId)}
                  className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#EBF5FF] text-[#0066FF] font-archivo font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  {copiedId === detailedViewBundle.bundleId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === detailedViewBundle.bundleId ? "Copied!" : "Copy Payment Link"}</span>
                </button>

                <a
                  href={`/bundle/${detailedViewBundle.bundleId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-archivo font-bold text-xs flex items-center gap-2 transition-colors shadow-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Checkout Page</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(detailedViewBundle)}
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-archivo font-bold text-xs flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share WhatsApp</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setDetailedViewBundle(null)}
                className="px-5 py-2 rounded-xl bg-white hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0A192F] border border-[#E2E8F0] font-archivo font-bold text-xs transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

