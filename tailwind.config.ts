import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#00D9FF',
          purple: '#6C5CE7',
        },
        secondary: {
          green: '#00FF88',
          coral: '#FF6B6B',
        },
        background: {
          dark: '#0A0E27',
          'dark-gray': '#1A1F3A',
        },
        surface: {
          card: '#252B42',
          lighter: '#2D3447',
        },
        text: {
          white: '#FFFFFF',
          light: '#E0E0E0',
          muted: '#9CA3AF',
        },
        accent: {
          gold: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['72px', { lineHeight: '80px', fontWeight: '700' }],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config

