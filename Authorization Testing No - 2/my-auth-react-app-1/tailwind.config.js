/** @type {import('tailwindcss').Config} */
import fluid, { extract } from 'fluid-tailwind';

export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    extract, // Extract Tailwind classes using fluid-tailwind's extractor
  },
  theme: {
    extend: {}, // You can still extend your theme here if needed
  },
  plugins: [
    fluid, // Adds fluid plugin to handle fluid typography and spacing
  ],
};
