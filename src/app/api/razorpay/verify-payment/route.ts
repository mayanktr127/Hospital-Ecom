import { NextResponse } from "next/server";
import crypto from "crypto";
import dns from "dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";
import Bundle from "@/models/Bundle";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      type = "checkout", // "checkout" | "bundle"
      orderDetails,
      bundleId,
      customerDetails,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing required Razorpay payment attributes." },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, error: "Razorpay Secret Key not configured on server." },
        { status: 500 }
      );
    }

    // 1. Verify HMAC SHA-256 signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(text)
      .digest("hex");

    const isAuthentic = generatedSignature === razorpay_signature;

    if (!isAuthentic) {
      console.error("Razorpay signature mismatch:", {
        generatedSignature,
        razorpay_signature,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
      return NextResponse.json(
        { success: false, error: "Cryptographic signature verification failed." },
        { status: 400 }
      );
    }

    await dbConnect();

    // 2. Handle Custom Bundle Payment
    if (type === "bundle" || bundleId) {
      const bundle = await Bundle.findOne({
        $or: [
          { bundleId },
          { bundleId: (bundleId || "").toUpperCase() },
          { _id: (bundleId || "").match(/^[0-9a-fA-F]{24}$/) ? bundleId : null },
        ],
      });

      if (!bundle) {
        return NextResponse.json(
          { success: false, error: "Bundle not found." },
          { status: 404 }
        );
      }

      const generatedOrderId = `ORD-BDL-${Math.floor(100000 + Math.random() * 900000)}`;

      // Update bundle status & record payment
      bundle.status = "paid";
      bundle.paymentDetails = {
        paymentMethod: "card", // or online
        transactionId: razorpay_payment_id,
        paidAt: new Date(),
        paidAmount: bundle.totalAmount,
        payerName: customerDetails?.name || bundle.clientName || "Procurement Customer",
        payerPhone: customerDetails?.phone || bundle.clientPhone || "",
        payerEmail: customerDetails?.email || bundle.clientEmail || "",
        shippingAddress: customerDetails?.address || "Medical Facility Delivery",
        city: customerDetails?.city || "Bengaluru",
        state: customerDetails?.state || "Karnataka",
        pincode: customerDetails?.pincode || "560001",
        orderId: generatedOrderId,
      };

      await bundle.save();

      // Automatically mirror into Orders collection
      const newOrder = await Order.create({
        orderId: generatedOrderId,
        customerName: bundle.paymentDetails.payerName,
        phone: bundle.paymentDetails.payerPhone,
        email: bundle.paymentDetails.payerEmail,
        street: bundle.paymentDetails.shippingAddress,
        city: bundle.paymentDetails.city,
        state: bundle.paymentDetails.state,
        pincode: bundle.paymentDetails.pincode,
        landmark: `Custom Bundle: ${bundle.title}`,
        items: bundle.items.map((it: any) => ({
          productId: it.productId,
          name: it.name,
          price: it.customPrice,
          quantity: it.quantity,
          image: it.image,
        })),
        totalAmount: bundle.totalAmount,
        paymentMethod: "Razorpay (Online Verified)",
        orderStatus: "On Progress",
        prescriptionNote: `Paid via Razorpay (Bundle: ${bundle.bundleId}) • Payment ID: ${razorpay_payment_id} • Order ID: ${razorpay_order_id}`,
      });

      return NextResponse.json({
        success: true,
        verified: true,
        type: "bundle",
        orderId: generatedOrderId,
        bundle,
        order: newOrder,
      });
    }

    // 3. Handle Standard Cart Checkout Order
    const generatedOrderId =
      orderDetails?.orderId || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = await Order.create({
      orderId: generatedOrderId,
      customerName: orderDetails.customerName,
      phone: orderDetails.phone,
      email: orderDetails.email,
      street: orderDetails.street,
      city: orderDetails.city,
      state: orderDetails.state,
      pincode: orderDetails.pincode,
      landmark: orderDetails.landmark || undefined,
      items: orderDetails.items,
      totalAmount: orderDetails.totalAmount,
      paymentMethod: "Razorpay (Online Verified)",
      orderStatus: "Confirmed",
      prescriptionNote: `${orderDetails.prescriptionNote || ""} | Razorpay Payment ID: ${razorpay_payment_id} | Order ID: ${razorpay_order_id}`,
    });

    return NextResponse.json({
      success: true,
      verified: true,
      type: "checkout",
      order: newOrder,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to verify Razorpay payment." },
      { status: 500 }
    );
  }
}
