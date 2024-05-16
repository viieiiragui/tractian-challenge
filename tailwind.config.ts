import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        roboto: ['var(--font-roboto)'],
      },
      colors: {
        'body-background': '#e3eaef',
        navbar: '#17192D',
        blue: {
          DEFAULT: '#2188FF',
          dark: '#023B78',
        },
        green: {
          DEFAULT: '#52C41A',
        },
      },
      height: {
        header: '3rem',
        layout: 'calc(100% - 3rem - 1rem)', // 100%(screen) - header - margin(top + bottom)
      },
      gridTemplateColumns: {
        layout: '24rem minmax(500px, 1fr)',
      },
    },
  },
  plugins: [],
};
export default config;
