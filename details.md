# Pulmo Care — Technical & Design Specification (`details.md`)

Comprehensive technical and design documentation for the **Pulmo Care** hospital and home healthcare equipment storefront built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Motion.

---

## 1. Flagship Device Banner & Logo Sizing Specs

- **Component:** Section 3 in `src/app/page.tsx` & `Navbar.tsx`
- **Banner Styling:** `bg-gradient-to-br from-[#002A4E] via-[#003865] to-[#004C84] rounded-[40px] shadow-2xl`
- **Logo Sizing:** `h-7 sm:h-8 w-auto object-contain` in `Navbar.tsx`

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
