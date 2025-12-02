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
        // Deep, sophisticated base - The Void of the Noosphere
        void: '#0a0a0f',              // Deep midnight
        abyss: '#050508',             // Deepest black
        substrate: '#0f0f18',         // Elevated surfaces
        surface: '#161622',           // Cards and panels
        
        // Neural accent colors
        neural: {
          blue: '#4f7cff',            // Electric neural blue
          cyan: '#00d4ff',            // Bright synapse cyan
          purple: '#a855f7',          // Deep thought purple
          magenta: '#e040fb',         // Radiant magenta
          green: '#39ff8e',           // Neural pathway green
        },
        
        // Primary accents
        accent: '#4f7cff',            // Primary brand - neural blue
        glow: '#00d4ff',              // Glowing elements
        pulse: '#a855f7',             // Pulsing/active states
        
        // Semantic
        success: '#39ff8e',
        warning: '#ffb347',
        danger: '#ff5a5a',
        
        // Text hierarchy
        primary: '#f0f0f8',
        secondary: 'rgba(240, 240, 248, 0.65)',
        tertiary: 'rgba(240, 240, 248, 0.4)',
        muted: 'rgba(240, 240, 248, 0.15)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'neural-flow': 'neural-flow 3s ease-in-out infinite',
        'synapse': 'synapse 1.5s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '0.6',
            boxShadow: '0 0 20px rgba(79, 124, 255, 0.3)',
          },
          '50%': { 
            opacity: '1',
            boxShadow: '0 0 40px rgba(79, 124, 255, 0.6)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'neural-flow': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        synapse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(79, 124, 255, 0.4)',
        'glow-cyan': '0 0 30px rgba(0, 212, 255, 0.4)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.4)',
        'glow-green': '0 0 30px rgba(57, 255, 142, 0.4)',
        'inner-glow': 'inset 0 0 60px rgba(79, 124, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-neural': 'linear-gradient(135deg, rgba(79,124,255,0.1) 0%, rgba(168,85,247,0.1) 50%, rgba(0,212,255,0.1) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
