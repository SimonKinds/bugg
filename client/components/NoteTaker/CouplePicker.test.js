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
  const onClick = done;

  const { getByText } = render(
    <CouplePicker
      coupleIdsForHumans={["couple-id"]}
      selectedIndex={0}
      onClick={onClick}
    />
  );

  expect(getByText("couple-id").click());
});
