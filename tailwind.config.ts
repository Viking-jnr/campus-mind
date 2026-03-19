// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'message-fade': 'slideUp 0.3s ease-out forwards',
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-theme"),
  ],
}

export default config
