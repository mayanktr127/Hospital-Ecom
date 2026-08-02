"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdmin, ReviewItem, CategoryItem } from "@/context/AdminContext";
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
  } = useAdmin();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "categories" | "blogs" | "reviews" | "tracking" | "messages">("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search & Filter States
  const [globalSearch, setGlobalSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [blogSearch, setBlogSearch] = useState("");
  const [reviewSearch, setReviewSearch] = useState("");
  const [inquirySearch, setInquirySearch] = useState("");

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
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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
        addToast("Multer Upload Success", "Image uploaded and stored in /uploads directory.");
      } else {
        addToast("Upload Failed", data.error || "Could not upload image.", "error");
      }
    } catch (err) {
      console.error("Multer upload error", err);
      addToast("Upload Error", "Failed to upload image file.", "error");
    } finally {
      setIsUploadingImage(false);
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

  // Sample Shipments Activity Data
  const activityData = [
    { id: "CA-12321-ID", date: "12/11/2024", origin: "Bengaluru, IN", destination: "Jakarta, ID", status: "On Progress", color: "bg-amber-100 text-amber-700" },
    { id: "NY-12321-SF", date: "14/11/2024", origin: "Delhi, IN", destination: "San Francisco, US", status: "On Progress", color: "bg-[#EBF5FF] text-[#0066FF] font-semibold" },
    { id: "CGK-12321-NY", date: "14/11/2024", origin: "Mumbai, IN", destination: "New York, US", status: "Pending", color: "bg-pink-100 text-pink-700" },
    { id: "UK-12321-MLG", date: "18/11/2024", origin: "Chennai, IN", destination: "London, UK", status: "Delivered", color: "bg-emerald-100 text-emerald-700" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-[#1E293B] font-inter flex relative">
      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="w-64 bg-white border-r border-[#E2E8F0] p-6 flex flex-col justify-between relative z-10 h-full overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
                <Link href="/" className="flex items-center gap-2">
                  <img src="/images/pulmocare/pulmocare_logo.png" alt="Pulmo Care Logo" className="h-7 w-auto object-contain" />
                </Link>
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-[#F1F5F9] text-[#64748B]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block px-3 mb-2">Main Menu</span>
                <button
                  onClick={() => { setActiveTab("dashboard"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "dashboard" ? "bg-[#EBF5FF] text-[#0066FF]" : "text-[#64748B]"}`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => { setActiveTab("products"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "products" ? "bg-[#EBF5FF] text-[#0066FF]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4" />
                    <span>Products Catalog</span>
                  </div>
                  <span className="bg-[#F1F5F9] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono">{products.length}</span>
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "blogs" ? "bg-[#EBF5FF] text-[#0066FF]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4" />
                    <span>Clinical Blog</span>
                  </div>
                  <span className="bg-[#F1F5F9] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono">{blogPosts.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab("reviews"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "reviews" ? "bg-[#EBF5FF] text-[#0066FF]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Customer Reviews</span>
                  </div>
                  <span className="bg-[#F1F5F9] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono">{reviews.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab("tracking"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "tracking" ? "bg-[#EBF5FF] text-[#0066FF]" : "text-[#64748B]"}`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Tracking &amp; Orders</span>
                </button>
                <button
                  onClick={() => { setActiveTab("messages"); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs ${activeTab === "messages" ? "bg-[#EBF5FF] text-[#0066FF]" : "text-[#64748B]"}`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquiries &amp; Support</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-[#0066FF] text-white text-[10px] flex items-center justify-center font-bold">4</span>
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block px-3 mb-2">Others</span>
                <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#F8FAFC]">
                  <Layers className="w-4 h-4" />
                  <span>Hospital Units</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#F8FAFC]">
                  <Users className="w-4 h-4" />
                  <span>Team Members</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#F8FAFC]">
                  <Settings className="w-4 h-4" />
                  <span>System Setup</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-2xl p-4 text-white shadow-lg space-y-3 relative overflow-hidden mt-6">
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] uppercase font-bold text-cyan-200">Pro Suite</span>
                <h4 className="font-archivo font-extrabold text-lg leading-tight">50% Off Upgrade</h4>
                <p className="text-[11px] text-white/80">Unlock advanced medical analytics &amp; telehealth telemetry.</p>
              </div>
              <button className="w-full py-2 bg-white text-[#0052CC] font-archivo font-bold text-xs rounded-xl shadow-xs cursor-pointer">
                Try Pro Free
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 1. LEFT SIDEBAR (Desktop) */}
      <aside className="w-64 bg-white border-r border-[#E2E8F0] p-6 flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
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

            {/* CUSTOMER REVIEWS TAB */}
            <button
              onClick={() => setActiveTab("reviews")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-archivo font-bold text-xs transition-all cursor-pointer ${
                activeTab === "reviews"
                  ? "bg-[#EBF5FF] text-[#0066FF] shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0066FF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Customer Reviews</span>
              </div>
              <span className="bg-[#F1F5F9] text-[#0066FF] text-[10px] px-2 py-0.5 rounded-full font-mono">{reviews.length}</span>
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

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block px-3 mb-2">
              Others
            </span>

            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#F8FAFC]">
              <Layers className="w-4 h-4" />
              <span>Hospital Units</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#F8FAFC]">
              <Users className="w-4 h-4" />
              <span>Team Members</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#64748B] hover:bg-[#F8FAFC]">
              <Settings className="w-4 h-4" />
              <span>System Setup</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-2xl p-4 text-white shadow-lg space-y-3 relative overflow-hidden mt-6">
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] uppercase font-bold text-cyan-200">Pro Suite</span>
            <h4 className="font-archivo font-extrabold text-lg leading-tight">50% Off Upgrade</h4>
            <p className="text-[11px] text-white/80">Unlock advanced medical analytics &amp; telehealth telemetry.</p>
          </div>
          <button className="w-full py-2 bg-white text-[#0052CC] font-archivo font-bold text-xs rounded-xl shadow-xs cursor-pointer">
            Try Pro Free
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#E2E8F0] px-4 md:px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 w-full max-w-sm">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl border border-[#E2E8F0] bg-white text-[#1E293B]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search deliveries, devices..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1E293B] focus:outline-none focus:border-[#0066FF] transition-all font-inter"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#64748B] relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>

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

        <main className="p-6 md:p-8 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-archivo font-extrabold text-2xl md:text-3xl text-[#0F172A] tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-xs text-[#64748B]">Real-time hospital equipment distribution &amp; inventory performance.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenProductModal()}
                    className="px-5 py-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ New Device</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-3 space-y-5">
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

                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
                    <h3 className="font-archivo font-bold text-lg text-[#0F172A]">Delivery Analytics</h3>
                  </div>

                  <div className="h-64 flex items-end justify-between gap-3 pt-6 px-4 relative border-b border-[#F1F5F9]">
                    <div className="absolute top-2 left-[54%] -translate-x-1/2 bg-[#0F172A] text-white p-2.5 rounded-xl text-[11px] shadow-xl z-10 space-y-1 font-mono">
                      <div className="text-[10px] text-[#94A3B8]">September 2024</div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0066FF]" /> 10,123
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#F1F5F9] rounded-xl h-36" />
                      <span className="text-xs text-[#94A3B8] font-medium">Jul</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#F1F5F9] rounded-xl h-44" />
                      <span className="text-xs text-[#94A3B8] font-medium">Aug</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#0066FF] rounded-xl h-52 shadow-md relative overflow-hidden" />
                      <span className="text-xs font-bold text-[#0066FF]">Sept</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#F1F5F9] rounded-xl h-28" />
                      <span className="text-xs text-[#94A3B8] font-medium">Oct</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-[#F1F5F9] rounded-xl h-40" />
                      <span className="text-xs text-[#94A3B8] font-medium">November</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs space-y-4">
                    <div className="w-full h-36 bg-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#E2E8F0]">
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
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-archivo font-bold text-lg text-[#0F172A]">Live Website Orders &amp; Tracking Data</h3>
                    <p className="text-xs text-[#64748B]">Real-time customer checkout orders submitted via the storefront, stored in MongoDB Atlas.</p>
                  </div>
                  <span className="bg-[#EBF5FF] text-[#0066FF] font-archivo font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-[#0066FF]/20">
                    {orders.length} Orders Logged
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-inter border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#E2E8F0]">
                        <th className="py-3 px-4">Order ID &amp; Customer</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Destination &amp; Address</th>
                        <th className="py-3 px-4">Purchased Items</th>
                        <th className="py-3 px-4">Total (₹) &amp; Payment</th>
                        <th className="py-3 px-4 text-right">Status &amp; Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {orders.map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-[#F8FAFC] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#0066FF]">
                            <span>{ord.orderId}</span>
                            <span className="font-sans font-bold text-[#0F172A] block text-xs mt-0.5">{ord.customerName}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <a href={`tel:${ord.phone}`} className="text-[#0066FF] font-mono text-[11px] hover:underline block font-bold">
                              {ord.phone}
                            </a>
                            <span className="text-[10px] text-[#94A3B8] block">{ord.email}</span>
                          </td>
                          <td className="py-3.5 px-4 text-[#475569] max-w-xs">
                            <span className="font-bold text-[#0F172A] block">{ord.city}, {ord.state}</span>
                            <span className="text-[10px] text-[#64748B] line-clamp-1">{ord.street} ({ord.pincode})</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-1">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <img src={it.image} alt={it.name} className="w-6 h-6 object-contain rounded bg-white p-0.5 border" />
                                  <span className="font-semibold text-[#0F172A] text-[11px] line-clamp-1">{it.name} × {it.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-archivo font-extrabold text-[#0F172A] block">₹{ord.totalAmount.toLocaleString("en-IN")}.00</span>
                            <span className="text-[10px] text-[#0066FF] font-bold block">{ord.paymentMethod}</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                                ord.orderStatus === "Delivered"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : ord.orderStatus === "Cancelled"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {ord.orderStatus}
                              </span>
                              {ord.orderStatus !== "Delivered" && (
                                <button
                                  onClick={async () => {
                                    await updateOrderStatus(ord.orderId, "Delivered");
                                    addToast("Order Status Updated", `Order ${ord.orderId} marked as Delivered.`);
                                  }}
                                  className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-[10px] hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
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
                                className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
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

          {/* TAB 4: CUSTOMER REVIEWS MANAGEMENT (CRUD) */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <h2 className="font-archivo font-extrabold text-2xl text-[#0F172A]">Customer Reviews Moderation</h2>
                  <p className="text-xs text-[#64748B]">Read, approve, or delete patient and clinical reviews reflecting on product pages.</p>
                </div>

                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              {/* Review Stat Summary Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase block">Total Reviews</span>
                  <span className="font-archivo font-extrabold text-2xl text-[#0F172A]">{reviews.length}</span>
                </div>
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase block">Average Satisfaction</span>
                  <span className="font-archivo font-extrabold text-2xl text-amber-500 flex items-center gap-1">
                    5.0 <Star className="w-5 h-5 fill-amber-500 inline" />
                  </span>
                </div>
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase block">Status</span>
                  <span className="font-archivo font-extrabold text-2xl text-emerald-600">100% Approved</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search reviews by reviewer name, product, or comment..."
                  value={reviewSearch}
                  onChange={(e) => setReviewSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1E293B] focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              {/* Reviews Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-inter border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#64748B] font-archivo font-bold uppercase tracking-wider border-b border-[#E2E8F0]">
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Reviewer</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Comment</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {filteredReviews.map((r) => (
                      <tr key={r.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3 px-4 font-bold text-[#0066FF]">{r.productName}</td>
                        <td className="py-3 px-4 font-medium text-[#0F172A]">{r.author}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#475569] max-w-xs truncate">"{r.comment}"</td>
                        <td className="py-3 px-4 text-[#64748B]">{r.date}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {r.status === "Pending" && (
                              <button
                                onClick={() => approveReview(r.id)}
                                className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                                title="Approve Review"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteReview(r.id, r.author)}
                              className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
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

          {/* TAB 6: INQUIRIES & CONTACT SUBMISSIONS */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <h2 className="font-archivo font-extrabold text-2xl text-[#0F172A]">Contact Inquiries &amp; Customer Submissions</h2>
                  <p className="text-xs text-[#64748B]">Real-time leads filed through the website contact form, stored in MongoDB Atlas.</p>
                </div>

                <div className="w-full sm:w-72 relative">
                  <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search by name, phone, city..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              {/* Inquiry Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase block">Total Submissions</span>
                  <span className="font-archivo font-extrabold text-2xl text-[#0F172A]">{inquiries.length}</span>
                </div>
                <div className="bg-[#EBF5FF] rounded-2xl p-4 border border-[#0066FF]/20">
                  <span className="text-[10px] font-bold text-[#0066FF] uppercase block">New Uncontacted Leads</span>
                  <span className="font-archivo font-extrabold text-2xl text-[#0066FF]">
                    {inquiries.filter((i) => i.status === "New Lead").length}
                  </span>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase block">Resolved Inquiries</span>
                  <span className="font-archivo font-extrabold text-2xl text-emerald-700">
                    {inquiries.filter((i) => i.status === "Resolved").length}
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFC] text-[#64748B] font-archivo font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Contact Details</th>
                      <th className="py-3 px-4">Inquiry &amp; Device</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Message / Requirements</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#0F172A] block">{inq.fullName}</span>
                          <a href={`tel:${inq.phone}`} className="text-[#0066FF] hover:underline font-mono text-[11px] block">
                            {inq.phone}
                          </a>
                          <span className="text-[10px] text-[#94A3B8] block">{inq.email}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-[#0066FF]/10 text-[#0066FF] font-bold px-2 py-0.5 rounded-full text-[10px] block w-max mb-1">
                            {inq.inquiryType}
                          </span>
                          <span className="font-semibold text-[#0F172A] text-[11px] block line-clamp-1">{inq.device}</span>
                        </td>
                        <td className="py-3 px-4 font-medium text-[#475569]">{inq.city}</td>
                        <td className="py-3 px-4 text-[#334155] max-w-xs leading-relaxed">
                          <p className="line-clamp-2">{inq.message}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide inline-block ${
                              inq.status === "New Lead"
                                ? "bg-[#0066FF] text-white"
                                : inq.status === "Contacted"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {inq.status !== "Resolved" && (
                              <button
                                onClick={() => handleUpdateInquiryStatus(inq.id, inq.status === "New Lead" ? "Contacted" : "Resolved", inq.fullName)}
                                className="px-2.5 py-1 rounded-lg bg-[#EBF5FF] text-[#0066FF] font-bold text-[10px] hover:bg-[#0066FF] hover:text-white transition-colors cursor-pointer"
                              >
                                {inq.status === "New Lead" ? "Mark Contacted" : "Mark Resolved"}
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteInquiry(inq.id, inq.fullName)}
                              className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
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
        </main>
      </div>

      {/* CREATE PRODUCT MODAL */}
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
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
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

              <div className="space-y-2">
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">
                  Product Image (Upload via Multer or Paste URL)
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 rounded-xl bg-[#EBF5FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white font-archivo font-bold text-xs cursor-pointer transition-colors flex items-center gap-2">
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
                  <span className="text-[10px] text-[#94A3B8] uppercase font-bold">OR</span>
                </div>

                <input
                  type="text"
                  value={pImage}
                  onChange={(e) => setPImage(e.target.value)}
                  placeholder="Paste URL or uploaded file path (/uploads/prod_...)"
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                />

                {pImage && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                    <img src={pImage} alt="Preview" className="w-12 h-12 object-contain rounded-lg bg-white p-1 border" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 block">Image Selected</span>
                      <span className="text-[10px] text-[#64748B] font-mono line-clamp-1">{pImage}</span>
                    </div>
                  </div>
                )}
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

      {/* CREATE BLOG ARTICLE MODAL */}
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

      {/* CREATE REVIEW MODAL */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#E2E8F0] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-6">
              <h3 className="font-archivo font-extrabold text-2xl text-[#0F172A]">Add Customer Review</h3>
              <button onClick={() => setReviewModalOpen(false)} className="p-2 rounded-full hover:bg-[#F1F5F9] text-[#64748B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Target Product</label>
                <select
                  value={rProductId}
                  onChange={(e) => {
                    setRProductId(e.target.value);
                    const found = products.find((p) => p.id === e.target.value);
                    if (found) setRProductName(found.name);
                  }}
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Reviewer Name</label>
                  <input
                    type="text"
                    required
                    value={rAuthor}
                    onChange={(e) => setRAuthor(e.target.value)}
                    placeholder="e.g. Dr. Rajesh K."
                    className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Rating (Stars)</label>
                  <select
                    value={rRating}
                    onChange={(e) => setRRating(parseInt(e.target.value))}
                    className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                  >
                    <option value={5}>5 Stars (⭐ ⭐ ⭐ ⭐ ⭐)</option>
                    <option value={4}>4 Stars (⭐ ⭐ ⭐ ⭐)</option>
                    <option value={3}>3 Stars (⭐ ⭐ ⭐)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-archivo font-bold text-[#0F172A] uppercase mb-1">Review Comment</label>
                <textarea
                  rows={3}
                  required
                  value={rComment}
                  onChange={(e) => setRComment(e.target.value)}
                  placeholder="e.g. Exceptional build quality and quiet operation."
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E2E8F0] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase"
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
