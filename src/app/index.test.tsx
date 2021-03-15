import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { App } from "./App";

describe("app", function () {
  test("renders", () => {
    const app = window.document.createElement("div");
    render(<App />, app);
    unmountComponentAtNode(app);
  });
});
