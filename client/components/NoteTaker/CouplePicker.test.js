// @flow

import React from "react";
import { render, cleanup } from "react-testing-library";

import CouplePicker from "./CouplePicker";

afterEach(cleanup);

it("Can render without crashing", () => {
  render(
    <CouplePicker
      coupleIdsForHumans={[]}
      selectedIndex={0}
      onClick={() => {}}
    />
  );
});

it("onClick is called when clicking on couple", done => {
  const coupleId = "couple-id";
  const onClick = done;

  const { getByText } = render(
    <CouplePicker
      coupleIdsForHumans={[coupleId]}
      selectedIndex={0}
      onClick={onClick}
    />
  );

  expect(getByText(coupleId).click());
});

it("selects the given index", () => {
  const { getByText } = render(
    <CouplePicker
      coupleIdsForHumans={["couple1", "couple2"]}
      selectedIndex={1}
      onClick={() => {}}
    />
  );

  expect(getByText("couple1").getAttribute("aria-selected")).toBe("false");
  expect(getByText("couple2").getAttribute("aria-selected")).toBe("true");
});
