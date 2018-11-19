// @flow

import React from "react";
import { render, cleanup } from "react-testing-library";

import NoteTaker from "./index";

afterEach(cleanup);

it("Can render without crashing", () => {
  render(
    <NoteTaker
      couples={[{ coupleIdForHumans: "couple", noteableEntities: [] }]}
    />
  );
});
