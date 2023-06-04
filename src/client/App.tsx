import debug from "debug";
import * as React from "react";

const log = debug("client:app"); // NOTE: localStorage.debug = 'client:*'

export default function App(): JSX.Element {
	log("loaded");

	return (
		<React.Suspense fallback={<>loading...</>}>
			<h1>App</h1>
		</React.Suspense>
	);
}
