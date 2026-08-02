/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* PulmoCare pastel system (newdesign.md §1) */
        navy: {
          900: "#0a1f3c",
          800: "#12315c",
          700: "#1a4079",
        },
        brand: {
          600: "#2a6ecb",
          500: "#4b8ee6",
          400: "#7fb0ee",
        },
        lilac: "#e9e6fb",
        sky: "#dcebfb",
        blush: "#fbe6ee",
        mint: "#e0f3ec",
        peach: "#fdeadf",
        cream: "#f6f4fb",
        line: "#e9edf4",
        ok: "#1fb37a",
        warn: "#e8a33d",
        danger: "#dc4b56",

        /* Legacy keys kept so existing utilities keep compiling — values
           remapped onto the pastel palette. Do not rename: JSX references
           these class names. */
        loewenstein: {
          navy: "#0a1f3c",
          blue: "#12315c",
          accent: "#2a6ecb",
          ice100: "#f6f4fb",
          ice200: "#dcebfb",
          dark: "#0a1f3c",
        },
        ink: "#182a41",
        paper: "#f7f6fb",
        muted: "#64748b",
        cardIce: "#dcebfb",
        cardSlate: "#e9e6fb",
        cardMint: "#e0f3ec",
      },
      fontFamily: {
        archivo: ["var(--font-archivo)", "Space Grotesk", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "14px",
        md: "20px",
        lg: "28px",
        xl: "36px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(24, 42, 65, .05)",
        lift: "0 16px 44px rgba(24, 42, 65, .09)",
        deep: "0 30px 70px rgba(24, 42, 65, .14)",
        inset: "inset 0 1px 0 rgba(255,255,255,.8)",
      },
      maxWidth: {
        wrap: "1240px",
      },
    },
  },
  plugins: [],
};
