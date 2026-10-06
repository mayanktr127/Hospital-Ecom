"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { useToast } from "@/context/ToastContext";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  CreditCard,
  QrCode,
  Building2,
  FileText,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Download,
  Printer,
  Clock,
  AlertCircle,
  Truck,
  Check,
  Package,
} from "lucide-react";
import { openRazorpayModal } from "@/utils/razorpay";

interface BundleItemType {
  productId: string;
  name: string;
  category: string;
  image: string;
  catalogPrice?: number | null;
  customPrice: number;
  quantity: number;
  subtotal: number;
}

interface BundleDetails {
  bundleId: string;
  title: string;
  description?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  items: BundleItemType[];
  totalAmount: number;
  discountAmount?: number;
  status: "active" | "paid" | "expired" | "cancelled";
  expiresAt?: string;
  paymentDetails?: {
    paymentMethod: string;
    transactionId: string;
    paidAt: string;
    paidAmount: number;
    payerName: string;
    payerPhone: string;
    payerEmail: string;
    shippingAddress: string;
    city: string;
    state: string;
    pincode: string;
    orderId?: string;
  };
  createdAt?: string;
}

export default function BundlePaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();

  // Safely extract and normalize bundle ID across all browsers
  const rawId = params?.id;
  const bundleId = (Array.isArray(rawId) ? rawId[0] : (rawId || "")).toString().trim();

  const [bundle, setBundle] = useState<BundleDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Customer Contact & Shipping State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("560001");
  const [landmark, setLandmark] = useState("");
  const [gstin, setGstin] = useState("");

  // Payment Method: Razorpay exclusive
  const [paymentMethod] = useState<"razorpay">("razorpay");

  // Submission & Confirmation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [showSpecsInReceipt, setShowSpecsInReceipt] = useState(false);

  useEffect(() => {
    if (!bundleId) {
      setIsLoading(false);
      return;
    }

    let isSubscribed = true;

    const fetchBundle = async (silent = false) => {
      if (!silent) {
        setIsLoading(true);
        setFetchError(null);
      }
      try {
        const cleanId = decodeURIComponent(bundleId).trim();
        const timestamp = Date.now();
        // 1. Direct fetch with clean decoded ID and cache-busting
        let res = await fetch(`/api/bundles/${encodeURIComponent(cleanId)}?_t=${timestamp}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });
        let data = await res.json();

        // 2. Cross-browser fallback: If not found via direct ID route, query /api/bundles
        if ((!data.success || !data.bundle) && isSubscribed) {
          try {
            const listRes = await fetch(`/api/bundles?_t=${timestamp}`, {
              cache: "no-store",
              headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
            });
            const listData = await listRes.json();
            if (listData.success && Array.isArray(listData.bundles)) {
              const matched = listData.bundles.find(
                (b: any) =>
                  b.bundleId?.trim().toLowerCase() === cleanId.toLowerCase() ||
                  b._id === cleanId
              );
              if (matched) {
                data = { success: true, bundle: matched };
              }
            }
          } catch (fallbackErr) {
            console.warn("Fallback bundle search failed", fallbackErr);
          }
        }

        if (!isSubscribed) return;

        if (data.success && data.bundle) {
          setBundle(data.bundle);
          if (data.bundle.clientName && !customerName) setCustomerName(data.bundle.clientName);
          if (data.bundle.clientPhone && !phone) setPhone(data.bundle.clientPhone);
          if (data.bundle.clientEmail && !email) setEmail(data.bundle.clientEmail);
          if (data.bundle.status === "paid") {
            setConfirmedOrder({
              orderId: data.bundle.paymentDetails?.orderId || `ORD-${data.bundle.bundleId}`,
              bundle: data.bundle,
              paymentDetails: data.bundle.paymentDetails,
            });
          }
        } else if (!silent) {
          setFetchError(data.error || "Bundle quotation not found or has expired.");
        }
      } catch (err: any) {
        if (isSubscribed && !silent) {
          setFetchError("Failed to connect to procurement server. Please refresh.");
        }
      } finally {
        if (isSubscribed && !silent) {
          setIsLoading(false);
        }
      }
    };

    fetchBundle(false);

    // Real-time synchronization:
    // If the admin modifies bundle items, prices, or status, sync changes when user refocuses or every 5s
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        fetchBundle(true);
      }
    };

    window.addEventListener("focus", handleVisibilityOrFocus);
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);

    const intervalTimer = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchBundle(true);
      }
    }, 6000);

    return () => {
      isSubscribed = false;
      window.removeEventListener("focus", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      clearInterval(intervalTimer);
    };
  }, [bundleId]);

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundle) return;

    if (!customerName || !phone || !email || !street || !city || !pincode) {
      addToast("Required Fields Missing", "Please fill in all shipping details.", "warning");
      return;
    }

    setIsProcessing(true);

    try {
      await openRazorpayModal({
        amount: bundle.totalAmount,
        name: "Pulmo Care Medical",
        description: `Quotation: ${bundle.title}`,
        receipt: bundle.bundleId,
        prefill: {
          name: customerName,
          email: email,
          contact: phone,
        },
        notes: {
          bundleId: bundle.bundleId,
          clientName: customerName,
          city,
        },
        onSuccess: async (response) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                type: "bundle",
                bundleId: bundle.bundleId,
                customerDetails: {
                  name: customerName,
                  phone,
                  email,
                  address: street,
                  city,
                  state,
                  pincode,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setConfirmedOrder({
                orderId: verifyData.orderId,
                bundle: verifyData.bundle,
                paymentDetails: verifyData.bundle.paymentDetails,
              });
              setBundle(verifyData.bundle);
              addToast("Payment Verified!", "Your custom procurement order has been officially registered.");
            } else {
              addToast("Verification Issue", verifyData.error || "Please contact support.", "warning");
            }
          } catch (err) {
            console.error("Bundle verification error:", err);
          } finally {
            setIsProcessing(false);
          }
        },
        onDismiss: () => {
          setIsProcessing(false);
          addToast("Payment Cancelled", "Razorpay checkout modal was closed.", "info");
        },
        onError: (err) => {
          setIsProcessing(false);
          addToast("Payment Failed", err?.description || "Razorpay transaction was not completed.", "error");
        },
      });
    } catch (err: any) {
      setIsProcessing(false);
      addToast("Gateway Error", err?.message || "Failed to initialize Razorpay.", "error");
    }
  };

  const handlePrintReceipt = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0A192F] font-inter flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 rounded-full border-4 border-[#0066FF] border-t-transparent animate-spin mb-4" />
          <h3 className="font-archivo font-bold text-lg text-[#0A192F]">Loading Custom Equipment Bundle...</h3>
          <p className="text-xs text-[#64748B]">Verifying official Löwenstein Medical quotation parameters.</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (fetchError || !bundle) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0A192F] font-inter flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="font-archivo font-extrabold text-2xl text-[#0A192F]">Quotation Not Found</h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            {fetchError || "The custom quotation link you entered does not exist or may have expired."}
          </p>
          <div className="pt-4">
            <Link href="/" className="btn btn-primary !py-3 !px-6 text-xs inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Medical Storefront</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A192F] font-inter flex flex-col selection:bg-[#0066FF] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* BREADCRUMB HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <Link href="/" className="hover:text-[#0066FF] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </Link>
            <span>/</span>
            <span>Commercial Quotations</span>
            <span>/</span>
            <span className="font-bold text-[#0A192F] font-mono">{bundle.bundleId}</span>
          </div>

          <div className="flex items-center gap-2">
            {bundle.status === "paid" && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-archivo font-extrabold border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PAID IN FULL</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-[#0066FF] bg-[#EBF5FF] px-3 py-1 rounded-full font-archivo font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Clinical Procurement</span>
            </div>
          </div>
        </div>

        {/* PROMINENT "PAID" NOTIFICATION BANNER */}
        {bundle.status === "paid" && (
          <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/70 to-emerald-50 border-2 border-emerald-500 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-archivo font-extrabold text-base sm:text-lg text-emerald-950">
                    Payment Received &amp; Quotation Settled
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    PAID IN FULL
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                  This custom procurement link is officially <strong>PAID</strong>. Total amount of <strong>₹{bundle.totalAmount.toLocaleString("en-IN")}.00</strong> has been settled. Order reference: <strong className="font-mono text-emerald-950">{confirmedOrder?.orderId || confirmedOrder?.order?.orderId || bundle.paymentDetails?.orderId || `ORD-${bundle.bundleId}`}</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-end">
              <button
                type="button"
                onClick={() => setShowSpecsInReceipt(!showSpecsInReceipt)}
                className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 font-archivo font-bold text-xs hover:bg-emerald-50 transition-colors shadow-2xs cursor-pointer"
              >
                {showSpecsInReceipt ? "Hide Item Details" : "View Hardware Details"}
              </button>
            </div>
          </div>
        )}

        {/* CONFIRMED PAYMENT RECEIPT VIEW */}
        {confirmedOrder ? (
          <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-300">
            {/* Receipt Summary Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-xl text-center space-y-8">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-archivo font-extrabold text-xs uppercase tracking-wider mb-2">
                  Payment Received &amp; Order Confirmed
                </span>
                <h1 className="font-archivo font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
                  Thank You for Your Procurement!
                </h1>
                <p className="text-sm text-[#64748B] mt-2">
                  Order <strong className="text-[#0066FF] font-mono">{confirmedOrder.orderId || confirmedOrder.order?.orderId || bundle.paymentDetails?.orderId || `ORD-${bundle.bundleId}`}</strong> has been logged in MongoDB Atlas and sent to our biomedical logistics team.
                </p>
              </div>

              {/* Receipt Key Metrics */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] text-left space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <span className="text-xs text-[#64748B] block">Bundle Title</span>
                    <span className="font-archivo font-bold text-sm text-[#0A192F]">{bundle.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#64748B] block">Amount Paid</span>
                    <span className="font-archivo font-extrabold text-base text-[#10B981]">
                      ₹{bundle.totalAmount.toLocaleString("en-IN")}.00
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#64748B] block">Client / Hospital:</span>
                    <span className="font-bold text-[#0A192F]">{bundle.paymentDetails?.payerName || customerName || bundle.clientName || "Direct Client"}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block">Payment Method:</span>
                    <span className="font-bold text-emerald-700 uppercase">
                      {bundle.paymentDetails?.paymentMethod === "razorpay" ? "Razorpay (Online Verified)" : bundle.paymentDetails?.paymentMethod ? `${bundle.paymentDetails.paymentMethod.toUpperCase()} (VERIFIED)` : "ONLINE VERIFIED"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block">Transaction Reference:</span>
                    <span className="font-mono font-bold text-[#0066FF]">
                      {bundle.paymentDetails?.transactionId || confirmedOrder?.paymentDetails?.transactionId || "VERIFIED"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block">Payment Timestamp:</span>
                    <span className="font-bold text-[#0A192F]">
                      {bundle.paymentDetails?.paidAt ? new Date(bundle.paymentDetails.paidAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Confirmed Online"}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[#64748B] block">Delivery Destination:</span>
                    <span className="text-[#334155] font-medium">
                      {bundle.paymentDetails?.shippingAddress ? `${bundle.paymentDetails.shippingAddress}, ${bundle.paymentDetails.city || ""}, ${bundle.paymentDetails.state || ""} - ${bundle.paymentDetails.pincode || ""}` : (street ? `${street}, ${city}, ${state} - ${pincode}` : "Registered Hospital Facility")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Receipt Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-auto btn btn-dark !py-3 !px-6 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official Receipt</span>
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto btn btn-primary !py-3 !px-6 text-xs flex items-center justify-center gap-2"
                >
                  <span>Browse Storefront</span>
                </Link>
              </div>
            </div>

            {/* FULL EQUIPMENT BREAKDOWN IN PAID VIEW */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div>
                  <h3 className="font-archivo font-extrabold text-base text-[#0A192F] uppercase tracking-wider">
                    Equipment Included in Settled Order ({bundle.items.length} Products)
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Official Löwenstein Medical German biomedical devices supplied under this procurement.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Fully Settled
                </span>
              </div>

              <div className="divide-y divide-[#F1F5F9]">
                {bundle.items.map((it, idx) => {
                  const rowTotal = it.customPrice * it.quantity;
                  const imgHasError = imageErrors[it.productId || idx.toString()];

                  return (
                    <div key={idx} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4 min-w-0">
                        {imgHasError ? (
                          <div className="w-16 h-16 rounded-2xl bg-[#EBF5FF] text-[#0066FF] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                            <Package className="w-8 h-8" />
                          </div>
                        ) : (
                          <img
                            src={it.image}
                            alt={it.name}
                            onError={() => setImageErrors((prev) => ({ ...prev, [it.productId || idx.toString()]: true }))}
                            className="w-16 h-16 rounded-2xl object-contain bg-[#F8FAFC] p-1.5 border border-[#E2E8F0] shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <span className="font-archivo font-bold text-sm text-[#0A192F] block truncate">
                            {it.name}
                          </span>
                          <span className="text-xs text-[#64748B] block mt-0.5 truncate">
                            {it.category}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[#0066FF] font-semibold">
                              Qty: <strong>{it.quantity}</strong> × ₹{it.customPrice.toLocaleString("en-IN")}.00
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              2-Yr Warranty
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-archivo font-extrabold text-base text-[#0A192F] block">
                          ₹{rowTotal.toLocaleString("en-IN")}.00
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ACTIVE QUOTATION & PAYMENT CHECKOUT VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: QUOTATION SUMMARY & EQUIPMENT LIST (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F1F5F9]">
                  <div>
                    <span className="text-[10px] font-bold text-[#0066FF] uppercase tracking-wider bg-[#EBF5FF] px-2.5 py-0.5 rounded-full inline-block mb-1">
                      Custom Clinical Bundle Quotation
                    </span>
                    <h1 className="font-archivo font-extrabold text-2xl sm:text-3xl text-[#0A192F]">
                      {bundle.title}
                    </h1>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#64748B] block font-mono">Reference</span>
                    <span className="font-mono font-bold text-sm text-[#0066FF]">{bundle.bundleId}</span>
                  </div>
                </div>

                {bundle.clientName && (
                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <Building2 className="w-4 h-4 text-[#0066FF]" />
                    <span>Prepared specifically for: <strong className="text-[#0A192F]">{bundle.clientName}</strong></span>
                  </div>
                )}

                {bundle.description && (
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] leading-relaxed">
                    <strong className="text-[#0A192F] block font-archivo uppercase text-[10px] tracking-wider mb-1">
                      Biomedical Scope &amp; Warranty Terms:
                    </strong>
                    {bundle.description}
                  </div>
                )}
              </div>

              {/* Itemized Equipment Matrix */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <h3 className="font-archivo font-extrabold text-base text-[#0A192F] uppercase tracking-wider">
                    Equipment Included In Bundle ({bundle.items.length})
                  </h3>
                  <span className="text-xs text-[#64748B]">Clinical German Hardware</span>
                </div>

                <div className="divide-y divide-[#F1F5F9]">
                  {bundle.items.map((it, idx) => {
                    const rowTotal = it.customPrice * it.quantity;
                    const hasDiscount = it.catalogPrice && it.catalogPrice > it.customPrice;
                    const imgHasError = imageErrors[it.productId || idx.toString()];

                    return (
                      <div key={idx} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-4 min-w-0">
                          {imgHasError ? (
                            <div className="w-16 h-16 rounded-2xl bg-[#EBF5FF] text-[#0066FF] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                              <Package className="w-8 h-8" />
                            </div>
                          ) : (
                            <img
                              src={it.image}
                              alt={it.name}
                              onError={() => setImageErrors((prev) => ({ ...prev, [it.productId || idx.toString()]: true }))}
                              className="w-16 h-16 rounded-2xl object-contain bg-[#F8FAFC] p-1.5 border border-[#E2E8F0] shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <span className="font-archivo font-bold text-sm text-[#0A192F] block truncate">
                              {it.name}
                            </span>
                            <span className="text-xs text-[#64748B] block mt-0.5 truncate">
                              {it.category}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-[#0066FF] font-semibold">
                                Qty: <strong>{it.quantity}</strong> × ₹{it.customPrice.toLocaleString("en-IN")}.00
                              </span>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                2-Yr Warranty
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          {hasDiscount && (
                            <span className="text-[11px] text-[#94A3B8] line-through block">
                              ₹{((it.catalogPrice || 0) * it.quantity).toLocaleString("en-IN")}.00
                            </span>
                          )}
                          <span className="font-archivo font-extrabold text-base text-[#0A192F] block">
                            ₹{rowTotal.toLocaleString("en-IN")}.00
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#0066FF] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-[#0A192F] block">2 Years Clinical Warranty</span>
                    <span className="text-[10px] text-[#64748B]">Official German Standard</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#10B981] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-[#0A192F] block">Express Delivery</span>
                    <span className="text-[10px] text-[#64748B]">Safe Medical Handling</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#0066FF] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-[#0A192F] block">ISO 27001 Encrypted</span>
                    <span className="text-[10px] text-[#64748B]">PCI-DSS Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CLIENT INFO & PAYMENT CHECKOUT (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              <form onSubmit={handleProcessPayment} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-lg space-y-6">
                <div>
                  <h3 className="font-archivo font-extrabold text-xl text-[#0A192F]">
                    Complete Procurement Order
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Enter shipping details and choose your preferred payment method.
                  </p>
                </div>

                {/* 1. Client / Hospital Shipping Details */}
                <div className="space-y-3">
                  <span className="text-[11px] font-archivo font-bold text-[#0A192F] uppercase tracking-wider block">
                    1. Delivery Address &amp; Contact
                  </span>

                  <div className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Recipient Name / Hospital Facility *"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number *"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Street Address / Department *"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City *"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                      />
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State *"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                      />
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Pincode *"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        placeholder="Hospital GSTIN / Doctor Registration (Optional)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Integrated Razorpay Payment Gateway */}
                <div className="space-y-3 pt-3 border-t border-[#F1F5F9]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-archivo font-bold text-[#0A192F] uppercase tracking-wider block">
                      2. Secure Payment Gateway
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Razorpay Verified</span>
                    </span>
                  </div>

                  <div className="bg-[#EBF5FF]/60 p-4 sm:p-5 rounded-2xl border-2 border-[#0066FF]/40 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0066FF] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                          ⚡
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-archivo font-bold text-sm text-[#0A192F]">
                              Razorpay Live Checkout
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase">
                              Active
                            </span>
                          </div>
                          <span className="text-[11px] text-[#64748B]">
                            Instant settlement &amp; official clinical procurement receipt
                          </span>
                        </div>
                      </div>
                      <Lock className="w-4 h-4 text-[#0066FF]" />
                    </div>

                    <p className="text-[#334155] text-xs leading-relaxed bg-white/90 p-3 rounded-xl border border-[#CBD5E1]/60">
                      Click the button below to launch the official <strong>Razorpay Standard Checkout</strong>. All digital payment modes are supported securely:
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-[#CBD5E1]/70 shadow-2xs">
                        <span className="font-archivo font-bold text-[#0A192F] block text-xs">Instant UPI</span>
                        <span className="text-[10px] text-[#64748B] block mt-0.5">GPay • PhonePe • Paytm</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-[#CBD5E1]/70 shadow-2xs">
                        <span className="font-archivo font-bold text-[#0A192F] block text-xs">All Cards</span>
                        <span className="text-[10px] text-[#64748B] block mt-0.5">Visa • Mastercard • RuPay</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-[#CBD5E1]/70 shadow-2xs">
                        <span className="font-archivo font-bold text-[#0A192F] block text-xs">NetBanking</span>
                        <span className="text-[10px] text-[#64748B] block mt-0.5">50+ Indian Banks</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-[#64748B]">
                      <span className="flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        256-Bit SSL Encrypted
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Instant Hospital GST Invoice
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Price Breakdown & Action */}
                <div className="space-y-2 pt-3 border-t border-[#F1F5F9] text-xs text-[#64748B]">
                  <div className="flex justify-between">
                    <span>Bundle Subtotal</span>
                    <span className="font-archivo font-semibold text-[#0A192F]">
                      ₹{(bundle.totalAmount + (bundle.discountAmount || 0)).toLocaleString("en-IN")}.00
                    </span>
                  </div>

                  {bundle.discountAmount && bundle.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Special Bundle Concession</span>
                      <span>-₹{bundle.discountAmount.toLocaleString("en-IN")}.00</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Clinical Express Shipping</span>
                    <span className="font-bold text-emerald-600 uppercase">FREE</span>
                  </div>

                  <div className="flex justify-between text-sm font-extrabold text-[#0A192F] pt-2 border-t border-[#E2E8F0]">
                    <span>Total Amount Payable</span>
                    <span className="font-archivo text-xl text-[#0066FF]">
                      ₹{bundle.totalAmount.toLocaleString("en-IN")}.00
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full btn btn-primary !py-4 !text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-[0.99] mt-3"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isProcessing
                        ? "Processing Payment..."
                        : `Pay ₹${bundle.totalAmount.toLocaleString("en-IN")}.00 Securely`}
                    </span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748B] pt-2">
                    <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                    <span>256-Bit ISO Clinical Procurement Portal</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
