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
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
