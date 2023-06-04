import * as React from "react";
import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import App from "./App";

test("renders", () => {
	const component = renderer.create(<App />);
	const instance = component.root;
	expect(instance).toBeDefined();
});
