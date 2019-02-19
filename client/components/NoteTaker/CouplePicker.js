// @flow

import React, { type ComponentType } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 4rem 0;
  display: flex;
  justify-content: space-between;
`;

type CouplePickerProps = {
  coupleIdsForHumans: Array<string>,
  selectedIndex: number,
  onClick: (index: number) => void
};
function CouplePicker({
  coupleIdsForHumans,
  selectedIndex,
  onClick
}: CouplePickerProps) {
  return (
    <StyledContainer aria-label="couple picker">
      {coupleIdsForHumans.map((coupleIdForHuman, i) => (
        <CouplePickerButton
          key={coupleIdForHuman}
          coupleIdForHumans={coupleIdForHuman}
          onClick={() => onClick(i)}
          selected={i === selectedIndex}
        />
      ))}
    </StyledContainer>
  );
}

const StyledButton: ComponentType<{ selected: boolean }> = styled.button`
  height: 5rem;
  width: 12rem;
  margin: auto;

  outline: none;

  display: inline-block;
  border: 0.3rem solid
    ${({ selected }: { selected: boolean }) =>
      selected === true ? "#2d29e2" : "#c4c4c4"};
  border-radius: 0.8rem;
  box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 20%);

  text-decoration: none;
  background: #fafafa;
  font-family: sans-serif;
  font-size: 2rem;
  cursor: pointer;
  text-align: center;

  :focus {
    border: 0.3rem solid #2d29e2;
  }

  :active {
    transform: scale(0.99);
  }
`;

type CouplePickerButtonProps = {
  coupleIdForHumans: string,
  selected: boolean,
  onClick: () => void
};
function CouplePickerButton({
  coupleIdForHumans,
  selected,
  onClick
}: CouplePickerButtonProps) {
  return (
    <StyledButton
      aria-selected={selected}
      selected={selected}
      type="button"
      onClick={onClick}
    >
      {coupleIdForHumans}
    </StyledButton>
  );
}

export default CouplePicker;
