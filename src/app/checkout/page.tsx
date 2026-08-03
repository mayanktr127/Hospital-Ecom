"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { useCart } from "@/context/CartContext";
import { useAdmin, OrderItem } from "@/context/AdminContext";
import { useToast } from "@/context/ToastContext";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  CreditCard,
  Building2,
  FileText,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const { addToast } = useToast();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [prescriptionNote, setPrescriptionNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<OrderItem | null>(null);

  const shippingFee = 0; // Free Clinical Express Delivery
  const totalAmount = subtotal + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      addToast("Cart Empty", "Your shopping cart is empty.", "warning");
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `ORD-${Date.now().toString().slice(-6)}`;

    const newOrder: OrderItem = {
      orderId: generatedOrderId,
      customerName,
      phone,
      email,
      street,
      city,
      state,
      pincode,
      landmark: landmark || undefined,
      items: cart.map((ci) => ({
        productId: ci.product.id,
        name: ci.product.name,
        price: ci.product.price,
        quantity: ci.quantity,
        image: ci.product.image,
      })),
      totalAmount,
      paymentMethod,
      orderStatus: "On Progress",
      prescriptionNote: prescriptionNote || undefined,
      createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    await addOrder(newOrder);
    setPlacedOrder(newOrder);
    clearCart();
    setIsSubmitting(false);

    addToast(
      "Order Placed Successfully!",
      `Order ${generatedOrderId} has been logged in MongoDB Atlas and is being processed for dispatch.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A192F] font-inter flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-[#64748B] mb-6">
          <Link href="/" className="hover:text-[#0066FF] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </Link>
          <span>/</span>
          <span className="font-bold text-[#0A192F]">Checkout</span>
        </div>

        {placedOrder ? (
          /* SUCCESS ORDER CONFIRMATION VIEW */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-archivo font-extrabold text-xs uppercase tracking-wider mb-2">
                Order Confirmed
              </span>
              <h1 className="font-archivo font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
                Thank You for Your Order!
              </h1>
              <p className="text-sm text-[#64748B] mt-2">
                Your order <strong className="text-[#0066FF] font-mono">{placedOrder.orderId}</strong> has been stored in MongoDB Atlas and sent to our logistics team.
              </p>
            </div>

            {/* Order Brief Summary */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] text-left space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0]">
                <div>
                  <span className="text-xs text-[#64748B] block">Customer Name</span>
                  <span className="font-archivo font-bold text-sm text-[#0A192F]">{placedOrder.customerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#64748B] block">Payment Method</span>
                  <span className="font-archivo font-bold text-sm text-[#0066FF]">{placedOrder.paymentMethod}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase block mb-2">Shipping Destination</span>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {placedOrder.street}, {placedOrder.landmark ? `${placedOrder.landmark}, ` : ""}{placedOrder.city}, {placedOrder.state} - {placedOrder.pincode}
                </p>
                <p className="text-xs text-[#64748B] mt-1">Phone: <strong className="text-[#0A192F]">{placedOrder.phone}</strong> | Email: <strong className="text-[#0A192F]">{placedOrder.email}</strong></p>
              </div>

              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase block mb-2">Ordered Items ({placedOrder.items.length})</span>
                <div className="space-y-2">
                  {placedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#F1F5F9] last:border-none">
                      <span className="font-semibold text-[#0A192F]">{item.name} × {item.quantity}</span>
                      <span className="font-bold text-[#0A192F]">₹{(item.price * item.quantity).toLocaleString("en-IN")}.00</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-sm font-archivo font-extrabold text-[#0A192F] border-t border-[#E2E8F0]">
                <span>Total Paid / Payable Amount:</span>
                <span className="text-lg text-[#0066FF]">₹{placedOrder.totalAmount.toLocaleString("en-IN")}.00</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admin"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#003865] hover:bg-[#002747] text-white font-archivo font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>View Order in Admin Panel</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Contact & Shipping Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                  <h2 className="font-archivo font-extrabold text-xl text-[#0A192F]">
                    1. Contact &amp; Shipping Details
                  </h2>
                  <span className="text-xs font-bold text-[#0066FF] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> 256-bit Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Dr. Rajesh Kumar"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9845012345"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rajesh@hospital.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                    Street Address / Hospital / Suite <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. #42 Manipal Hospital Road, 2nd Stage"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bengaluru"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Karnataka"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 560017"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                    Landmark / Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Opposite Metro Station / Deliver to ICU 3rd Floor"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
                <h2 className="font-archivo font-extrabold text-xl text-[#0A192F] pb-4 border-b border-[#F1F5F9]">
                  2. Select Payment Method
                </h2>

                <div className="space-y-3">
                  <label className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${paymentMethod === "Cash on Delivery" ? "border-[#0066FF] bg-[#EBF5FF]" : "border-[#E2E8F0] bg-white"}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "Cash on Delivery"}
                        onChange={() => setPaymentMethod("Cash on Delivery")}
                        className="w-4 h-4 text-[#0066FF]"
                      />
                      <div>
                        <span className="font-archivo font-bold text-sm text-[#0A192F] block">Cash on Delivery (COD)</span>
                        <span className="text-xs text-[#64748B]">Pay upon inspection at your hospital or home.</span>
                      </div>
                    </div>
                    <Truck className="w-5 h-5 text-[#0066FF]" />
                  </label>

                  <label className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${paymentMethod === "UPI / Razorpay" ? "border-[#0066FF] bg-[#EBF5FF]" : "border-[#E2E8F0] bg-white"}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "UPI / Razorpay"}
                        onChange={() => setPaymentMethod("UPI / Razorpay")}
                        className="w-4 h-4 text-[#0066FF]"
                      />
                      <div>
                        <span className="font-archivo font-bold text-sm text-[#0A192F] block">UPI / NetBanking / Razorpay</span>
                        <span className="text-xs text-[#64748B]">Instant payment via GPay, PhonePe, Cards, or NetBanking.</span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-[#0066FF]" />
                  </label>

                  <label className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${paymentMethod === "Bank Wire Transfer" ? "border-[#0066FF] bg-[#EBF5FF]" : "border-[#E2E8F0] bg-white"}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "Bank Wire Transfer"}
                        onChange={() => setPaymentMethod("Bank Wire Transfer")}
                        className="w-4 h-4 text-[#0066FF]"
                      />
                      <div>
                        <span className="font-archivo font-bold text-sm text-[#0A192F] block">Hospital Bank Wire Transfer</span>
                        <span className="text-xs text-[#64748B]">NEFT/RTGS wire transfer with official tax invoice.</span>
                      </div>
                    </div>
                    <Building2 className="w-5 h-5 text-[#0066FF]" />
                  </label>
                </div>
              </div>

              {/* Prescription / Notes */}
              <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-3">
                <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase">
                  Doctor Prescription Note / Hospital GSTIN (Optional)
                </label>
                <textarea
                  rows={2}
                  value={prescriptionNote}
                  onChange={(e) => setPrescriptionNote(e.target.value)}
                  placeholder="e.g. Prescribed IPAP 15 / EPAP 10 by Dr. Swamy. Hospital GSTIN: 29AAAAA0000A1Z5"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6 sticky top-24">
                <h2 className="font-archivo font-extrabold text-xl text-[#0A192F] pb-4 border-b border-[#F1F5F9]">
                  Order Summary ({cart.length} {cart.length === 1 ? "Item" : "Items"})
                </h2>

                {cart.length === 0 ? (
                  <div className="py-8 text-center text-[#64748B] space-y-2">
                    <ShoppingBag className="w-10 h-10 mx-auto text-[#94A3B8]" />
                    <p className="text-xs">Your cart is empty.</p>
                    <Link href="/" className="text-xs font-bold text-[#0066FF] hover:underline inline-block">
                      Browse Storefront Catalog
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* Itemized List */}
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                      {cart.map((ci) => (
                        <div key={ci.product.id} className="flex items-center gap-3">
                          <img
                            src={ci.product.image}
                            alt={ci.product.name}
                            className="w-14 h-14 object-contain bg-[#F8FAFC] rounded-xl p-1.5 border border-[#E2E8F0] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-archivo font-bold text-xs text-[#0A192F] block truncate">
                              {ci.product.name}
                            </span>
                            <span className="text-[11px] text-[#64748B] block">
                              Qty: {ci.quantity} × ₹{ci.product.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <span className="font-archivo font-bold text-xs text-[#0A192F]">
                            ₹{(ci.product.price * ci.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 pt-4 border-t border-[#F1F5F9] text-xs text-[#64748B]">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <span className="font-bold text-[#0A192F]">₹{subtotal.toLocaleString("en-IN")}.00</span>
                      </div>
                      <div className="flex justify-between items-center text-emerald-600">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" /> Clinical Express Shipping:
                        </span>
                        <span className="font-bold uppercase tracking-wider">FREE</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST / Medical Taxes:</span>
                        <span className="font-bold text-[#0A192F]">Included</span>
                      </div>
                      <div className="flex justify-between text-base font-archivo font-extrabold text-[#0A192F] pt-3 border-t border-[#E2E8F0]">
                        <span>Total Payable:</span>
                        <span className="text-xl text-[#0066FF]">₹{totalAmount.toLocaleString("en-IN")}.00</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || cart.length === 0}
                      className="w-full py-4 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Lock className="w-4 h-4" />
                      <span>{isSubmitting ? "Processing Order..." : "Place Order"}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
