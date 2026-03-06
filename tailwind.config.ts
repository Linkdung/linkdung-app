import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      // ─── Color Palette ────────────────────────────────────
      colors: {
        spider: {
          'red': '#E23636',
          'red-dark': '#B01C1C',
          'blue': '#1A3A6B',
          'blue-bright': '#2563EB',
          'black': '#0A0A0A',
          'white': '#F5F5F0',
          'yellow': '#FFD700',
          'yellow-hot': '#FFAA00',
          'pink': '#FF2D78',
          'purple': '#7B2FBE',
          'cyan': '#00D4FF',
          'ink': '#1A1A2E',
        },
        halftone: {
          dot: 'rgba(0,0,0,0.15)',
        },
      },

      // ───  Fonts ────────────────────────────────────────────
      fontFamily: {
        display: ['Bangers', 'Impact', 'sans-serif'],
        comic: ['"Comic Neue"', '"Comic Sans MS"', 'cursive'],
        marker: ['"Permanent Marker"', 'cursive'],
        body: ['"Comic Neue"', 'system-ui', 'sans-serif'],
      },

      // ─── Cartoon Box Shadows ──────────────────────────────────────────
      boxShadow: {
        'cartoon-sm': '2px 2px 0px #0A0A0A',
        'cartoon': '4px 4px 0px #0A0A0A',
        'cartoon-md': '6px 6px 0px #0A0A0A',
        'cartoon-lg': '8px 8px 0px #0A0A0A',
        'cartoon-xl': '12px 12px 0px #0A0A0A',
        'cartoon-red': '4px 4px 0px #B01C1C',
        'cartoon-blue': '4px 4px 0px #1A3A6B',
        'cartoon-yellow': '4px 4px 0px #B8860B',
        'cartoon-pink': '4px 4px 0px #C0136A',
        'cartoon-white': '4px 4px 0px #F5F5F0',
        'neon-red': '0 0 10px #E23636, 0 0 20px #E23636, 0 0 40px #E23636',
        'neon-blue': '0 0 10px #2563EB, 0 0 20px #2563EB, 0 0 40px #2563EB',
        'neon-pink': '0 0 10px #FF2D78, 0 0 20px #FF2D78, 0 0 40px #FF2D78',
      },

      // ─── Border ───────────────────────────────────────────────────────
      borderWidth: {
        3: '3px',
        5: '5px',
        6: '6px',
      },

      // ─── Animation ────────────────────────────────────────────────────
      keyframes: {
        'web-swing': {
          '0%, 100%': { transform: 'rotate(-3deg) translateY(0)' },
          '50%': { transform: 'rotate(3deg) translateY(-8px)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)', filter: 'none' },
          '20%': { transform: 'translate(-3px, 1px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(3px, -1px)', filter: 'hue-rotate(-90deg)' },
          '60%': { transform: 'translate(-1px, 2px)', filter: 'saturate(200%)' },
          '80%': { transform: 'translate(2px, -2px)', filter: 'brightness(150%)' },
        },
        'halftone-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '70%': { transform: 'scale(1.1) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px) rotate(-1deg)' },
          '75%': { transform: 'translateX(4px) rotate(1deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-web': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'web-swing': 'web-swing 3s ease-in-out infinite',
        'glitch': 'glitch 0.5s ease-in-out',
        'halftone-pulse': 'halftone-pulse 2s ease-in-out infinite',
        'pop-in': 'pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'shake': 'shake 0.3s ease-in-out',
        'float': 'float 4s ease-in-out infinite',
        'spin-web': 'spin-web 20s linear infinite',
      },

      // ─── Background Patterns ──────────────────────────────────────────
      backgroundImage: {
        'halftone': 'radial-gradient(circle, #000 1px, transparent 1px)',
        'web-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },

      // ─── Backdrop Blur ────────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config
