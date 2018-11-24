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

it("Only displays the names of all notable entities and their criteria for the selected couple", () => {
  const leaderCriteria = [
    { criterionName: "crit1", color: "blue" },
    { criterionName: "crit2", color: "red" }
  ];
  const followerCriteria = [
    { criterionName: "crit3", color: "blue" },
    { criterionName: "crit4", color: "red" }
  ];

  const { getByText, queryByText } = render(
    <NoteTaker
      couples={[
        {
          coupleIdForHumans: "couple1",
          noteableEntities: [
            {
              noteableEntityIdForHumans: "leader1",
              criteria: leaderCriteria
            },
            {
              noteableEntityIdForHumans: "follower1",
              criteria: followerCriteria
            }
          ]
        },
        {
          coupleIdForHumans: "couple2",
          noteableEntities: [
            {
              noteableEntityIdForHumans: "leader2",
              criteria: leaderCriteria
            },
            {
              noteableEntityIdForHumans: "follower2",
              criteria: followerCriteria
            }
          ]
        }
      ]}
    />
  );

  expect(getByText("leader1")).toBeDefined();
  expect(getByText("crit1")).toBeDefined();
  expect(getByText("crit2")).toBeDefined();

  expect(getByText("follower1")).toBeDefined();
  expect(getByText("crit3")).toBeDefined();
  expect(getByText("crit4")).toBeDefined();

  expect(queryByText("leader2")).toBeNull();
  expect(queryByText("follower2")).toBeNull();
});
