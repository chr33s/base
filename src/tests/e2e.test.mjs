import server from "../server/index.mjs";

const HOST = `http://localhost:${process.env.PORT}/`;

beforeAll(async () => {
  await page.goto(HOST);
});

afterAll((done) => {
  server.close(done);
});

describe("app", function () {
  test("loads", () => {
    expect(page.url()).toBe(HOST);

    /*
    const h1 = await page.$eval("h1", (el) => el.innerHTML);
    expect(h1).toBe("App");
    */
  });
});
