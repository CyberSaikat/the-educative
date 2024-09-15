import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      width: {
        sm: "24rem",
        md: "30rem",
        lg: "36rem",
        xl: "42rem",
        "2xl": "48rem",
        "3xl": "54rem",
        "4xl": "60rem",
        "5xl": "66rem",
        "6xl": "72rem",
        "7xl": "78rem",
        "8xl": "84rem",
        "9xl": "90rem",
        "10xl": "96rem",
        "11xl": "102rem",
        "12xl": "108rem",
        "full": "100%",
      },
      maxWidth: {
        sm: "24rem",
        md: "30rem",
        lg: "36rem",
        xl: "42rem",
        "2xl": "48rem",
        "3xl": "54rem",
        "4xl": "60rem",
        "5xl": "66rem",
        "6xl": "72rem",
        "7xl": "78rem",
        "8xl": "84rem",
        "9xl": "90rem",
        "10xl": "96rem",
        "11xl": "102rem",
        "12xl": "108rem",
        "full": "100%",
      },
      fontFamily: {
        Playfair_Display: ["var(--font-playfair-display)", "serif"],
        Noto_Serif: ["var(--font-noto-serif)", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "stroke": "stroke 5s 1 alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
