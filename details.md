# Pulmo Care — Technical & Design Specification (`details.md`)

Comprehensive technical and design documentation for the **Pulmo Care** hospital and home healthcare equipment storefront built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Motion.

---

## 1. Checkout & Orders Management Technical Specs

- **Checkout Page Route:** `src/app/checkout/page.tsx`
- **Mongoose Schema:** `src/models/Order.ts`
- **API Handler:** `src/app/api/orders/route.ts` (GET, POST, PUT, DELETE)
- **Admin Integration:** `src/app/admin/page.tsx` (`Tracking & Orders` & Dashboard Activity table)
- **Captured Order Fields:**
  - `orderId`: Generated unique ID (e.g. `ORD-781920`).
  - `customerName`: Full customer / doctor name.
  - `phone`: Contact phone number.
  - `email`: Email address.
  - `street`, `city`, `state`, `pincode`, `landmark`: Full shipping address.
  - `items`: Purchased items array with `productId`, `name`, `price`, `quantity`, `image`.
  - `totalAmount`: Total amount in INR (₹).
  - `paymentMethod`: "Cash on Delivery" | "UPI / Razorpay" | "Bank Wire Transfer".
  - `orderStatus`: "On Progress" | "Delivered" | "Cancelled".
  - `prescriptionNote`: Optional prescription / GSTIN note.

---

## 2. Verification & Build Validation

### TypeScript Validation
```bash
npx tsc --noEmit
# Status: Passed (0 errors)
```

### Production Build
```bash
npm run build
# Status: Compiled successfully (0 build errors)
```
