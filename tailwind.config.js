module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-200%)" },
          "50%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: { slideIn: "slideIn 1s ease-in-out" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
