import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      gradientFlash: {
        "0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" },
      },
      textPopSimple: {
        "0%": {
          opacity: 0,
          transform: "scale(0.3)",
        },
        "60%": {
          opacity: 1,
          transform: "scale(1.1)",
        },
        "100%": {
          opacity: 1,
          transform: "scale(1)",
        },
      },
      backgroundSize: {
        "400%": "400% 400%",
      },

      colors: {
        // Tu color de marca personalizado
        "brand-primary": "#034651",
        "brand-hover": "#04606A",
        "brand-bg": "#F1F6F7",
        "brand-form": "#E8EFF0",
        "brand-card": "#F7FAFA",
        "text-main": "#1E2B2E",
        "text-secondary": "#4B5D60",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        lg: "calc(var(--radius) + 2px)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
      },
      keyframes: {
        textPopSimple: {
          "0%": {
            opacity: "0",
            transform: "scale(0.3)",
          },
          "60%": {
            opacity: "1",
            transform: "scale(1.1)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        gradientFlash: {
          "0%": {
            backgroundPosition: "0% 50%",
            filter: "brightness(1)",
          },
          "25%": {
            backgroundPosition: "50% 50%",
            filter: "brightness(1.1)",
          },
          "50%": {
            backgroundPosition: "100% 50%",
            filter: "brightness(1.25)",
          },
          "75%": {
            backgroundPosition: "50% 50%",
            filter: "brightness(1.1)",
          },
          "100%": {
            backgroundPosition: "0% 50%",
            filter: "brightness(1)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",

        flashText: "flashText 1s ease-in-out",
        gradientFlash: "gradientFlash 4s ease-in-out infinite",
        textPopSimple: "textPopSimple 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
