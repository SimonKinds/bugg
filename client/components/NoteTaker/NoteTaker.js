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
              selectedCoupleIdForHumans={selectedCouple.coupleIdForHumans}
              coupleIdsForHumans={coupleIdsForHumans}
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
  selectedCoupleIdForHumans: string,
  coupleIdsForHumans: Array<string>,
  children: ({
    selectedValuesLeader: { [criterionName: string]: ?number },
    selectValueLeader: (value: number, citerionName: string) => void,
    selectedValuesFollower: { [criterionName: string]: ?number },
    selectValueFollower: (value: number, citerionName: string) => void
  }) => ReactNode
};
type NoteTakingAreaState = {
  selectedValuesLeader: {
    [coupleIdForHumans: string]: { [criterionName: string]: ?number }
  },
  selectedValuesFollower: {
    [coupleIdForHumans: string]: { [criterionName: string]: ?number }
  }
};
class NoteTakingArea extends React.Component<
  NoteTakingAreaProps,
  NoteTakingAreaState
> {
  state = {
    selectedValuesLeader: this.props.coupleIdsForHumans.reduce(
      (selectedValues, coupleIdForHumans) => ({
        ...selectedValues,
        [coupleIdForHumans]: {}
      }),
      {}
    ),
    selectedValuesFollower: this.props.coupleIdsForHumans.reduce(
      (selectedValues, coupleIdForHumans) => ({
        ...selectedValues,
        [coupleIdForHumans]: {}
      }),
      {}
    )
  };

  render() {
    const { selectedCoupleIdForHumans } = this.props;

    return this.props.children({
      selectedValuesLeader: this.state.selectedValuesLeader[
        selectedCoupleIdForHumans
      ],
      selectValueLeader: (value, criterionName) => {
        const { selectedValuesLeader } = this.state;
        this.setState({
          selectedValuesLeader: {
            ...selectedValuesLeader,
            [selectedCoupleIdForHumans]: {
              ...selectedValuesLeader[selectedCoupleIdForHumans],
              [criterionName]: value
            }
          }
        });
      },
      selectedValuesFollower: this.state.selectedValuesFollower[
        selectedCoupleIdForHumans
      ],
      selectValueFollower: (value, criterionName) => {
        const { selectedValuesFollower } = this.state;
        this.setState({
          selectedValuesFollower: {
            ...selectedValuesFollower,
            [selectedCoupleIdForHumans]: {
              ...selectedValuesFollower[selectedCoupleIdForHumans],
              [criterionName]: value
            }
          }
        });
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
  selectedValues: { [criterionName: string]: ?number },
  selectValue: (value: number, criterionName: string) => void
};
function NoteTakerColumn({
  participantId,
  selectedValues,
  selectValue
}: NoteTakerColumnProps) {
  return (
    <div className="note-taking-column">
      <h2 className="note-taking-column-header">{participantId}</h2>
      {[
        { criterionName: "style", color: "blue" },
        { criterionName: "esthethics", color: "red" },
        { criterionName: "connection", color: "green" },
        { criterionName: "improv", color: "purple" }
      ].map(({ criterionName, color }) => (
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
        onChange={({ currentTarget }) => {
          selectValue(parseInt(currentTarget.value, 10));
        }}
      />
      {value}
    </label>
  );
}

export default NoteTakerContainer;
