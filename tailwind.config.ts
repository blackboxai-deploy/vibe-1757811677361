import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'circuit-green': '#00FF41',
        'circuit-blue': '#0099FF',
        'circuit-orange': '#FF6600',
        'circuit-red': '#FF0040',
        'circuit-purple': '#AA00FF',
        'circuit-yellow': '#FFFF00',
        'circuit-cyan': '#00FFFF',
        'pcb-green': '#0D4A2D',
        'pcb-dark': '#0A0A0A',
        'copper': '#CD7F32',
        'component-dark': '#1A1A1A',
      },
      animation: {
        'pulse-circuit': 'pulseCircuit 1.5s ease-in-out infinite',
        'data-flow': 'dataFlow 2s linear infinite',
        'component-boot': 'componentBoot 0.8s ease-out',
        'trace-glow': 'traceGlow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseCircuit: {
          '0%, 100%': { boxShadow: '0 0 5px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' }
        },
        dataFlow: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' }
        },
        componentBoot: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        traceGlow: {
          'from': { filter: 'drop-shadow(0 0 3px currentColor)' },
          'to': { filter: 'drop-shadow(0 0 8px currentColor) drop-shadow(0 0 15px currentColor)' }
        }
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config