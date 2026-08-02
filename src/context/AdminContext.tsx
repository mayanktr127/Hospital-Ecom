"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";
import { BLOG_POSTS, BlogPost } from "@/data/blog_posts";
import pulmocareProductsData from "@/data/pulmocare_products.json";

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
  // Products CRUD State
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
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
  updateInquiryStatus: (id: string, status: string) => Promise<void>;
  // Orders CRUD State
  orders: OrderItem[];
  addOrder: (order: OrderItem) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const roundUpPrice = (pr?: number) => (pr ? Math.round(pr * 1.35) : 65000);

const flattenProducts = (): Product[] => {
  const list: Product[] = [];
  if (pulmocareProductsData && typeof pulmocareProductsData === "object") {
    Object.values(pulmocareProductsData as Record<string, any>).forEach((catObj: any) => {
      if (catObj && catObj.products && Array.isArray(catObj.products)) {
        catObj.products.forEach((p: any, idx: number) => {
          list.push({
            id: p.slug || `prod-${idx}-${Math.random()}`,
            name: p.title || "Medical Device",
            category: "Ventilation & Sleep",
            price: p.price || 45990,
            originalPrice: p.originalPrice || roundUpPrice(p.price),
            image: p.image || "/images/pulmocare/pulmocare_prisma-smart.png",
            rating: 5,
            reviewsCount: 4,
            inStock: true,
            description: p.tagline || p.introParagraph || "High-performance medical equipment.",
            specifications: p.specifications || [],
          });
        });
      }
    });
  }
  return list;
};

const initialProducts: Product[] = flattenProducts();

const initialReviews: ReviewItem[] = [
  {
    id: "rev-101",
    productId: "prisma-25s",
    productName: "Prisma 25S",
    author: "Dr. Rajesh K.",
    rating: 5,
    comment: "Exceptional build quality and quiet operation. Highly recommended for OSA patient therapy.",
    date: "July 24, 2026",
    status: "Approved",
  },
  {
    id: "rev-102",
    productId: "prisma-25s",
    productName: "Prisma 25S",
    author: "Priya Sharma",
    rating: 5,
    comment: "Very easy to set up and smooth pressure adjustments. Fast delivery by Pulmo Care.",
    date: "June 18, 2026",
    status: "Approved",
  },
  {
    id: "rev-103",
    productId: "prisma-smart",
    productName: "Prisma SMART",
    author: "Anil Deshmukh",
    rating: 5,
    comment: "Ultra quiet auto-titrating CPAP. Improved sleep quality significantly.",
    date: "August 1, 2026",
    status: "Approved",
  },
];

const initialInquiries: InquiryItem[] = [
  {
    id: "inq-101",
    fullName: "Dr. Suresh Reddy",
    phone: "+91 9845012345",
    email: "suresh.reddy@apollo.com",
    inquiryType: "Hospital Bulk Order",
    device: "Löwenstein Luisa Life Support Ventilator",
    city: "Bengaluru",
    message: "Requesting quotation for 5 units of Luisa Life Support Ventilators for ICU ward extension.",
    status: "New Lead",
    createdAt: "August 2, 2026",
  },
  {
    id: "inq-102",
    fullName: "Meenakshi Sundaram",
    phone: "+91 9443198765",
    email: "meenakshi.s@gmail.com",
    inquiryType: "CPAP / BiLevel Purchase",
    device: "Löwenstein Prisma SMART Auto CPAP",
    city: "Chennai",
    message: "Doctor recommended Prisma SMART Auto CPAP for sleep apnea. Please share home delivery schedule.",
    status: "Contacted",
    createdAt: "August 1, 2026",
  },
];

const initialOrders: OrderItem[] = [
  {
    orderId: "ORD-781920",
    customerName: "Dr. Arvind Swamy",
    phone: "+91 9841029384",
    email: "arvind.swamy@manipal.edu",
    street: "Manipal Hospital, Old Airport Rd",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560017",
    landmark: "Near Command Hospital",
    items: [
      {
        productId: "prisma-20a",
        name: "Löwenstein Prisma 20A Auto CPAP",
        price: 65000,
        quantity: 2,
        image: "/images/pulmocare/pulmocare_prisma-20a.png",
      },
    ],
    totalAmount: 130000,
    paymentMethod: "UPI / Razorpay",
    orderStatus: "On Progress",
    prescriptionNote: "Doctor prescription attached for OSA patient therapy.",
    createdAt: "August 2, 2026",
  },
  {
    orderId: "ORD-654129",
    customerName: "Kavita Rao",
    phone: "+91 9902187364",
    email: "kavita.rao@yahoo.co.in",
    street: "#42, 4th Main, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    items: [
      {
        productId: "cara-full-face",
        name: "Löwenstein CARA Full Face Mask",
        price: 5800,
        quantity: 1,
        image: "/images/site/masks_cara_full_face_csm_cara_mask_patient_interface_fullface_right_3bfbc3e771.png",
      },
    ],
    totalAmount: 5800,
    paymentMethod: "Cash on Delivery",
    orderStatus: "Delivered",
    createdAt: "August 1, 2026",
  },
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [inquiries, setInquiries] = useState<InquiryItem[]>(initialInquiries);
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("pulmocare_admin_auth");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        setIsAdminAuthenticated(true);
        setAdminUser(parsed);
      }
    } catch (err) {
      console.error("Failed to load admin auth from localStorage", err);
    }

    // Fetch initial MongoDB Atlas dataset
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          fetch("/api/seed")
            .then((r) => r.json())
            .then((seedData) => {
              if (seedData.success) {
                fetch("/api/products").then((r) => r.json()).then((d) => d.success && setProducts(d.products));
                fetch("/api/reviews").then((r) => r.json()).then((d) => d.success && setReviews(d.reviews));
                fetch("/api/inquiries").then((r) => r.json()).then((d) => d.success && setInquiries(d.inquiries));
                fetch("/api/orders").then((r) => r.json()).then((d) => d.success && setOrders(d.orders));
              }
            });
        }
      })
      .catch((e) => console.log("Using local state fallback for products", e));

    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.blogs && data.blogs.length > 0) {
          setBlogPosts(data.blogs);
        }
      })
      .catch((e) => console.log("Using local state fallback for blogs", e));

    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch((e) => console.log("Using local state fallback for reviews", e));

    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.inquiries && data.inquiries.length > 0) {
          setInquiries(data.inquiries);
        }
      })
      .catch((e) => console.log("Using local state fallback for inquiries", e));

    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.orders && data.orders.length > 0) {
          setOrders(data.orders);
        }
      })
      .catch((e) => console.log("Using local state fallback for orders", e));
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
    const updated = [newProduct, ...products];
    setProducts(updated);
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
    } catch (err) {
      console.error("Error adding product to MongoDB Atlas", err);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updated);
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
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    try {
      await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error deleting product from MongoDB Atlas", err);
    }
  };

  // Blog CRUD Handlers
  const addBlogPost = async (newPost: BlogPost) => {
    const updated = [newPost, ...blogPosts];
    setBlogPosts(updated);
    try {
      await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
    } catch (err) {
      console.error("Error publishing article to MongoDB Atlas", err);
    }
  };

  const updateBlogPost = async (updatedPost: BlogPost) => {
    const updated = blogPosts.map((b) => (b.slug === updatedPost.slug ? updatedPost : b));
    setBlogPosts(updated);
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
    const updated = blogPosts.filter((b) => b.slug !== slug);
    setBlogPosts(updated);
    try {
      await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error deleting article from MongoDB Atlas", err);
    }
  };

  // Reviews CRUD Handlers
  const addReview = async (review: ReviewItem) => {
    const updated = [review, ...reviews];
    setReviews(updated);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
    } catch (err) {
      console.error("Error adding review to MongoDB Atlas", err);
    }
  };

  const deleteReview = async (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    try {
      await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
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
    const updated = [inquiry, ...inquiries];
    setInquiries(updated);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
    } catch (err) {
      console.error("Error submitting contact inquiry to MongoDB Atlas", err);
    }
  };

  const deleteInquiry = async (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    try {
      await fetch(`/api/inquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error deleting contact inquiry from MongoDB Atlas", err);
    }
  };

  const updateInquiryStatus = async (id: string, newStatus: string) => {
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
    const updated = [order, ...orders];
    setOrders(updated);
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch (err) {
      console.error("Error saving checkout order to MongoDB Atlas", err);
    }
  };

  const deleteOrder = async (orderId: string) => {
    const updated = orders.filter((o) => o.orderId !== orderId);
    setOrders(updated);
    try {
      await fetch(`/api/orders?orderId=${encodeURIComponent(orderId)}`, {
        method: "DELETE",
      });
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

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        adminUser,
        login,
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
        addInquiry,
        deleteInquiry,
        updateInquiryStatus,
        orders,
        addOrder,
        deleteOrder,
        updateOrderStatus,
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
