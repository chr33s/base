module.exports = {
  purge: ["./src/**/*.*"],
  darkMode: "media",
  container: { center: true },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
