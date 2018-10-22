import React from "react";
import { render, cleanup } from "react-testing-library";

import App from "./index";

afterEach(cleanup);

it("Can render without crashing", () => {
  render(<App />);
});
