import * as Sentry from "@sentry/react";
import * as Spotlight from "@spotlightjs/spotlight";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	environment: process.env.NODE_ENV,
	integrations: [new Sentry.BrowserTracing()],
	tracesSampleRate: process.env.NODE_ENV === "production" ? 0.01 : 1.0,
});
if (process.env.NODE_ENV === "development") {
	Spotlight.init();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
