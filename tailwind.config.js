/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5EBA7D',
        'primary-dark': '#4A9A64',
        'primary-light': '#8ED4A5',
        'bg-dark': '#0A0F0D',
        'bg-mid': '#121A16',
        'surface': '#1A241E',
        'text-muted': '#5A6B5F',
      },
      fontFamily: {
        'mono': ['SF Mono', 'JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'SF Pro', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 20px rgba(94, 186, 125, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 40px rgba(94, 186, 125, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
