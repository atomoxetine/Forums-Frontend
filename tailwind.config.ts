import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        important: "var(--font-dosis)",
        header: "var(--font-dosis)",
        body: "var(--font-dosis)",
      },
    },
  },
  daisyui: {
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
    themes: [
      {
        // https://color.adobe.com/create/color-wheel
        // https://pinetools.com/invert-color
        dark: {
          "color-scheme": "dark",

          "primary": "#E6A900", // Golden
          "primary-content": "#ebe6d8",
          "neutral": "#495bb3", // Lime-ish?
          "neutral-content": "#d3d5e6",
          "secondary": "#00a164", // Water blue
          "secondary-content": "#ddf0e8",
          "accent": "#bd2455", // Ruby
          "accent-content": "#f2dfe7",
          
          "base-content": "#87858c",
          "base-100": "#22212e",
          "base-200": "#191824",
          "base-300": "#11101a",

          "info": "#00a1d6", // Cyan 195deg
          "success": "#00d600", // Green 120deg
          "warning": "#d68f00", // Orange 40deg
          "error": "#d60000", // Red 0deg
        },
        light: {
          "color-scheme": "light",
          
          "primary": "#d99f00", // Golden
          "primary-content": "#302400",
          "neutral": "#3f4e99", // Lime-ish?
          "neutral-content": "#002416",
          "secondary": "#00945b", // Water blue
          "secondary-content": "#000938",
          "accent": "#b0214e", // Ruby
          "accent-content": "#29000d",

          "base-content": "#75737a", // Inverse of dark base-content hued back to neutral
          "base-100": "#e7e6f0", // Inverse of dark base-300 hued back to neutral
          "base-200": "#dedce8", // Inverse of dark base-200 hued back to neutral
          "base-300": "#d2d1de", // Inverse of dark base-100 hued back to neutral

          "info": "#00a1d6", // Cyan 195deg
          "success": "#00d600", // Green 120deg
          "warning": "#d68f00", // Orange 40deg
          "error": "#d60000", // Red 0deg
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
export default config