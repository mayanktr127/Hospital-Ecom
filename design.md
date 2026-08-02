# Pulmo Care — Design Specification

Design documentation for the **Pulmo Care** hospital and home healthcare equipment storefront application built with Next.js, React, Tailwind CSS, and Motion.

---

## 0. Design Read & Principles (`design-taste-frontend` Skill)

> **Design Read:** "Reading this as: Modern clinical hospital & homecare storefront for medical professionals & patients, with a premium, high-trust, sleek German engineering language, leaning toward Tailwind v4 + Motion + frosted glassmorphism + vibrant cobalt blue accents."

- **`DESIGN_VARIANCE: 8`** (High variance with rich radial card layouts, bento tiles, and dynamic carousels)
- **`MOTION_INTENSITY: 7`** (Physics-based infinite marquee carousel, smooth tab filters, spring micro-interactions)
- **`VISUAL_DENSITY: 4`** (Spacious clinical hardware presentation)

1. **Admin Categories Catalog & Instant Frontend Product Synchronization:**
   - Created Mongoose schema [`Category.ts`](file:///c:/Users/Mayank/Downloads/Hospital%20Equipments/src/models/Category.ts) and REST route `/api/categories` connected to **MongoDB Atlas Cloud Database**.
   - Built full **Categories Catalog Management** module in Admin Panel (`/admin`), complete with Category Name, Slug, Badge, Cover Image upload via Multer, Description, Edit, and Delete options.
   - Updated Admin Product Creation / Edit Modal to dynamically load all available categories.
   - Connected Homepage **"Shop by Category"** grid, category pills, and `ProductSection.tsx` marquee directly to `useAdmin().products` and `useAdmin().categories` — ensuring **ANY newly added product or category created in Admin IMMEDIATELY reflects on the live frontend!**

---

## 2. Company & Brand Information (`https://pulmocare.in/`)

- **Company Name:** Pulmo Care
- **Hotline Phone:** `+91 9343444428`
- **Official Email:** `enquiry@pulmocare.in`
- **Headquarters Address:** `#85, 20th Main Rd, 1st N Block, Rajajinagar, Bengaluru, Karnataka 560010, India`
- **Company Mission:** *"At Pulmocare Medical our continuing mission is working with our partners to provide one of the widest ranges of hospital and home healthcare products available today."*
- **Company Vision:** *"We envision to create a healthcare ecosystem that synergistically bears fruit for all the comprising elements of the ecosystem."*
- **Official Logo:** `/images/pulmocare/pulmocare_logo.png`

---

## 3. Change Log & Design Revisions

- **v1.0 (Initial):** Medcore lime hero + Monarch deep teal commerce synthesis concept.
- **v2.0 (Löwenstein Medical Conversion):** Rebranded initial version.
- **v2.1 (Mega-Dropdown Navigation Redesign):** Implemented multi-column mega-dropdown panels.
- **v2.2 (Top Utility Header Addition):** Added top utility strip with phone and email info.
- **v2.3 (5-Slide Auto Showcase Slider):** Created `ShowcaseSlider.tsx`.
- **v2.4 (Product Grid Spacing Enhancement):** Expanded product card grid spacing.
- **v2.5 (Hero Section Restructuring & Carousel Integration):** Embedded 5-slide carousel into Hero.
- **v2.6 (Official Downloads Center Integration):** Added `DownloadsSection.tsx`.
- **v2.7 (Dedicated `/downloads` Page Route):** Built full dedicated Next.js `/downloads` page route.
- **v2.8 (1,495 Local Download Repository, Image 1 Filter Bar & Pagination):** Exported 1,495 download records.
- **v2.9 (Build Cache Resolution & Server Refresh):** Cleared `.next` build cache.
- **v3.0 (Express + Multer File Server):** Implemented Express + Multer file server.
- **v3.1 (Route Collision Resolution):** Relocated static file repository to `public/doc-files/`.
- **v3.2 (Port & Process Conflict Fix):** Terminated duplicate background processes.
- **v3.3 (1,495 Real Local PDF Files Batch Downloaded):** Executed parallel batch downloader into `public/doc-files/`.
- **v3.4 (Home Page Layout Streamlining):** Streamlined Home page layout.
- **v3.5 (Footer Redesign & 4 Dedicated Legal Pages Created):** Redesigned Footer and built `/legal-notice`, `/privacy-policy`, `/gtcs`, and `/sitemap`.
- **v3.6 (Official Social Media Links Integration):** Connected Footer social media icons to official channels.
- **v3.7 (7 Dedicated Company Section Pages Built):** Built 7 dedicated Next.js routes for the Company section.
- **v3.8 (3 Dedicated Professionals Section Pages Built):** Built 3 dedicated Next.js routes for the Professionals section.
- **v3.9 (Products Sub-Menu Accordion Mapping):** Implemented complete 8-focus product sub-menu tree.
- **v4.0 (70 Local Product Page Routes Built & Scraped):** Scraped official text from 70 product links, built dynamic catch-all route handlers.
- **v4.1 (Batch Image Downloading & Verbatim Text Mapping):** Downloaded section image assets to `public/images/site/` and mapped verbatim text with bold keywords.
- **v4.2 (Homepage Structural Realignment):** Restructured `src/app/page.tsx`.
- **v4.3 (LENA Template Pattern Standardization):** Standardized `ProductDetailPage.tsx`.
- **v4.4 (Verbatim Accordion & 2-Column Downloads List Addition):** Added exact verbatim accordion text for tabs 1-3 and 2-column document list.
- **v4.5 (Accordion Image Asset Alignment & Navbar Positioning Fix):** Paired each accordion tab with its feature image asset.
- **v4.6 (Clean Border Divider Accordion Layout Refinement):** Converted accordion styling to border divider rows.
- **v4.7 (Product Features 3-Column Section):** Integrated 3-column "Product features" section with circular line icons.
- **v4.8 (Interactive 3-Column Products Mega Dropdown Restoration):** Restored full 3-column Products mega dropdown.
- **v4.9 (Hero Sleeping Man Image, Accordion Cutout Image Fix with Toggle Close, & Embedded YouTube Video Modal):** Built in-page embedded YouTube modal player.
- **v5.0 (Full-Width Centered Dropdown Positioning Alignment):** Fixed absolute positioning on `Navbar.tsx` mega dropdown container.
- **v5.1 (Dedicated Pill Capsule Banner Image Section Addition):** Built a separate pill capsule banner image container.
- **v5.2 (Webpack HMR Cache Fix):** Disabled webpack disk cache in dev mode in `next.config.ts`.
- **v5.3 (Hero Banner & Description Sequence Alignment):** Placed sleeping man pill banner in top Hero right column.
- **v5.4 (Full-Width Pill Capsule Banner Above Content Realignment):** Realigned layout sequence.
- **v5.5 (Vendor Chunk Transpilation Fix):** Added `transpilePackages: ["motion", "framer-motion"]` to `next.config.ts`.
- **v5.6 (Strict Accordion Aspect-Ratio Container Alignment):** Enforced a square white card container (`aspect-[#380px]`) for accordion image previews.
- **v5.7 (Required App Router Error Components Addition):** Built `src/app/error.tsx` & `src/app/global-error.tsx`.
- **v5.8 (Header Block Integration Above Description Container):** Placed Title Header block directly above Description container.
- **v5.9 (Title Header Block Positioned in Left Column Above Description):** Placed Title Header Block directly above `introParagraphText` in the left column.
- **v6.0 (Seamless Background Blend with Multiply Filter):** Applied `mix-blend-multiply` and background blending to all product cutout images.
- **v6.1 (Dev Process & Cache Conflict Prevention):** Optimized dev server process handling to prevent build file collisions.
- **v6.2 (Universal 70-Product Structured Dataset Integration):** Generated `structured_products.json` from scraped official data.
- **v6.3 (Official 4 Full Face Mask Pages Mapped Verbatim):** Scraped and mapped exact verbatim taglines, SKUs, intro paragraphs, banner headings, accordion items, downloads, and downloaded image assets for `CARA Full Face`, `JOYCEone Full Face`, `JOYCEeasy Full Face`, and `JOYCEeasy next Full Face`.
- **v7.0 (Pulmo Care Full Rebranding & Official Website Integration):** Rebranded company name to **Pulmo Care**, integrated official Pulmo Care logo (`/images/pulmocare/pulmocare_logo.png`), updated hotline (`+91 9343444428`), email (`enquiry@pulmocare.in`), and headquarters address (`#85, 20th Main Rd, 1st N Block, Rajajinagar, Bengaluru, Karnataka 560010`) matching `https://pulmocare.in/`.
- **v7.1 (Hero Showcase Slider Redesign Matching Lovable.app Reference):** Redesigned `ShowcaseSlider.tsx`.
- **v7.2 (Single Official Logo Image Specification):** Kept exclusively the official Pulmo Care graphic logo image in `Navbar.tsx`.
- **v7.3 (Vendor Chunk Resolution):** Resolved motion vendor chunk module loading errors.
- **v8.0 (Shop by Category Section & 3-Level Navigation Hierarchy):** Implemented homepage "Shop by Category" section matching Pulmo Care screenshot.
- **v9.0 (Real Pulmo Care Scraped Product Catalog Integration):** Replaced dummy products with 23 real devices scraped directly from `https://pulmocare.in/shop/`.
- **v10.0 (Complete Purge of Legacy Data & Rebuilding Pulmo Care Product Pages):** Removed all legacy dummy product data, generated 8 new dedicated Category Overview pages and dynamic catch-all route handlers using `src/data/pulmocare_products.json`.
- **v11.0 (Official Pulmocare.in Homepage Sections Integration):** Added `Our Top Devices` banner, `Why Choose Us / Mission / Vision` 2-column block, and `Value Proposition` strip (`Free Shipping`, `Dedicated Support`, `Working Hours`) matching `pulmocare.in` screenshots.
- **v12.0 (Horizontal Infinity Loop Carousel for Our Top Devices):** Applied `design-taste-frontend` skill principles to convert `ProductSection.tsx` into a 35s horizontal infinity loop marquee with hover pause, manual previous/next circular arrow controls, and category filter pills.
- **v13.0 (Custom AI Generated Consultation Photography):** Generated high-resolution medical doctor consultation asset (`/images/pulmocare/why_choose_us_consultation.png`) and updated `Why Choose Us` section in `src/app/page.tsx`.
- **v14.0 (Universal Image Background Removal & Transparent PNG Conversion):** Converted all site product image assets into 100% transparent RGBA PNG files.
- **v15.0 (AI Deep-Learning Background Extraction with rembg):** Processed all local product cutouts using U2Net AI model, isolating exclusively the medical device hardware and removing all background frames.
- **v16.0 (Masks Category Image Fix & LENA Cutout Restoration):** Fixed broken Masks category image in `src/app/page.tsx` by linking to `/images/pulmocare/pulmo_l-wenstein-lena.png` with AI background removal.
- **v17.0 (Replacement of Downloads with Dedicated Clinical Blog & Products Mega-Dropdown Enhancement):** Removed `Downloads` button from header & footer, created `/blog` route and `/blog/[slug]` dynamic article viewer, and updated Products mega-dropdown menu in `Navbar.tsx`.
- **v18.0 (Redesign of Shop by Category Section):** Applied `design-taste-frontend` skill principles to transform Shop by Category grid into premium layered gradient cards with count badges, floating stages, subtext, and sliding action CTAs.
- **v19.0 (Products Dropdown Synchronization with Shop by Category):** Updated Products mega-dropdown menu in `Navbar.tsx` to list the exact 8 core categories from Shop by Category.
- **v20.0 (Product Detail Page Screenshot Reference Layout Integration):** Added top summary card with city breadcrumbs, pricing (`₹45,990.00`), EMI box (`₹1,617/month`), offer banners (`Free Delivery, COD, Extra Discounts on UPI!`), Razorpay trust badge, Features, Video section, Specifications, Box Contents, Documentation, Additional Info (Warranty), and Customer Reviews across all product pages.
- **v21.0 (Section 3 Flagship Banner Redesign & Small Logo Sizing):** Redesigned Section 3 into a dark navy glassmorphic hero stage with glowing radial pedestals, 100% transparent PNG device cutouts, dual CTAs, and set logo sizing to small (`h-7 sm:h-8`).
- **v22.0 (Full Admin Section & Control Suite Integration):** Built `/admin/login` authentication page with demo credentials button (`admin@pulmocare.in` / `admin123`) and `/admin` Control Suite with full CRUD management for Products and Clinical Blog Posts.
- **v23.0 (Admin Panel Redesign Matching Reference SaaS Layout):** Transformed Admin Panel into a sleek SaaS dashboard matching the reference image layout, complete with sidebar navigation, 3-stack stat metrics, interactive delivery analytics chart with September tooltip popover, live tracker map widget, activity table with status tags, and Pro plan promo card.
- **v24.0 (Full Mobile & Desktop Responsiveness Optimization):** Added mobile hamburger menu and slide-over sidebar drawer to Admin Panel (`/admin`), ensured 100% responsive fluid grid scaling across all mobile devices, tablets, and desktop displays.
- **v25.0 (Mobile UX Fixes for Top Bar, Hamburger Drawer, & Hero Carousel):** Cleaned messy top utility bar on mobile screens, built full mobile hamburger drawer listing all options, and scaled Hero Carousel so text and product images are 100% visible together.
- **v26.0 (Cart & Wishlist Global Drawer Fix & Badge Alignment):** Integrated `<CartDrawer />` and `<WishlistDrawer />` into `RootLayout`, ensuring full interactive slide-over drawer functionality and pixel-perfect badge positioning.
- **v27.0 (MongoDB Atlas Cloud Database Connection):** Connected project to MongoDB Atlas cluster (`vaderharsh127_db_user`), created Mongoose schemas (`Product`, `BlogPost`), API endpoints, seeder handler (`/api/seed`), and live MongoDB sync in `AdminContext.tsx`.
- **v28.0 (Admin Mobile Drawer Complete Section Parity):** Updated Admin mobile drawer in `src/app/admin/page.tsx` to display all menu links (`Tracking & Orders`, `Inquiries & Support`), `OTHERS` section (`Hospital Units`, `Team Members`, `System Setup`), and `PRO SUITE` upgrade card matching Screenshot 2 reference.
- **v29.0 (Admin Customer Reviews Management Module & Live Product Page Sync):** Added Mongoose schema `Review.ts`, `/api/reviews` API routes, `Customer Reviews` moderation tab in `src/app/admin/page.tsx` with read/approve/delete/create capabilities, and synced live review updates directly to `ProductDetailPage.tsx`.
- **v30.0 (Respbuy.com Data Scraping & Product Pricing/Specification Enrichment):** Scraped exact matching device pages from `respbuy.com`, updated pricing in INR across all 23 devices, and enriched technical specifications and bulleted features in `pulmocare_products.json`, `AdminContext.tsx`, and `/api/seed`.
- **v31.0 (Unique Product Description, Price & Specification Integration):** Updated `ProductDetailPage.tsx` to dynamically render distinct titles, prices, descriptions, features, and specifications for every individual product page across the storefront.
- **v32.0 (Exact Product Photo Matching & Image Override Fix):** Verified 100% local presence of all product image assets and updated `ProductDetailPage.tsx` to render the matching product image for every device and mask.
- **v33.0 (Homepage Contact & Inquiry Form + Admin Lead Tracker Suite):** Built `ContactSection.tsx`, `Inquiry.ts` model, `/api/inquiries` REST route, and full Admin `Inquiries & Support` lead management module connected to MongoDB Atlas.
- **v34.0 (Multer Image Upload Integration & 21-Product MongoDB Atlas Seeding):** Built `/api/upload` Multer endpoint, integrated image file uploader with live thumbnail preview into Admin Product Modal, and seeded all 21 website products directly into MongoDB Atlas.
- **v35.0 (Dedicated Checkout Page Route & Live Admin Orders Integration):** Built `/checkout` route with customer contact/shipping form, payment options, order summary, `/api/orders` API endpoint, `Order.ts` model, and live order tracking dashboard in Admin Panel (`/admin`).
- **v36.0 (Admin Categories Catalog Management & Instant Frontend Sync Fix):** Built Mongoose schema `Category.ts`, `/api/categories` API endpoint, Categories Catalog tab in `/admin`, and rewired `ProductSection.tsx` & `src/app/page.tsx` to render products and categories directly from `useAdmin()`.
