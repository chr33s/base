import request from "supertest";

import server from "./index.mjs";

afterAll((done) => {
  server.close(done);
});

describe("server", function () {
  test("default", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });
});
