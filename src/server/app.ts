import debug from "debug";
import express from "express";
import path from "node:path";

import * as middleware from "./middleware";
import { Exception } from "./utils/Exception";

const log = debug("server:app");

const isProduction = process.env.NODE_ENV === "production";
const assetPath = isProduction ? "./client" : "./dist/client";

const app = express();
app.disable("x-powered-by");
app.use(express.static(path.resolve(assetPath), { index: false }));

app.post(
	"/api/error",
	express.json({ limit: "1mb" }),
	middleware.promisify(() => {
		log("/api/error");

		throw new Exception({ code: 400 });
	})
);

app.post(
	"/api",
	express.json({ limit: "1mb" }),
	middleware.promisify((req: express.Request, res: express.Response) => {
		log("/api");

		res.send({ status: "ok" });
	})
);

app.get(
	"/*",
	middleware.promisify((req: express.Request, res: express.Response) => {
		log("/");

		res.sendFile(path.resolve(assetPath, "index.html"));
	})
);

app.use(middleware.error(["GET", "POST"]));

export default app;
