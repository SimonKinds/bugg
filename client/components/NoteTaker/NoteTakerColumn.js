// @flow
import React from "react";

type CriterionViewModel = {
  criterionName: string,
  color: "blue" | "red" | "green" | "purple"
};

type NoteTakerColumnProps = {
  participantId: string,
  criteria: Array<CriterionViewModel>,

  selectedValues: { [criterionName: string]: ?number },
  selectValue: (value: number, criterionName: string) => void
};
function NoteTakerColumn({
  participantId,
  criteria,
  selectedValues,
  selectValue
}: NoteTakerColumnProps) {
  return (
    <div className="note-taking-column">
      <h2 className="note-taking-column-header">{participantId}</h2>
      {criteria.map(({ criterionName, color }) => (
        <NoteTakerColumnItem
          key={`${participantId}-${criterionName}`}
          participantId={participantId}
          criterionName={criterionName}
          color={color}
          values={[0, 1, 2, 3, 4]}
          selectedValue={selectedValues[criterionName]}
          selectValue={(value: number) => selectValue(value, criterionName)}
        />
      ))}
    </div>
  );
}

type NoteTakerColumnItemProps = {
  participantId: string,
  criterionName: string,
  color: "blue" | "red" | "green" | "purple",

  values: Array<number>,
  selectedValue: ?number,
  selectValue: (value: number) => void
};
function NoteTakerColumnItem({
  participantId,
  criterionName,
  values,
  color,
  selectedValue,
  selectValue
}: NoteTakerColumnItemProps) {
  return (
    <fieldset
      className={`note-taking-column-item note-taking-column-item--${color}`}
    >
      <h3 className="note-taking-column-item-header">{criterionName}</h3>
      <div className="note-taking-column-item-options">
        {values.map(value => (
          <NoteTakerColumnItemOption
            key={`${participantId}-${criterionName}-${value}`}
            participantId={participantId}
            criterionName={criterionName}
            value={value}
            selected={value === selectedValue}
            selectValue={selectValue}
          />
        ))}
      </div>
    </fieldset>
  );
}

type NoteTakerColumnItemOptionProps = {
  participantId: string,
  criterionName: string,
  value: number,
  selected: boolean,
  selectValue: (value: number) => void
};
function NoteTakerColumnItemOption({
  participantId,
  criterionName,
  value,
  selected,
  selectValue
}: NoteTakerColumnItemOptionProps) {
  return (
    <label
      htmlFor={`${participantId}-${criterionName}-${value}`}
      className="note-taking-item-option"
    >
      <input
        name={`${participantId}-${criterionName}`}
        id={`${participantId}-${criterionName}-${value}`}
        type="radio"
        className="note-taking-item-option-value"
        value={value}
        checked={selected}
        onChange={({ currentTarget }: SyntheticEvent<HTMLInputElement>) => {
          selectValue(parseInt(currentTarget.value, 10));
        }}
      />
      {value}
    </label>
  );
}

export default NoteTakerColumn;
