"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/context/ToastContext";
import { Product } from "@/types/product";
import { BlogPost } from "@/data/blog_posts";
import {
  LayoutDashboard,
  Package,
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
  TrendingUp,
  TrendingDown,
  Truck,
  MapPin,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Filter,
  Check,
  Phone,
  Mail,
  Sliders,
  Settings,
  HelpCircle,
  Users,
} from "lucide-react";

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
  } = useAdmin();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "blogs" | "tracking" | "messages">("dashboard");

  // Search & Filter States
  const [globalSearch, setGlobalSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [blogSearch, setBlogSearch] = useState("");

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Blog Modal State
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Product Form Fields
  const [pId, setPId] = useState("");
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("Ventilation & Sleep");
  const [pPrice, setPPrice] = useState("");
  const [pOriginalPrice, setPOriginalPrice] = useState("");
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");

  // Blog Form Fields
  const [bSlug, setBSlug] = useState("");
  const [bTitle, setBTitle] = useState("");
  const [bCategory, setBCategory] = useState<any>("Sleep Therapy");
  const [bAuthor, setBAuthor] = useState("");
  const [bReadTime, setBReadTime] = useState("");
  const [bImage, setBImage] = useState("");
  const [bExcerpt, setBExcerpt] = useState("");
  const [bContentText, setBContentText] = useState("");

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
      setPPrice(prod.price.toString());
      setPOriginalPrice((prod.originalPrice || prod.price * 1.3).toString());
      setPImage(prod.image);
      setPDescription(prod.description);
    } else {
      setEditingProduct(null);
      setPId(`prod-${Date.now()}`);
      setPName("");
      setPCategory("Ventilation & Sleep");
      setPPrice("45990");
      setPOriginalPrice("65000");
      setPImage("/images/pulmocare/pulmocare_prisma-smart.png");
      setPDescription("High-performance respiratory medical equipment.");
    }
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const prodObj: Product = {
      id: pId || `prod-${Date.now()}`,
      name: pName,
      category: pCategory as any,
      price: parseFloat(pPrice) || 0,
      originalPrice: parseFloat(pOriginalPrice) || 0,
      image: pImage || "/images/pulmocare/pulmocare_prisma-smart.png",
      rating: 5,
      reviewsCount: 2,
      inStock: true,
      description: pDescription,
      specifications: [],
    };

    if (editingProduct) {
      updateProduct(prodObj);
      addToast("Product Updated", `Updated ${pName} successfully.`);
    } else {
      addProduct(prodObj);
      addToast("Product Created", `Added new product ${pName}.`);
    }
    setProductModalOpen(false);
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
      setBImage(blog.image);
      setBExcerpt(blog.excerpt);
      setBContentText(blog.content.join("\n\n"));
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
    const blogObj: BlogPost = {
      slug: bSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      title: bTitle,
      category: bCategory,
      author: bAuthor,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: bReadTime || "5 min read",
      image: bImage || "/images/pulmocare/pulmocare_prisma-smart.png",
      excerpt: bExcerpt,
      content: bContentText.split("\n\n").filter((p) => p.trim() !== ""),
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

  // Sample Shipments Activity Data (Matching reference screenshot)
  const activityData = [
    { id: "CA-12321-ID", date: "12/11/2024", origin: "Bengaluru, IN", destination: "Jakarta, ID", status: "On Progress", color: "bg-amber-100 text-amber-700" },
    { id: "NY-12321-SF", date: "14/11/2024", origin: "Delhi, IN", destination: "San Francisco, US", status: "On Progress", color: "bg-[#EBF5FF] text-[#0066FF] font-semibold" },
    { id: "CGK-12321-NY", date: "14/11/2024", origin: "Mumbai, IN", destination: "New York, US", status: "Pending", color: "bg-pink-100 text-pink-700" },
    { id: "UK-12321-MLG", date: "18/11/2024", origin: "Chennai, IN", destination: "London, UK", status: "Delivered", color: "bg-emerald-100 text-emerald-700" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-[#1E293B] font-inter flex">
      {/* 1. LEFT SIDEBAR (Matching Reference Design) */}
      <aside className="w-64 bg-white border-r border-[#E2E8F0] p-6 flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          {/* Top Brand Logo */}
          <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/pulmocare/pulmocare_logo.png"
                alt="Pulmo Care Logo"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <button className="p-1 rounded-lg hover:bg-[#F1F5F9] text-[#64748B]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* MAIN MENU */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block px-3 mb-2">
              Main Menu
            </span>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-[#EBF5FF] text-[#0066FF] shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#EBF5FF] text-[#0066FF] shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Products Catalog</span>
              </div>
              <span className="bg-[#F1F5F9] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-[#EBF5FF] text-[#0066FF] shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Clinical Blog</span>
              </div>
              <span className="bg-[#F1F5F9] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono">{blogPosts.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("tracking")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "tracking"
                  ? "bg-[#EBF5FF] text-[#0066FF] shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF]"
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Tracking &amp; Orders</span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "messages"
                  ? "bg-[#EBF5FF] text-[#0066FF] shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Inquiries &amp; Support</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-[#0066FF] text-white text-[10px] flex items-center justify-center font-bold">4</span>
            </button>
          </div>

          {/* OTHERS SECTION */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block px-3 mb-2">
              Others
            </span>

            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF] transition-all">
              <Layers className="w-4 h-4" />
              <span>Hospital Units</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF] transition-all">
              <Users className="w-4 h-4" />
              <span>Team Members</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF] transition-all">
              <Settings className="w-4 h-4" />
              <span>System Setup</span>
            </button>
          </div>
        </div>

        {/* BOTTOM 3D PRO PROMO CARD (Matching Reference Image) */}
        <div className="bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-2xl p-4 text-white shadow-lg space-y-3 relative overflow-hidden mt-6">
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] uppercase font-bold text-cyan-200">Pro Suite</span>
            <h4 className="font-archivo font-extrabold text-lg leading-tight">50% Off Upgrade</h4>
            <p className="text-[11px] text-white/80">Unlock advanced medical analytics &amp; telehealth telemetry.</p>
          </div>
          <button className="w-full py-2 bg-white text-[#0052CC] hover:bg-cyan-50 font-archivo font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer relative z-10">
            Try Pro Free
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP UTILITY HEADER BAR (Matching Reference Image) */}
        <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
          {/* Search Deliveries Bar */}
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search deliveries, devices, or articles..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1E293B] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all font-inter"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#64748B] relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>

            <button className="p-2 rounded-full border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#64748B]">
              <Info className="w-4 h-4" />
            </button>

            {/* Admin Profile Pill */}
            <div className="flex items-center gap-3 pl-3 border-l border-[#E2E8F0]">
              <div className="w-8 h-8 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs">
                P
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-[#1E293B] block">Welcome, {adminUser?.name || "Jane"}</span>
                <span className="text-[10px] text-[#64748B]">Super Administrator</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/admin/login");
                }}
                className="p-1.5 rounded-lg hover:bg-red-50 text-[#64748B] hover:text-red-600 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* 3. MAIN DASHBOARD CONTENT */}
        <main className="p-6 md:p-8 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Header Title Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-archivo font-extrabold text-2xl md:text-3xl text-[#0F172A] tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-xs text-[#64748B]">Real-time hospital equipment distribution &amp; inventory performance.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#475569] flex items-center gap-2 shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>11 December 2024</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>

                  <button
                    onClick={() => handleOpenProductModal()}
                    className="px-5 py-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ New Device</span>
                  </button>
                </div>
              </div>

              {/* 3-COLUMN MAIN GRID (Matching Reference Layout) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* COLUMN 1 (Left 4-Cols): Stat Metric Cards Stack */}
                <div className="lg:col-span-3 space-y-5">
                  {/* Metric 1 */}
                  <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Truck className="w-4 h-4 text-[#0066FF]" />
                        On Delivery
                      </span>
                      <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> +16,5%
                      </span>
                    </div>

                    <div>
                      <h3 className="font-archivo font-extrabold text-3xl text-[#0F172A]">1,354</h3>
                      <p className="text-[11px] text-[#94A3B8]">Since last week</p>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                        Success Deliveries
                      </span>
                      <span className="text-rose-500 font-bold text-[11px] flex items-center gap-0.5">
                        <TrendingDown className="w-3 h-3" /> -0,5%
                      </span>
                    </div>

                    <div>
                      <h3 className="font-archivo font-extrabold text-3xl text-[#0F172A]">40,523</h3>
                      <p className="text-[11px] text-[#94A3B8]">Since last week</p>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Tag className="w-4 h-4 text-[#0066FF]" />
                        Revenue
                      </span>
                      <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> +5,2%
                      </span>
                    </div>

                    <div>
                      <h3 className="font-archivo font-extrabold text-3xl text-[#0F172A]">₹140,854</h3>
                      <p className="text-[11px] text-[#94A3B8]">Since last week</p>
                    </div>
                  </div>
                </div>

                {/* COLUMN 2 (Middle 5-Cols): Delivery Analytics Chart */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
                    <h3 className="font-archivo font-bold text-lg text-[#0F172A]">Delivery Analytics</h3>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-[#0066FF]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" /> Package Delivered
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold text-[#94A3B8]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" /> Reported
                      </span>
                    </div>
                  </div>

                  {/* Interactive Bar Chart Visualization (Matching Reference Screenshot) */}
                  <div className="h-64 flex items-end justify-between gap-3 pt-6 px-4 relative border-b border-[#F1F5F9]">
                    {/* Tooltip Popover on Active Bar (Sept) */}
                    <div className="absolute top-2 left-[54%] -translate-x-1/2 bg-[#0F172A] text-white p-2.5 rounded-xl text-[11px] shadow-xl z-10 space-y-1 font-mono">
                      <div className="text-[10px] text-[#94A3B8]">September 2024</div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0066FF]" /> 10,123
                      </div>
                      <div className="flex items-center justify-between gap-3 text-emerald-400 text-[10px]">
                        <span>56</span>
                        <span>+5.2%</span>
                      </div>
                    </div>

                    {/* Bar 1: Jul */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl h-36 transition-all" />
                      <span className="text-xs text-[#94A3B8] font-medium">Jul</span>
                    </div>

                    {/* Bar 2: Aug */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl h-44 transition-all" />
                      <span className="text-xs text-[#94A3B8] font-medium">Aug</span>
                    </div>

                    {/* Bar 3: Sept (ACTIVE BLUE BAR) */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#0066FF] rounded-xl h-52 shadow-md relative overflow-hidden" />
                      <span className="text-xs font-bold text-[#0066FF]">Sept</span>
                    </div>

                    {/* Bar 4: Oct */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl h-28 transition-all" />
                      <span className="text-xs text-[#94A3B8] font-medium">Oct</span>
                    </div>

                    {/* Bar 5: November */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl h-40 transition-all" />
                      <span className="text-xs text-[#94A3B8] font-medium">November</span>
                    </div>
                  </div>
                </div>

                {/* COLUMN 3 (Right 4-Cols): Live Tracker Map & Message Stack */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Tracker Widget */}
                  <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs space-y-4">
                    {/* Simulated Map Preview Container */}
                    <div className="w-full h-36 bg-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#E2E8F0]">
                      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                      <div className="relative z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-xs font-bold text-[#0F172A]">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>Live Shipment Route</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">Tracker ID</span>
                      <div className="flex items-center justify-between">
                        <h4 className="font-archivo font-extrabold text-lg text-[#0F172A]">NY-12321-SF</h4>
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">On Progress</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-3 pt-2 text-xs font-inter border-t border-[#F1F5F9]">
                      <div className="flex items-start gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] shrink-0 mt-1" />
                        <div>
                          <span className="font-bold text-[#0F172A] block">Package heading San Francisco</span>
                          <span className="text-[10px] text-[#94A3B8]">12/12/2024 — 02:00 AM</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] shrink-0 mt-1" />
                        <div>
                          <span className="font-medium text-[#64748B] block">Checking warehouse</span>
                          <span className="text-[10px] text-[#94A3B8]">11/12/2024 — 10:32 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Message Stack */}
                  <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                      <span className="font-archivo font-bold text-sm text-[#0F172A]">Quick Message</span>
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> 24 Online
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#0066FF] text-white font-bold flex items-center justify-center">E</div>
                          <div>
                            <span className="font-bold text-[#0F172A] block">Ethan</span>
                            <span className="text-[10px] text-[#94A3B8]">Online • 12/12/24</span>
                          </div>
                        </div>
                        <span className="bg-cyan-100 text-[#0066FF] text-[10px] font-bold px-2 py-0.5 rounded-full">2 new message</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM LARGE CARD: ACTIVITY DATA TABLE (Matching Reference Image) */}
              <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <h3 className="font-archivo font-bold text-lg text-[#0F172A]">Activity Data</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] font-semibold text-[#475569] flex items-center gap-1.5">
                      <span>This week</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-inter border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#E2E8F0]">
                        <th className="py-3 px-4">Delivery ID</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Departure</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {activityData.map((row) => (
                        <tr key={row.id} className="hover:bg-[#F8FAFC] transition-colors">
                          <td className="py-3.5 px-4 font-bold text-[#0066FF]">{row.id}</td>
                          <td className="py-3.5 px-4 text-[#64748B]">{row.date}</td>
                          <td className="py-3.5 px-4 text-[#475569]">{row.origin}</td>
                          <td className="py-3.5 px-4 text-[#475569]">{row.destination}</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.color}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT (CRUD) */}
          {activeTab === "products" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <h2 className="font-archivo font-extrabold text-2xl text-[#0F172A]">Products Catalog Management</h2>
                  <p className="text-xs text-[#64748B]">Create, edit, or remove medical hardware devices from your inventory.</p>
                </div>

                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1E293B] focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-inter border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#E2E8F0]">
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] p-1 flex items-center justify-center shrink-0">
                            <img src={p.image} alt={p.name} className="max-h-8 max-w-full object-contain mix-blend-multiply" />
                          </div>
                          <div>
                            <span className="font-bold text-[#0F172A] block">{p.name}</span>
                            <span className="text-[10px] text-[#94A3B8] font-mono">{p.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#64748B] font-medium">{p.category}</td>
                        <td className="py-3 px-4 font-bold text-[#0F172A]">₹{p.price.toLocaleString("en-IN")}</td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            In Stock
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenProductModal(p)}
                              className="p-1.5 rounded-lg bg-[#EBF5FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
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

          {/* TAB 3: BLOG POSTS MANAGEMENT (CRUD) */}
          {activeTab === "blogs" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <h2 className="font-archivo font-extrabold text-2xl text-[#0F172A]">Clinical Blog Articles</h2>
                  <p className="text-xs text-[#64748B]">Publish, update, or remove medical insights.</p>
                </div>

                <button
                  onClick={() => handleOpenBlogModal()}
                  className="px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Article</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles by title or topic..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1E293B] focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              {/* Blog Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-inter border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#E2E8F0]">
                      <th className="py-3 px-4">Article Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Author</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {filteredBlogs.map((b) => (
                      <tr key={b.slug} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#0F172A] block line-clamp-1">{b.title}</span>
                          <span className="text-[10px] text-[#94A3B8] font-mono">/blog/{b.slug}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-[#0066FF] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                            {b.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#64748B] font-medium">{b.author.split(",")[0]}</td>
                        <td className="py-3 px-4 text-[#64748B]">{b.date}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenBlogModal(b)}
                              className="p-1.5 rounded-lg bg-[#EBF5FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-colors cursor-pointer"
                              title="Edit article"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.slug, b.title)}
                              className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
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
        </main>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-[#E2E8F0] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-6">
              <h3 className="font-archivo font-extrabold text-2xl text-[#0F172A]">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setProductModalOpen(false)} className="p-2 rounded-full hover:bg-[#F1F5F9] text-[#64748B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  placeholder="e.g. Prisma SMART Auto CPAP"
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Category</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                  >
                    <option value="Ventilation & Sleep">Ventilation &amp; Sleep</option>
                    <option value="Diagnostic">Diagnostic</option>
                    <option value="Surgical">Surgical</option>
                    <option value="PPE & Protection">PPE &amp; Protection</option>
                  </select>
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={pPrice}
                    onChange={(e) => setPPrice(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={pImage}
                  onChange={(e) => setPImage(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={pDescription}
                  onChange={(e) => setPDescription(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E2E8F0] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT BLOG ARTICLE MODAL */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-[#E2E8F0] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-6">
              <h3 className="font-archivo font-extrabold text-2xl text-[#0F172A]">
                {editingBlog ? "Edit Article" : "Create New Clinical Article"}
              </h3>
              <button onClick={() => setBlogModalOpen(false)} className="p-2 rounded-full hover:bg-[#F1F5F9] text-[#64748B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={bTitle}
                  onChange={(e) => setBTitle(e.target.value)}
                  placeholder="e.g. Understanding CPAP and BiLevel Therapy"
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Category</label>
                  <select
                    value={bCategory}
                    onChange={(e) => setBCategory(e.target.value as any)}
                    className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                  >
                    <option value="Sleep Therapy">Sleep Therapy</option>
                    <option value="Ventilation">Ventilation</option>
                    <option value="Oxygen Care">Oxygen Care</option>
                    <option value="Diagnostics">Diagnostics</option>
                    <option value="Masks">Masks</option>
                  </select>
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={bAuthor}
                    onChange={(e) => setBAuthor(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  required
                  value={bExcerpt}
                  onChange={(e) => setBExcerpt(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Article Body Content (Paragraphs separated by double line break)</label>
                <textarea
                  rows={6}
                  required
                  value={bContentText}
                  onChange={(e) => setBContentText(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E2E8F0] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
