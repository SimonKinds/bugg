// @flow

import React from "react";
import { render, cleanup } from "react-testing-library";

import App from "../index";

afterEach(cleanup);

it("Can render without crashing", () => {
  render(
    <App
      tournamentName={""}
      judgeName={"test judge"}
      activeRoundNumber={2}
      activeGroupNumber={3}
    />
  );
});
