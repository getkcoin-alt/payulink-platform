/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bp: {
          bg: 'var(--bp-bg)',
          card: 'var(--bp-bg-card)',
          sidebar: 'var(--bp-bg-sidebar)',
          input: 'var(--bp-bg-input)',
          text: 'var(--bp-text)',
          secondary: 'var(--bp-text-secondary)',
          muted: 'var(--bp-text-muted)',
          border: 'var(--bp-border)',
          accent: 'var(--bp-accent)',
          'accent-hover': 'var(--bp-accent-hover)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
