"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";
import { BLOG_POSTS, BlogPost } from "@/data/blog_posts";
import pulmocareProductsData from "@/data/pulmocare_products.json";

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
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Flatten Pulmocare JSON object dataset into array
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
            price: 45990,
            originalPrice: 65000,
            image: p.image || "/images/pulmocare/pulmocare_prisma-smart.png",
            rating: 5,
            reviewsCount: 4,
            inStock: true,
            description: p.tagline || p.introParagraph || "High-performance medical equipment.",
            specifications: [],
          });
        });
      }
    });
  }
  return list;
};

const initialProducts: Product[] = flattenProducts();

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);

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
          // If Atlas is empty, automatically seed Atlas cluster
          fetch("/api/seed")
            .then((r) => r.json())
            .then((seedData) => {
              if (seedData.success) {
                fetch("/api/products").then((r) => r.json()).then((d) => d.success && setProducts(d.products));
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

  // MongoDB Atlas Products CRUD Handlers
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

  // MongoDB Atlas Blog CRUD Handlers
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
