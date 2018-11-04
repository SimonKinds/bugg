// @flow

import React from "react";
import type { Node as ReactNode } from "react";

import "./styles.css";

type NoteTakerContainerProps = {
  couples: Array<{
    coupleIdForHumans: string,
    leaderIdForHumans: string,
    followerIdForHumans: string
  }>
};
type NoteTakerContainerState = {
  selectedCouple: {
    coupleIdForHumans: string,
    leaderIdForHumans: string,
    followerIdForHumans: string
  }
};
class NoteTakerContainer extends React.Component<
  NoteTakerContainerProps,
  NoteTakerContainerState
> {
  state = {
    selectedCouple: this.props.couples[0]
  };

  selectCouple = (coupleIdForHumans: string) => {
    const { couples } = this.props;
    const newSelectedCouple = couples.find(
      couple => couple.coupleIdForHumans === coupleIdForHumans
    );

    if (newSelectedCouple == null) {
      // eslint-disable-next-line no-console
      console.error("Selected couple does not exist");
    } else {
      this.setState({ selectedCouple: newSelectedCouple });
    }
  };

  render() {
    if (this.state.selectedCouple == null) {
      // eslint-disable-next-line no-console
      console.error("Expects at least one couple");
      return null;
    }

    const coupleIdsForHumans = this.props.couples.map(
      couple => couple.coupleIdForHumans
    );

    const { selectedCouple } = this.state;

    return (
      <>
        <CouplePicker
          onClick={this.selectCouple}
          coupleIdsForHumans={coupleIdsForHumans}
          selectedCoupleIdForHuman={selectedCouple.coupleIdForHumans}
        />
        <div>
          <form>
            <NoteTakingArea
              selectedCoupleIndex={this.props.couples.findIndex(
                couple =>
                  selectedCouple.coupleIdForHumans === couple.coupleIdForHumans
              )}
              coupleCount={this.props.couples.length}
              criterionCount={4}
            >
              {({
                selectedValuesLeader,
                selectValueLeader,
                selectedValuesFollower,
                selectValueFollower
              }) => (
                <div className="note-taking-area">
                  <NoteTakerColumn
                    participantId={selectedCouple.leaderIdForHumans}
                    selectedValues={selectedValuesLeader}
                    selectValue={selectValueLeader}
                  />
                  <NoteTakerColumn
                    participantId={selectedCouple.followerIdForHumans}
                    selectedValues={selectedValuesFollower}
                    selectValue={selectValueFollower}
                  />
                </div>
              )}
            </NoteTakingArea>
            <button type="submit" className="note-taking-submit-button">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

type NoteTakingAreaProps = {
  selectedCoupleIndex: number,
  coupleCount: number,
  criterionCount: number,
  children: ({
    selectedValuesLeader: Array<?number>,
    selectValueLeader: (value: number, at: number) => void,
    selectedValuesFollower: Array<?number>,
    selectValueFollower: (value: number, at: number) => void
  }) => ReactNode
};
type NoteTakingAreaState = {
  selectedValuesLeader: Array<Array<?number>>,
  selectedValuesFollower: Array<Array<?number>>
};
class NoteTakingArea extends React.Component<
  NoteTakingAreaProps,
  NoteTakingAreaState
> {
  state = {
    selectedValuesLeader: new Array(this.props.coupleCount).fill(
      new Array(this.props.criterionCount).fill(null)
    ),
    selectedValuesFollower: new Array(this.props.coupleCount).fill(
      new Array(this.props.criterionCount).fill(null)
    )
  };

  render() {
    const { selectedCoupleIndex } = this.props;

    return this.props.children({
      selectedValuesLeader: this.state.selectedValuesLeader[
        selectedCoupleIndex
      ],
      selectValueLeader: (value, at) => {
        const updatedOuter = [...this.state.selectedValuesLeader];
        const updatedInner = [...updatedOuter[selectedCoupleIndex]];

        updatedInner[at] = value;
        updatedOuter[selectedCoupleIndex] = updatedInner;

        this.setState({ selectedValuesLeader: updatedOuter });
      },
      selectedValuesFollower: this.state.selectedValuesFollower[
        selectedCoupleIndex
      ],
      selectValueFollower: (value, at) => {
        const updatedOuter = [...this.state.selectedValuesFollower];
        const updatedInner = [...updatedOuter[selectedCoupleIndex]];

        updatedInner[at] = value;
        updatedOuter[selectedCoupleIndex] = updatedInner;

        this.setState({ selectedValuesFollower: updatedOuter });
      }
    });
  }
}

type CouplePickerProps = {
  coupleIdsForHumans: Array<string>,
  selectedCoupleIdForHuman: string,
  onClick: (coupleIdForHumans: string) => void
};
function CouplePicker({
  coupleIdsForHumans,
  selectedCoupleIdForHuman,
  onClick
}: CouplePickerProps) {
  return (
    <div className="couple-picker-container">
      {coupleIdsForHumans.map(coupleIdForHuman => (
        <CouplePickerButton
          key={coupleIdForHuman}
          coupleIdForHumans={coupleIdForHuman}
          onClick={onClick}
          selected={coupleIdForHuman === selectedCoupleIdForHuman}
        />
      ))}
    </div>
  );
}

type CouplePickerButtonProps = {
  coupleIdForHumans: string,
  selected: boolean,
  onClick: (coupleIdForHumans: string) => void
};
function CouplePickerButton({
  coupleIdForHumans,
  selected,
  onClick
}: CouplePickerButtonProps) {
  const extendedClassName = selected ? "couple-picker--selected" : "";
  const className = "couple-picker " + extendedClassName;

  return (
    <button
      type="button"
      className={className}
      onClick={() => onClick(coupleIdForHumans)}
    >
      {coupleIdForHumans}
    </button>
  );
}

type NoteTakerColumnProps = {
  participantId: string,
  selectedValues: Array<?number>,
  selectValue: (value: number, at: number) => void
};
function NoteTakerColumn({
  participantId,
  selectedValues,
  selectValue
}: NoteTakerColumnProps) {
  const criterion = [
    { criterionName: "style", color: "blue" },
    { criterionName: "esthethics", color: "red" },
    { criterionName: "connection", color: "green" },
    { criterionName: "improv", color: "purple" }
  ].map((criterion, i) => ({ ...criterion, selectedValue: selectedValues[i] }));

  return (
    <div className="note-taking-column">
      <h2 className="note-taking-column-header">{participantId}</h2>
      {criterion.map(({ criterionName, color, selectedValue }, i) => (
        <NoteTakerColumnItem
          key={`${participantId}-${criterionName}`}
          participantId={participantId}
          criterionName={criterionName}
          color={color}
          values={[0, 1, 2, 3, 4]}
          selectedValue={selectedValue}
          selectValue={(value: number) => selectValue(value, i)}
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
        onChange={({ currentTarget }) => {
          selectValue(parseInt(currentTarget.value, 10));
        }}
      />
      {value}
    </label>
  );
}

export default NoteTakerContainer;
