module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: "default",
    },
    "postcss-each": {},
    "postcss-import": {},
    "postcss-nested": {},
    "postcss-preset-env": {},
    "postcss-url": [
      {
        filter: "**/*.{gif,jpg,png,svg}",
        url: "inline",
        useHash: true,
      },
    ],
    tailwindcss: {},
  },
};
