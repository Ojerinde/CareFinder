/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary_color: "hsl(240, 100%, 60%)",
        primary_light_color: "hsl(240, 100%, 70%)",
        primary_dark_color: "hsl(240, 100%, 53%)",

        secondary_color: "#fff",
        secondary_light_color: "#e6e6e6",
        secondary_dark_color: "#b3b3b3",

        tertiary_color: "#222",
        tertiary_light_color: "#333",
        tertiary_dark_color: "#111",

        invalid_color: "#ec1228",
        success_color: "#1da934",

        default_font_size: "1.7rem",
        default_font_family: "Roboto, sans-serif",
        default_header_family: "Nunito, sans_serif",
      },
      fontFamily: {
        sans: ["Graphik", "sans_serif"],
        serif: ["Merriweather", "serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
