import * as Sentry from "@sentry/react";
import debug from "debug";
import * as React from "react";

const log = debug("client:app"); // NOTE: localStorage.debug = 'client:*'

export function App(): JSX.Element {
	log("loaded");

	return (
		<Sentry.ErrorBoundary
			fallback={({ error }: { error: Error }) => <>{error.toString()}</>}
		>
			<React.Suspense fallback={<>loading...</>}>
				<h1>App</h1>
			</React.Suspense>
		</Sentry.ErrorBoundary>
	);
}

const SentryApp = Sentry.withProfiler(App);
export default SentryApp;
