import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        rh: {
          base: '#0a0a0a',
          surface: '#111113',
          elevated: '#0f0f11',
          border: '#27272a',
          subtle: '#1c1c1e',
          accent: '#FF4500',
          'accent-hover': '#CC3700',
        },
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0%)' },
        },
        'pulse-emoji': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(280%) skewX(-15deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,69,0,0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(255,69,0,0.45)' },
        },
        'nav-in': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'holo-breathe': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)',   opacity: '1' },
          '40%':      { transform: 'translate(-50%, -50%) scale(1.18)', opacity: '0.7' },
          '70%':      { transform: 'translate(-50%, -50%) scale(0.88)', opacity: '0.9' },
        },
        'holo-spin-slow': {
          from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
          to:   { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'holo-spin-counter': {
          from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
          to:   { transform: 'translate(-50%, -50%) rotate(-360deg)' },
        },
        'holo-streak': {
          '0%':   { opacity: '0', transform: 'translateX(-60px) scaleX(0.4)' },
          '30%':  { opacity: '1', transform: 'translateX(0px)   scaleX(1)' },
          '70%':  { opacity: '1', transform: 'translateX(40px)  scaleX(1)' },
          '100%': { opacity: '0', transform: 'translateX(100px) scaleX(0.4)' },
        },
        'holo-streak-2': {
          '0%':   { opacity: '0', transform: 'translateX(40px)  scaleX(0.3)' },
          '35%':  { opacity: '1', transform: 'translateX(0px)   scaleX(1)' },
          '65%':  { opacity: '0.8', transform: 'translateX(-20px) scaleX(1)' },
          '100%': { opacity: '0', transform: 'translateX(-80px) scaleX(0.3)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-emoji': 'pulse-emoji 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shine: 'shine 2.8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'nav-in':  'nav-in 0.4s ease-out forwards',
        float:     'float 4s ease-in-out infinite',
        'fade-in':           'fade-in 0.6s ease-out forwards',
        'holo-breathe':      'holo-breathe 6s ease-in-out infinite',
        'holo-spin-slow':    'holo-spin-slow 18s linear infinite',
        'holo-spin-counter': 'holo-spin-counter 24s linear infinite',
        'holo-streak':       'holo-streak 5s ease-in-out infinite',
        'holo-streak-2':     'holo-streak-2 7s ease-in-out infinite 1.5s',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // safe-area inset for iPhone notch / home indicator
    function ({ addUtilities }: { addUtilities: (u: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        '.safe-bottom': { paddingBottom: 'env(safe-area-inset-bottom)' },
      })
    },
  ],
}

export default config
