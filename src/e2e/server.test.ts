import { expect, test } from "@playwright/test";

test("server", async ({ request }) => {
	const response = await request.post("/api", { data: {} });
	expect(response.ok()).toBeTruthy();
	expect(await response.json()).toEqual({
		status: "ok",
	});
});
