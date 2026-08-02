# PulmoCare — Design System Spec (`newdesign.md`)

A single source of truth for restyling every page of the PulmoCare storefront to the **light pastel** direction, **without changing any functionality**. Apply tokens and component classes; never touch application logic, data fetching, routing, cart state, or form handlers.

> **Golden rule:** This is a *skin*, not a rewrite. If applying a style forces you to change a function, an API call, a route, or a state variable — stop. Style only wraps and presentation.

---

## 0. How to apply this without breaking things

1. Add the token block (Section 1) to your global stylesheet **once** (`:root`).
2. Restyle by targeting existing classes/elements — do **not** rename component props, IDs used by JS, `name`/`for` attributes on forms, or data attributes.
3. Keep every existing event handler, `onClick`, `onSubmit`, route, and API call exactly as-is.
4. Preserve all `aria-*`, `role`, `alt`, and label attributes. Add missing ones; never remove.
5. Test after each page: cart still adds/removes, forms still submit, filters still filter, links still route.

**Do NOT restyle away:** loading states, error states, empty states, disabled states, validation messages. Give each a pastel treatment (Section 6) — but they must still fire.

---

## 1. Design tokens

```css
:root{
  /* Navy — trust anchors, text, footer, primary CTAs */
  --navy-900:#0a1f3c;
  --navy-800:#12315c;
  --navy-700:#1a4079;
  --blue-600:#2a6ecb;   /* primary action */
  --blue-500:#4b8ee6;   /* hover */
  --blue-400:#7fb0ee;

  /* Pastel wash — hero, section backgrounds, accents */
  --lilac:#e9e6fb;
  --sky:#dcebfb;
  --blush:#fbe6ee;
  --mint:#e0f3ec;
  --peach:#fdeadf;
  --cream:#f6f4fb;

  /* Neutrals */
  --ink:#182a41;      /* body text */
  --muted:#64748b;    /* secondary text */
  --line:#e9edf4;     /* borders */
  --bg:#f7f6fb;       /* page background */
  --white:#fff;

  /* State */
  --amber:#f2b134;    /* ratings */
  --ok:#1fb37a;       /* success */
  --warn:#e8a33d;
  --danger:#dc4b56;   /* errors — use, don't hide */

  /* Radius */
  --r-lg:28px; --r:20px; --r-sm:14px;

  /* Shadow */
  --sh-sm:0 2px 8px rgba(24,42,65,.05);
  --sh:0 16px 44px rgba(24,42,65,.09);
  --sh-lg:0 30px 70px rgba(24,42,65,.14);

  /* Type */
  --disp:'Space Grotesk',system-ui,sans-serif;  /* headings, numbers, buttons */
  --body:'Inter',system-ui,sans-serif;          /* body */

  --maxw:1240px;
}
```

Fonts (add once to `<head>` or global CSS):
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;450;500;600&display=swap" rel="stylesheet">
```

---

## 2. Type scale

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero H1 | Space Grotesk | `clamp(44px,6.4vw,80px)` | 500 | letter-spacing −.04em, line-height .98 |
| Section H2 | Space Grotesk | `clamp(32px,4.6vw,52px)` | 500 | |
| Card H3 | Space Grotesk | 16–19px | 600 | |
| Eyebrow | Inter | 12px | 600 | uppercase, letter-spacing .12em, color `--blue-600` |
| Body | Inter | 15–17px | 400 | color `--ink`/`--muted` |
| Price | Space Grotesk | 21px | 700 | color `--navy-900` |

**Signature: highlight-swipe.** Wrap the key word in a headline:
```html
<span class="hl">clinical-grade</span>
```
```css
.hl{position:relative;white-space:nowrap;z-index:1}
.hl::after{content:"";position:absolute;left:-4px;right:-4px;bottom:6px;height:38%;background:var(--sky);z-index:-1;border-radius:4px}
.hl.mint::after{background:var(--mint)}
.hl.blush::after{background:var(--blush)}
```
Use **once or twice per page**, on the single most important phrase. Overusing it kills it.

---

## 3. Buttons (keep existing handlers — restyle only)

```css
.btn{display:inline-flex;align-items:center;gap:9px;font-family:var(--disp);font-weight:600;font-size:15px;padding:14px 26px;border-radius:999px;cursor:pointer;border:0;transition:transform .2s,box-shadow .2s,background .2s}
.btn-dark{background:var(--navy-900);color:#fff}          /* primary nav/CTA */
.btn-dark:hover{background:var(--navy-800);transform:translateY(-2px)}
.btn-primary{background:var(--blue-600);color:#fff;box-shadow:0 10px 24px rgba(42,110,203,.3)} /* add-to-cart, submit */
.btn-primary:hover{background:var(--blue-500);transform:translateY(-2px)}
.btn-soft{background:#fff;color:var(--navy-800);border:1.5px solid var(--line)}  /* secondary */
.btn-soft:hover{border-color:var(--blue-400);color:var(--blue-600)}
.btn-pill{background:var(--mint);color:var(--navy-800)}   /* tertiary/tag actions */
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none} /* keep disabled logic */
```
Arrow-in-circle affordance for primary CTAs: append `<span class="ar">→</span>` styled as a 24px inset circle.

---

## 4. Layout zones (the storefront seam)

The core rule that keeps this coherent: **pastel in the upper/marketing funnel, crisp white where commerce happens.**

| Zone | Background | Why |
|---|---|---|
| Hero | pastel gradient canvas (Section 5) | invite, brand feel |
| Spotlight / category teasers | pastel gradient cards | browse |
| Flagship / promo blocks | pastel gradient panel | story |
| **Product grid / listing / PDP / cart / checkout** | **white `#fff`** | pricing & actions must read cleanly |
| Footer, "why us" panel | navy `--navy-900` | trust anchor |

Container: `.wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px}`
Section rhythm: `section{padding:88px 0}` (60px on mobile).

Pastel gradient recipe (reuse for hero/CTA/flagship):
```css
background:
  radial-gradient(120% 120% at 10% 0%,var(--lilac) 0%,transparent 55%),
  radial-gradient(120% 120% at 90% 20%,var(--blush) 0%,transparent 50%),
  radial-gradient(120% 120% at 60% 100%,var(--sky) 0%,transparent 60%),
  linear-gradient(120deg,#efe9fb,#e4effb 55%,#fbeaf1);
```

---

## 5. Core components

**Glass card** (floating stat/info card, PDP spec box):
```css
.glass{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.9);border-radius:var(--r);box-shadow:var(--sh-sm);padding:18px}
```

**Product card** — keep the existing image, title, price, and add-to-cart button wiring; restyle the shell:
```css
.prod{background:#fff;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;transition:.25s;display:flex;flex-direction:column}
.prod:hover{transform:translateY(-5px);box-shadow:var(--sh);border-color:var(--sky)}
.prod .media{height:206px;display:grid;place-items:center;position:relative} /* pastel tint per card */
.prod .price .now{font-family:var(--disp);font-weight:700;font-size:21px;color:var(--navy-900)}
.prod .price .was{font-size:14px;color:var(--muted);text-decoration:line-through}
.prod .add{width:100%;justify-content:center;padding:12px} /* .btn.btn-primary */
```

**Category tile / bento** — feature tile spans 2×2 navy gradient; rest are white with pastel tags. Tag pill: `background:var(--sky);color:var(--blue-600)`.

**Filter chip** (keep filter logic; restyle):
```css
.chip{font-size:14px;padding:10px 20px;border-radius:999px;border:1px solid var(--line);background:#fff;color:var(--muted);cursor:pointer}
.chip.active,.chip:hover{background:var(--navy-900);color:#fff;border-color:var(--navy-900)}
```

**Header** (sticky glass) / **Footer** (navy): copy structure from the built page; keep all nav links, cart badge count binding, and search wiring intact.

---

## 6. States — style them, never remove them

| State | Treatment |
|---|---|
| Loading | pastel skeleton: `background:linear-gradient(90deg,var(--cream),var(--sky),var(--cream));` shimmer; keep spinner logic |
| Empty (e.g. empty cart) | centered glass card, soft icon, one clear CTA — "Browse devices" |
| Error / validation | `--danger` text + `--blush` background tint on the field; keep the actual validation logic and messages |
| Success (added to cart, form sent) | `--ok` toast/badge; keep trigger |
| Disabled | `.btn:disabled` opacity .5; keep disabled condition |
| Focus | `:focus-visible{outline:3px solid var(--blue-500);outline-offset:3px}` — never remove |

---

## 7. Page-by-page application

Restyle each page's **shell and components**; leave logic alone.

- **Home** — full treatment (already built as reference).
- **Category / listing** — white product zone, pastel page-header band, filter chips restyled. Keep sort/filter/pagination functions.
- **Product detail (PDP)** — white background; gallery left, glass spec card right; `.btn-primary` add-to-cart. Keep variant selection, quantity, and cart-add logic.
- **Cart / checkout** — **white only**, no pastel behind pricing or forms. Keep every input `name`, calculation, and submit handler. Style inputs: `border:1px solid var(--line);border-radius:var(--r-sm)`.
- **Search results** — white grid, reuse product card. Keep query logic.
- **About / Company** — pastel hero + navy why-panel + quote card.
- **Blog list / post** — pastel list header; white article body, generous measure (~68ch), Inter body.
- **Contact / Appointment** — pastel hero, white form card. Preserve all form fields and submit.
- **Auth (login/register)** — centered white glass card on pastel page bg. Keep auth logic untouched.
- **Admin / dashboard** — apply tokens (colors, radius, type) but keep it **denser and mostly white**; dashboards need scannability over softness. Do not pastel-wash data tables.

---

## 8. Accessibility floor (non-negotiable)

- Body text contrast ≥ 4.5:1. **Pastel backgrounds need dark (`--ink`/`--navy-900`) text — never light text on pastel.**
- Visible `:focus-visible` on every interactive element.
- Respect reduced motion:
```css
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
```
- Keep/keep-adding `alt` on device images, `aria-label` on icon-only buttons (cart, search, favorite).
- Don't rely on color alone for state (pair error color with an icon/text).

---

## 9. Do / Don't

**Do:** apply tokens globally; restyle by class; keep white for commerce; use highlight-swipe sparingly; source real device photography (the #1 gap — placeholders undercut everything).

**Don't:** rename JS-referenced IDs/classes; put pastel behind checkout forms or price tables; use light text on pastel; overuse the highlight; touch any function, route, or API while "redesigning."

---

## 10. Open blockers (flagged in prior reviews — resolve before launch)

1. **Real product photography** — every mockup uses SVG placeholders. This is the biggest visual gap.
2. **Currency mismatch** — USD prices on an India-based (+91, Bengaluru) site. Pick INR or make currency explicit.
3. **Pastel vs. trust** — if buyers are B2B/clinical procurement, test this light look against a navy version; softness can read as "wellness startup" on regulated hardware. Consider the hybrid (light hero, navy commerce anchors).