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

it("Displays all couples and selects the first by default", () => {
  const { getByText } = render(
    <NoteTaker
      couples={[
        { coupleIdForHumans: "couple1", noteableEntities: [] },
        { coupleIdForHumans: "couple2", noteableEntities: [] }
      ]}
    />
  );

  expect(getByText("couple1")).toBeDefined();
  expect(getByText("couple1").getAttribute("aria-selected")).toBe("true");

  expect(getByText("couple2")).toBeDefined();
  expect(getByText("couple2").getAttribute("aria-selected")).toBe("false");
});
