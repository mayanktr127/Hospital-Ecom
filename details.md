# Pulmo Care — Technical & Design Specification (`details.md`)

Comprehensive technical and design documentation for the **Pulmo Care** hospital and home healthcare equipment storefront built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Motion.

---

## 1. MongoDB Atlas Cluster Technical Specs

- **Connection URI:** `MONGODB_URI` stored in `.env.local`
- **Atlas Cluster Host:** `cluster0.qmqgldx.mongodb.net/pulmocare`
- **Database Utilities:** `src/lib/mongodb.ts` (cached singleton connection for Next.js API routes)
- **Mongoose Models:**
  - `Product` (`src/models/Product.ts`)
  - `BlogPost` (`src/models/BlogPost.ts`)
- **API Endpoints:**
  - `GET/POST/PUT/DELETE /api/products`
  - `GET/POST/PUT/DELETE /api/blogs`
  - `GET /api/seed` (Seeds Pulmo Care dataset into MongoDB Atlas)

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
