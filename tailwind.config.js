/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Breakpoints oficiais do projeto
      screens: {
        'md': '768px',   // Tablet
        'lg': '1280px',  // Desktop
        'xl': '1920px',  // Wide / 4K
      },
      // Variáveis Semânticas (Prioridade 1)
      colors: {
        primary: {
          DEFAULT: '#D7FF00', // primary-500
        },
        secondary: {
          dark: '#060A11', // secondary-900
          light: '#E7E8EA', // secondary-50
        },
        surface: {
          DEFAULT: '#FFFFFF', // surface-500
        },
        background: {
          DEFAULT: '#F5F6F8', // background-400
        },
        // Variáveis Primitivas (Prioridade 2)
        neutral: {
          0: '#ffffff',
          300: '#e5e7eb',
          400: '#d1d5db',
          500: '#9ca3af',
          1100: '#080b12',
        },
        brand: {
          700: '#c4e703',
        },
        blue: {
          600: '#2a89ef',
        },
        green: {
          600: '#15be78',
        },
        red: {
          600: '#e61e32',
        },
      },
      // Espaçamento (tokens primitivos)
      spacing: {
        0: '0',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        56: '56px',
      },
      // Border Radius (shape tokens)
      borderRadius: {
        'sm': '2px',
        'md': '20px',
        'full': '100px',
      },
      // Tipografia
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Headings
        'heading-xs': ['20px', { lineHeight: '28px', fontWeight: '700' }],
        'heading-sm': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'heading-md': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        // Labels
        'label-xs': ['12px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.3px' }],
        'label-sm': ['14px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.3px' }],
        'label-md': ['16px', { lineHeight: '20px', fontWeight: '600', letterSpacing: '0.3px' }],
        'label-lg': ['18px', { lineHeight: '24px', fontWeight: '600', letterSpacing: '0.3px' }],
        // Paragraphs
        'paragraph-xs': ['12px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.3px' }],
        'paragraph-sm': ['14px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.3px' }],
        'paragraph-lg': ['18px', { lineHeight: '28px', fontWeight: '400', letterSpacing: '0.3px' }],
      },
    },
  },
  plugins: [],
}
