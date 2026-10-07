import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import Bundle from "@/models/Bundle";
import Order from "@/models/Order";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const bundle = await Bundle.findOne({
      $or: [{ bundleId: id }, { bundleId: id.toUpperCase() }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!bundle) {
      return NextResponse.json({ success: false, error: "Bundle not found" }, { status: 404 });
    }

    if (bundle.status === "paid") {
      return NextResponse.json(
        {
          success: false,
          error: "This bundle has already been paid for.",
          bundle,
        },
        { status: 400 }
      );
    }

    const payerName = body.customerName || body.payerName || bundle.clientName || "Customer";
    const payerPhone = body.phone || body.payerPhone || bundle.clientPhone || "9999999999";
    const payerEmail = body.email || body.payerEmail || bundle.clientEmail || "client@pulmocare.in";
    const street = body.street || body.address || body.shippingAddress || "Hospital Supply Desk";
    const city = body.city || "Bengaluru";
    const state = body.state || "Karnataka";
    const pincode = body.pincode || "560001";
    const paymentMethod = body.paymentMethod || "UPI";
    const txId = body.transactionId || `TXN-${Date.now().toString().slice(-8)}`;

    const generatedOrderId = `ORD-BDL-${Date.now().toString().slice(-6)}`;

    // Create Order in MongoDB
    const orderItems = bundle.items.map((it: any) => ({
      productId: it.productId,
      name: it.name,
      price: it.customPrice,
      quantity: it.quantity,
      image: it.image,
    }));

    const newOrder = await Order.create({
      orderId: generatedOrderId,
      customerName: payerName,
      phone: payerPhone,
      email: payerEmail,
      street,
      city,
      state,
      pincode,
      landmark: body.landmark || `Custom Bundle: ${bundle.title}`,
      items: orderItems,
      totalAmount: bundle.totalAmount,
      paymentMethod: paymentMethod === "card" ? "Credit/Debit Card (Online Paid)" : "UPI (Instant Paid)",
      orderStatus: "On Progress",
      prescriptionNote: `Paid via Custom Bundle Link (${bundle.bundleId}) • Ref: ${txId}`,
    });

    // Update Bundle Status and Payment Details
    bundle.status = "paid";
    bundle.paymentDetails = {
      paymentMethod,
      transactionId: txId,
      paidAt: new Date(),
      paidAmount: bundle.totalAmount,
      payerName,
      payerPhone,
      payerEmail,
      shippingAddress: street,
      city,
      state,
      pincode,
      orderId: generatedOrderId,
    };

    await bundle.save();

    return NextResponse.json({
      success: true,
      message: "Payment processed and order logged successfully",
      bundle,
      order: newOrder,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
