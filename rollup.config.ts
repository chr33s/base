import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import "dotenv/config";
import esbuild from "rollup-plugin-esbuild";

export default {
	input: "src/server/index.ts",
	output: {
		file: `./dist/server/index.mjs`,
		format: "es",
		sourcemap: true,
	},
	plugins: [json(), nodeResolve(), commonjs(), esbuild()],
};
