import * as Sentry from "@sentry/node";
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

Sentry.init({
	dsn: process.env.SENTRY_DSN ?? "",
	environment: process.env.NODE_ENV ?? "",
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Sentry.Integrations.Express({ app }),
		...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
	],
	tracesSampleRate: isProduction ? 0.01 : 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
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

app.use(Sentry.Handlers.errorHandler());
app.use(middleware.error(["GET", "POST"]));

export default app;
