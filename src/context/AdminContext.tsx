"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getDefaultProducts } from "@/utils/defaultProducts";

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

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

interface AdminContextType {
  isAdminAuthenticated: boolean;
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
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Products start pre-populated with default products, overwritten if API succeeds
  const [products, setProducts] = useState<Product[]>(getDefaultProducts());
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [sleepStudyBookings, setSleepStudyBookings] = useState<SleepStudyBookingItem[]>([]);

  useEffect(() => {
    // Restore admin session from localStorage
    try {
      const savedAuth = localStorage.getItem("pulmocare_admin_auth");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        setIsAdminAuthenticated(true);
        setAdminUser(parsed);
      }
    } catch (err) {
      console.error("Failed to restore admin auth from localStorage", err);
    }

    // Fetch all data from backend
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        // Fetch products — if DB empty, auto-seed first
        const prodRes = await fetch("/api/products").then((r) => r.json()).catch(() => ({ success: false }));
        if (prodRes.success && prodRes.products && prodRes.products.length > 0) {
          setProducts(prodRes.products);
        } else {
          // Trigger seed (idempotent — only seeds empty collections)
          await fetch("/api/seed").catch(() => {});
          const seededProds = await fetch("/api/products").then((r) => r.json()).catch(() => ({ success: false }));
          if (seededProds.success && seededProds.products) {
            setProducts(seededProds.products);
          }
        }

        // Fetch categories — if DB empty, auto-seed covered by /api/seed above
        const normalizeCategories = (cats: CategoryItem[]) =>
          cats.map((c) => {
            if (c.slug === "sleep-apnea-therapy" || c.id === "cat-1" || c.name === "Sleep Apnea Therapy" || c.name === "Sleep Therapy") {
              return {
                ...c,
                name: "CPAP Therapy",
                image: "/images/pulmocare/pulmocare_prisma-smart-plus.png",
              };
            }
            return c;
          });

        const catRes = await fetch("/api/categories").then((r) => r.json()).catch(() => ({ success: false }));
        if (catRes.success && catRes.categories && catRes.categories.length > 0) {
          setCategories(normalizeCategories(catRes.categories));
        } else {
          // Re-try after seed
          const seededCats = await fetch("/api/categories").then((r) => r.json()).catch(() => ({ success: false }));
          if (seededCats.success && seededCats.categories) {
            setCategories(normalizeCategories(seededCats.categories));
          }
        }

        // Fetch blogs
        const blogRes = await fetch("/api/blogs").then((r) => r.json()).catch(() => ({ success: false }));
        if (blogRes.success && blogRes.blogs && blogRes.blogs.length > 0) {
          setBlogPosts(blogRes.blogs);
        }

        // Fetch reviews
        const revRes = await fetch("/api/reviews").then((r) => r.json()).catch(() => ({ success: false }));
        if (revRes.success && revRes.reviews && revRes.reviews.length > 0) {
          setReviews(revRes.reviews);
        }

        // Fetch inquiries
        const inqRes = await fetch("/api/inquiries").then((r) => r.json()).catch(() => ({ success: false }));
        if (inqRes.success && inqRes.inquiries && inqRes.inquiries.length > 0) {
          setInquiries(inqRes.inquiries);
        }

        // Fetch orders
        const ordRes = await fetch("/api/orders").then((r) => r.json()).catch(() => ({ success: false }));
        if (ordRes.success && ordRes.orders && ordRes.orders.length > 0) {
          setOrders(ordRes.orders);
        }

        // Fetch sleep study bookings
        const ssbRes = await fetch("/api/sleep-study-bookings").then((r) => r.json()).catch(() => ({ success: false }));
        if (ssbRes.success && ssbRes.bookings && ssbRes.bookings.length > 0) {
          setSleepStudyBookings(ssbRes.bookings);
        }
      } catch (err) {
        console.error("Failed to load data from backend", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
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
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts((prev) => [data.product, ...prev]);
      } else {
        setProducts((prev) => [newProduct, ...prev]);
      }
    } catch (err) {
      console.error("Error adding product to MongoDB Atlas", err);
      setProducts((prev) => [newProduct, ...prev]);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
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
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting product from MongoDB Atlas", err);
    }
  };

  // Categories CRUD Handlers
  const addCategory = async (newCategory: CategoryItem) => {
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      const data = await res.json();
      if (data.success && data.category) {
        setCategories((prev) => [...prev, data.category]);
      } else {
        setCategories((prev) => [...prev, newCategory]);
      }
    } catch (err) {
      console.error("Error adding category to MongoDB Atlas", err);
      setCategories((prev) => [...prev, newCategory]);
    }
  };

  const updateCategory = async (updatedCategory: CategoryItem) => {
    setCategories((prev) => prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)));
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
    setCategories((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch(`/api/categories?id=${encodeURIComponent(id)}`, { method: "DELETE" });
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
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      const data = await res.json();
      setReviews((prev) => [data.review || review, ...prev]);
    } catch (err) {
      console.error("Error adding review to MongoDB Atlas", err);
      setReviews((prev) => [review, ...prev]);
    }
  };

  const deleteReview = async (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
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

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
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
