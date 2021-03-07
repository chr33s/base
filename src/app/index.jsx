import React, { StrictMode } from "react";
import { render } from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from "./App";

import "./index.css";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const app = document.createElement("div");
app.setAttribute("id", "app");
document.body.appendChild(app);

render(
  <StrictMode>
    <App />
  </StrictMode>,
  app
);
