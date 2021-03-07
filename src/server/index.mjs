import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import debug from "debug";
import express from "express";
import fs from "fs";
import path from "path";
import url from "url";

import { error, logger, promisify, schema } from "./middleware/index.mjs";

const log = debug("server");

const server = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN_SERVER,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app: server }),
  ],
  tracesSampleRate: 1.0,
});

server.use(Sentry.Handlers.requestHandler());
server.use(Sentry.Handlers.tracingHandler());
server.use(express.json());
server.use(logger);

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const _schema = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./schema.json"), "utf-8")
);
server.use(schema(_schema));

const isDevelopment = process.env.NODE_ENV !== "production";
if (isDevelopment) {
  server.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
}

server.get(
  "/",
  promisify(async (req, res) => {
    res.json({ status: "OK" });
  })
);

server.use(Sentry.Handlers.errorHandler());
server.use(error(["GET"]));

const PORT = process.env.PORT || 8080;
export default server.listen(PORT, () => {
  log(`:${PORT}/`);
});
