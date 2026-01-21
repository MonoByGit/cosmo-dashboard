import type { Config } from "tailwindcss";

const config: Config = {
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
      colors: {
        // Claude/Anthropic Grayscale (Primary palette)
        claude: {
          black: '#1a1a1a',        // Primary text
          'gray-900': '#2d2d2d',   // Secondary text
          'gray-700': '#525252',   // Tertiary text
          'gray-500': '#737373',   // Muted text
          'gray-400': '#a3a3a3',   // Placeholder
          'gray-300': '#d4d4d4',   // Disabled
          'gray-200': '#e5e5e5',   // Borders
          'gray-100': '#f5f5f5',   // Subtle backgrounds
          'gray-50': '#fafafa',    // Page background
          white: '#ffffff',        // Cards, surfaces
        },

        // Subtle accents (for badges, status indicators only)
        accent: {
          blue: '#3b82f6',         // Links, interactive (Claude blue)
          green: '#22c55e',        // Success
          red: '#ef4444',          // Error/destructive
          orange: '#f97316',       // Warning
          purple: '#a855f7',       // Secondary accent (minimal use)
        },

        // Shadcn compatibility (mapped to Claude tokens)
        border: '#e5e5e5',        // claude-gray-200
        input: '#fafafa',         // claude-gray-50
        ring: '#3b82f6',          // accent-blue
        background: '#fafafa',    // claude-gray-50
        foreground: '#1a1a1a',    // claude-black
        primary: {
          DEFAULT: '#1a1a1a',     // claude-black
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f5f5f5',     // claude-gray-100
          foreground: '#1a1a1a',  // claude-black
        },
        destructive: {
          DEFAULT: '#ef4444',     // accent-red
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f5f5f5',     // claude-gray-100
          foreground: '#737373',  // claude-gray-500
        },
        popover: {
          DEFAULT: '#ffffff',     // claude-white
          foreground: '#1a1a1a',  // claude-black
        },
        card: {
          DEFAULT: '#ffffff',     // claude-white
          foreground: '#1a1a1a',  // claude-black
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      boxShadow: {
        // Minimal Claude-style shadows
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'lg': '0 4px 6px 0 rgba(0, 0, 0, 0.07)',
      },
      spacing: {
        // Carbon spacing scale (8px base unit)
        // Shadcn uses different scale, so we ADD Carbon without breaking Shadcn
        'carbon-1': '0.25rem',  // 4px
        'carbon-2': '0.5rem',   // 8px
        'carbon-3': '1rem',     // 16px
        'carbon-4': '1.5rem',   // 24px
        'carbon-5': '2rem',     // 32px
        'carbon-6': '3rem',     // 48px
        'carbon-7': '4rem',     // 64px
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
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
