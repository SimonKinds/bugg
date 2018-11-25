// @flow

import React from "react";
import { render, cleanup } from "react-testing-library";

import NoteTakerColumn from "./NoteTakerColumn";

afterEach(cleanup);

it("Can render without crashing", () => {
  render(
    <NoteTakerColumn
      participantId=""
      criteria={[]}
      selectValue={() => {}}
      selectedValues={{}}
    />
  );
});

it("Displays the participant id", () => {
  const { getByText } = render(
    <NoteTakerColumn
      participantId="my participant"
      criteria={[]}
      selectValue={() => {}}
      selectedValues={{}}
    />
  );

  expect(getByText("my participant")).toBeInTheDocument();
});

it("Displays the names of all criteria", () => {
  const { getByText } = render(
    <NoteTakerColumn
      participantId="my participant"
      criteria={[
        { criterionName: "criteria1", color: "blue" },
        { criterionName: "criteria2", color: "red" }
      ]}
      selectValue={() => {}}
      selectedValues={{}}
    />
  );

  expect(getByText("criteria1")).toBeInTheDocument();
  expect(getByText("criteria2")).toBeInTheDocument();
});

it("Labels values from 0 through 4", () => {
  const { getByLabelText } = render(
    <NoteTakerColumn
      participantId="my participant"
      criteria={[{ criterionName: "criteria1", color: "blue" }]}
      selectValue={() => {}}
      selectedValues={{}}
    />
  );

  expect(getByLabelText("0")).toBeInTheDocument();
  expect(getByLabelText("1")).toBeInTheDocument();
  expect(getByLabelText("2")).toBeInTheDocument();
  expect(getByLabelText("3")).toBeInTheDocument();
  expect(getByLabelText("4")).toBeInTheDocument();
});
