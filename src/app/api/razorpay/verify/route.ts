import { NextResponse } from "next/server";
import crypto from "crypto";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
      isSimulated,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { success: false, error: "Missing required payment identifiers" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isPlaceholderSecret =
      !keySecret ||
      keySecret.includes("dummy") ||
      keySecret.includes("your_key");

    // If real keys are configured and this is not a sandbox simulation, verify HMAC signature
    if (!isSimulated && !isPlaceholderSecret) {
      if (!razorpay_signature) {
        return NextResponse.json(
          { success: false, error: "Missing razorpay_signature" },
          { status: 400 }
        );
      }

      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, error: "Payment signature verification failed. Untrusted transaction." },
          { status: 400 }
        );
      }
    }

    // Connect to database and save verified order
    await dbConnect();

    const orderId = orderData?.orderId || `ORD-${Date.now().toString().slice(-6)}`;

    // Check if order with this orderId already exists (e.g. from prior attempt)
    let existingOrder = await Order.findOne({ orderId });

    if (existingOrder) {
      existingOrder.paymentMethod = "UPI / Razorpay";
      existingOrder.paymentStatus = "Paid";
      existingOrder.orderStatus = "On Progress";
      existingOrder.razorpayOrderId = razorpay_order_id;
      existingOrder.razorpayPaymentId = razorpay_payment_id;
      existingOrder.razorpaySignature = razorpay_signature || "simulated_signature";
      await existingOrder.save();

      return NextResponse.json({
        success: true,
        order: existingOrder,
        message: "Order payment successfully verified and updated",
      });
    }

    const newOrder = await Order.create({
      ...orderData,
      orderId,
      paymentMethod: "UPI / Razorpay",
      paymentStatus: "Paid",
      orderStatus: "On Progress",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature || "simulated_signature",
    });

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
        message: "Order created and payment verified via Razorpay",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error verifying payment",
      },
      { status: 500 }
    );
  }
}
