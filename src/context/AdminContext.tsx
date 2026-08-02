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
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  // Blog Posts CRUD State
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (slug: string) => void;
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

      const savedProducts = localStorage.getItem("pulmocare_admin_products");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }

      const savedBlog = localStorage.getItem("pulmocare_admin_blogs");
      if (savedBlog) {
        setBlogPosts(JSON.parse(savedBlog));
      }
    } catch (err) {
      console.error("Failed to load admin context from localStorage", err);
    }
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
  const addProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem("pulmocare_admin_products", JSON.stringify(updated));
  };

  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updated);
    localStorage.setItem("pulmocare_admin_products", JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("pulmocare_admin_products", JSON.stringify(updated));
  };

  // Blog CRUD Handlers
  const addBlogPost = (newPost: BlogPost) => {
    const updated = [newPost, ...blogPosts];
    setBlogPosts(updated);
    localStorage.setItem("pulmocare_admin_blogs", JSON.stringify(updated));
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    const updated = blogPosts.map((b) => (b.slug === updatedPost.slug ? updatedPost : b));
    setBlogPosts(updated);
    localStorage.setItem("pulmocare_admin_blogs", JSON.stringify(updated));
  };

  const deleteBlogPost = (slug: string) => {
    const updated = blogPosts.filter((b) => b.slug !== slug);
    setBlogPosts(updated);
    localStorage.setItem("pulmocare_admin_blogs", JSON.stringify(updated));
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
