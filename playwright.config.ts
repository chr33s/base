import "dotenv/config";
import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

export default {
	forbidOnly: !!process.env.CI,
	outputDir: "./node_modules/.cache/playwright",
	projects: [
		...["Desktop Chrome", "Desktop Firefox", "Desktop Safari"].map(
			(browser) => ({
				name: browser,
				use: {
					...devices[browser],
				},
			})
		),
		{
			name: "Mobile Chrome",
			use: {
				...devices["Pixel 5"],
			},
		},
		{
			name: "Mobile Safari",
			use: devices["iPhone 12"],
		},
	],
	reporter: `list`,
	retries: process.env.CI ? 2 : 0,
	testDir: `./src/e2e`,
	use: {
		actionTimeout: 0,
		trace: `on-first-retry`,
	},
	webServer: {
		command: `npm run start`,
		port: Number.parseInt(process.env.PORT_CLIENT ?? "8080"),
		reuseExistingServer: !process.env.CI,
	},
	workers: process.env.CI ? 1 : undefined,
} satisfies PlaywrightTestConfig;
