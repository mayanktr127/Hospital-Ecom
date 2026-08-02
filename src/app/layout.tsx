import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { ToastContainer } from "@/components/ui/Toast";

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
      <body className="bg-paper text-ink antialiased">
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <ToastContainer />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
