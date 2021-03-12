import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import graphql from "@rollup/plugin-graphql";
import html from "@rollup/plugin-html";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import url from "@rollup/plugin-url";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.NODE_ENV === "production";

export default [
  {
    input: "./src/app/index.jsx",
    output: {
      file: "./dist/app.js",
      format: "iife",
      sourcemap: !isProduction,
    },
    plugins: [
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": `'${process.env.NODE_ENV || "development"}'`,
        "process.env.SENTRY_DSN": `'${process.env.SENTRY_DSN_APP}'`,
      }),
      json(),
      resolve({
        browser: true,
        extensions: [".js", ".jsx", ".json"],
      }),
      copy({
        targets: [
          {
            src: ["./src/app/robots.txt", "./src/app/favicon.ico"],
            dest: "./dist",
          },
        ],
      }),
      commonjs(),
      babel({ babelHelpers: "bundled" }),
      postcss({
        extract: true,
        minimize: isProduction,
      }),
      url(),
      html({
        meta: [
          { charset: "utf-8" },
          { viewport: "width=device-width, initial-scale=1" },
        ],
        title: "App",
      }),
      isProduction && terser(),
    ],
  },
  {
    input: "./src/server/index.mjs",
    output: {
      exports: "auto",
      file: "./dist/server/index.js",
      format: "cjs",
    },
    plugins: [resolve({ preferBuiltins: true }), commonjs(), json(), graphql()],
  },
];
