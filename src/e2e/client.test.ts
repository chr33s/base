import { expect, test } from "@playwright/test";

test("client", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Base/);
	await expect(page.locator("h1")).toContainText("App");
});
