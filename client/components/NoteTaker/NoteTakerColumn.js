// @flow
import React, { type ComponentType } from "react";
import styled from "styled-components";

type CriterionViewModel = {
  criterionName: string,
  color: "blue" | "red" | "green" | "purple"
};

const StyledColumn = styled.div`
  width: 50%;
  margin: 0 1rem;
`;
const StyledColumnHeader = styled.h2`
  font-size: 2.4rem;
  font-weight: 400;
  text-align: center;
  margin: 0 0 1rem 0;
`;
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
    <StyledColumn>
      <StyledColumnHeader>{participantId}</StyledColumnHeader>
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
    </StyledColumn>
  );
}

const colorMap = {
  red: "#e5bbb2",
  blue: "#b2dfe5",
  green: "#c3e5b2",
  purple: "#bdb2e5"
};
type ColorOptions = "red" | "blue" | "green" | "purple";
const StyledColumnItem: ComponentType<{
  color: ColorOptions
}> = styled.fieldset`
  border: none;
  background: #fefefe;

  border-radius: 0.5rem;
  border-top: 0.2rem solid
    ${({ color }: { color: ColorOptions }) => colorMap[color]};

  box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 20%);
  margin-bottom: 1.5rem;
`;
const StyledColumnItemHeader = styled.h3`
  font-size: 2.2rem;
  font-variant: small-caps;
  font-weight: 700;
  text-align: center;

  margin: 0;
  padding: 0.5rem 0;
`;
const StyledOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.5rem;
`;
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
    <StyledColumnItem color={color}>
      <StyledColumnItemHeader>{criterionName}</StyledColumnItemHeader>
      <StyledOptionsContainer>
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
      </StyledOptionsContainer>
    </StyledColumnItem>
  );
}

const StyledOptionLabel = styled.label`
  font-size: 2.2rem;
  padding: 0.5rem 1rem;
  display: flex;

  justify-content: space-between;
  align-items: center;
`;
const StyledValue = styled.input`
  margin: 0;
  margin-right: 1rem;
`;
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
    <StyledOptionLabel htmlFor={`${participantId}-${criterionName}-${value}`}>
      <StyledValue
        name={`${participantId}-${criterionName}`}
        id={`${participantId}-${criterionName}-${value}`}
        type="radio"
        value={value}
        checked={selected}
        onChange={({ currentTarget }: SyntheticEvent<HTMLInputElement>) => {
          selectValue(parseInt(currentTarget.value, 10));
        }}
      />
      {value}
    </StyledOptionLabel>
  );
}

export default NoteTakerColumn;
