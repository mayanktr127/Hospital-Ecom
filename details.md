# Pulmo Care — Technical & Design Specification (`details.md`)

Comprehensive technical and design documentation for the **Pulmo Care** hospital and home healthcare equipment storefront built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Motion.

---

## 1. Categories Management & Frontend Synchronization Specs

- **Mongoose Model:** `src/models/Category.ts`
- **API Handler:** `src/app/api/categories/route.ts` (GET, POST, PUT, DELETE)
- **Admin Module:** `src/app/admin/page.tsx` (`activeTab === "categories"`)
- **Category Overview Component:** `src/components/products/CategoryOverviewComponent.tsx`
- **Dynamic Catch-All Route:** `src/app/category/[slug]/page.tsx`
- **Frontend Real-Time Synchronization:**
  - `src/components/products/ProductSection.tsx` reads `useAdmin().products` and `useAdmin().categories`.
  - `src/app/page.tsx` ("Shop by Category") renders dynamic category cards and calculates product counts live from `useAdmin().products`.

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
