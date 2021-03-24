import "./index.css";
import * as Sentry from "@sentry/react";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { Integrations } from "@sentry/tracing";
import React from "react";
import { render } from "react-dom";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const app = document.createElement("div");
app.setAttribute("id", "app");
document.body.appendChild(app);

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  app
);

serviceWorker.unregister();
