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
          "primary": "#FF69B4", // Base color
          "neutral": "#cd69ff", // Mid-way (50deg diff. from each) between primary and secondary, acts as tertiary
          "secondary": "#6982ff", // 100deg diff. from primary
          "accent": "#DDFF69", // Complementary of neutral
          "info": "#69daff", // Primary rotated (cyan 195deg)
          "success": "#69ff69", // Primary rotated (green 120deg)
          "warning": "#ffcd69", // Primary rotated (orange 40deg)
          "error": "#ff6969", // Primary rotated (red 0deg)
          "accent-content": "#796b80", // Neutral 50% brightness 16% saturation
          "neutral-content": "#544b59", // Neutral 35% brightness 16% saturation
          "base-100": "#120917", // Neutral 9% brightness
          "base-200": "#0c060f", // Neutral 6% brightness
          "base-300": "#060308", // Neutral 3% brightness
        },
        light: {
          "color-scheme": "light", // primary to error are all the same as above
          "primary": "#FF69B4",
          "neutral": "#cd69ff",
          "secondary": "#6982ff",
          "accent": "#DDFF69",
          "info": "#69daff",
          "success": "#69ff69",
          "warning": "#ffba30",
          "error": "#ff6969",
          "accent-content": "#8d7f94", // Inverse of dark accent-content hued back to neutral
          "neutral-content": "#8d7f94", // Inverse of dark neutral-content hued back to neutral
          "base-100": "#fbf7fc", // Inverse of dark base-300 hued back to neutral
          "base-200": "#f6f0fa", // Inverse of dark base-200 hued back to neutral
          "base-300": "#f0e6f5", // Inverse of dark base-100 hued back to neutral
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
export default config