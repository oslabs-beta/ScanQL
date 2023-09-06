// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './index.html',
//     './src/**/*.{js,jsx,ts,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/*eslint-env node*/
/*eslint no-undef: "error"*/


import { blackA, mauve, violet } from '@radix-ui/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
        fontFamily: {
            'cabin': ['Cabin', 'sans-serif'],
            'gruppo': ['Gruppo', 'sans-serif'],
            // 'montserrat': ['Montserrat', 'sans-serif'],
            'oswald': ['Oswald', 'sans-serif'],
            'montserrat': ['Nunito Sans', 'sans-serif']
            // 'montserrat': ['Quicksand', 'sans-serif'],
            // 'montserrat': ['M PLUS 1p', 'sans-serif']
        },
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
      },
      // light: {
      //   primary: bg-blackA11,
      //   secondary: bg-mauve1,
      // },
      // dark: {
      //   primary: bg-violet1,
      //   secondary: bg-violet11,
      // },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
    borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        DEFAULT: '4px',
        'md': '0.375rem',
        'lg': '12px',
        'full': '9999px',
        'large': '12px',
      }
  },
  plugins: [],
  important: true
};
