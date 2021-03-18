import jsx from "acorn-jsx";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import url from "@rollup/plugin-url";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.NODE_ENV === "production";

export default [
  {
    acornInjectPlugins: [jsx()],
    input: "./src/client/index.tsx",
    output: {
      file: "./dist/client/index.js",
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
      typescript({
        jsx: "preserve",
        sourceMap: !isProduction,
      }),
      resolve({
        browser: true,
        extensions: ["js", ".json", "jsx", ".ts", ".tsx"],
      }),
      copy({
        targets: [
          {
            src: ["./src/client/robots.txt", "./src/client/favicon.ico"],
            dest: "./dist/client",
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
          { name: "viewport", content: "width=device-width, initial-scale=1" },
        ],
        title: "App",
      }),
      isProduction && terser(),
    ],
  },
  {
    input: "./src/server/index.ts",
    output: {
      exports: "auto",
      file: "./dist/server/index.js",
      format: "cjs",
    },
    plugins: [
      resolve({ preferBuiltins: true }),
      typescript({ sourceMap: !isProduction }),
      commonjs(),
      babel({ babelHelpers: "bundled" }),
      json(),
    ],
  },
];
