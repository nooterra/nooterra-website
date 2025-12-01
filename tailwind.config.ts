import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './App.tsx',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050607',          // body ink
        substrate: '#0C1013',     // elevated panels
        horizon: '#151A1E',       // soft surfaces
        signal: '#3E6A5A',        // moss accent
        execute: '#D78A4A',       // copper accent
        solar: '#24456B',         // ink blue accent
        settle: '#8E8C84',        // stone/quiet
        warn: '#D6584B',          // danger muted
        primary: '#F7F3EC',       // warm off-white
        secondary: '#B3BEC8',     // muted steel
        tertiary: '#6B737C',      // labels
        code: '#24456B',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        grain: 'grain 8s steps(10) infinite',
        beam: 'beam 2s linear infinite',
        aurora: 'aurora 18s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        beam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        aurora: {
          '0%': { transform: 'rotate(0deg) translate3d(0,0,0)' },
          '50%': { transform: 'rotate(10deg) translate3d(4%, -2%, 0)' },
          '100%': { transform: 'rotate(-8deg) translate3d(-3%, 3%, 0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
