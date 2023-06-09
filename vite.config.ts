import { sentryVitePlugin as sentry } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

import tsconfig from "./tsconfig.json";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		build: {
			manifest: true,
			outDir: path.resolve(__dirname, "dist/client"),
			sourcemap: true,
		},
		clearScreen: false,
		define: {
			"process.env.NODE_ENV": JSON.stringify(mode ?? ""),
			"process.env.SENTRY_DSN": JSON.stringify(env.SENTRY_DSN ?? ""),
		},
		plugins: [
			sentry({
				authToken: env.SENTRY_AUTH_TOKEN,
				org: env.SENTRY_ORG,
				project: env.SENTRY_PROJECT,
				telemetry: false,
			}),
			react(),
		],
		resolve: {
			alias: Object.entries(tsconfig.compilerOptions.paths).reduce(
				(alias, [k, a]) => ({
					...alias,
					[k.replace(/\/\*$/, "")]: a.map((v) =>
						path.resolve(__dirname, v.replace(/\/\*$/, ""))
					),
				}),
				{}
			),
		},
		server: {
			proxy: {
				"/api": {
					changeOrigin: true,
					secure: false,
					target: `http://localhost:${env.PORT_SERVER}`,
				},
			},
			port: Number.parseInt(env.PORT_CLIENT),
			strictPort: true,
		},
		test: {
			environment: "node",
			environmentMatchGlobs: [
				["src/client/**/*.test.tsx", "happy-dom"],
				["src/server/**/*.test.ts", "node"],
			],
			exclude: ["node_modules", "dist", "./src/e2e"],
			watch: false,
		},
	};
});
