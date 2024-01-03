import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        heading: 'Noto Sans Hanifi Rohingya',
        body: 'Noto Sans Hanifi Rohingya',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      colors: {
        "light-text": "#fefef6",
        "dark-text": "#090901",
        "background-light": "#fffefa",
        "background-dark": "#050400",
        "primary": "#e4ef1a",
        "primary-dark": "#dae510",
        "secondary": "#70f5d8",
        "secondary-dark": "#0a8f72",
        "accent": "#45b6f2",
        "accent-dark": "#0d7dba",
      },
    },
  },
  plugins: [],
}
export default config
