import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { AdminProvider } from "@/context/AdminContext";
import { InquiryProvider } from "@/context/InquiryContext";
import { ToastContainer } from "@/components/ui/Toast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { ProductInquiryModal } from "@/components/inquiry/ProductInquiryModal";

export const metadata: Metadata = {
  title: "Pulmo Care — Hospital & Home Healthcare Products",
  description: "Official Pulmo Care medical hardware, CPAPs, ventilators, diagnostics, and masks.",
  keywords: ["Pulmo Care", "Pulmocare", "Ventilators", "CPAP", "APAP", "Medical Devices", "German Technology"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <ToastProvider>
          <AdminProvider>
            <InquiryProvider>
              <CartProvider>
                <WishlistProvider>
                  {children}
                  <CartDrawer />
                  <WishlistDrawer />
                  <ProductInquiryModal />
                  <ToastContainer />
                </WishlistProvider>
              </CartProvider>
            </InquiryProvider>
          </AdminProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
