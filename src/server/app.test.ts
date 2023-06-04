import request from "supertest";
import { expect, test } from "vitest";

import app from "./app";

test("/api", async () => {
	const res = await request(app).post("/api");
	expect(res.status).toBe(200);
	expect(res.body.status).toBe("ok");
});

test("/api/error", async () => {
	const res = await request(app).post("/api/error");
	expect(res.status).toBe(400);
	expect(res.body.status).toBe("nok");
});
