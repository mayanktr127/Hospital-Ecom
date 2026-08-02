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
        loewenstein: {
          navy: "#003865",
          blue: "#005A9C",
          accent: "#007AC1",
          ice100: "#F0F6FA",
          ice200: "#D8E7F3",
          dark: "#001E36",
        },
        ink: "#0A192F",
        paper: "#F8FAFC",
        muted: "#4A607A",
        cardIce: "#EBF3FA",
        cardSlate: "#E2EEF5",
        cardMint: "#E4F4F2",
      },
      fontFamily: {
        archivo: ["var(--font-archivo)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "14px",
        md: "22px",
        lg: "34px",
        xl: "48px",
      },
      boxShadow: {
        soft: "0 2px 4px rgba(0, 56, 101, .04), 0 12px 28px -12px rgba(0, 56, 101, .18)",
        lift: "0 4px 8px rgba(0, 56, 101, .05), 0 28px 60px -24px rgba(0, 56, 101, .35)",
        inset: "inset 0 1px 0 rgba(255,255,255,.8)",
      },
    },
  },
  plugins: [],
};
