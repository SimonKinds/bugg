// @flow

import React from "react";
import type { Node as ReactNode } from "react";

import "./styles.css";

type CriterionViewModel = {
  criterionName: string,
  color: "blue" | "red" | "green" | "purple"
};

type NoteTakerContainerProps = {
  couples: Array<{
    coupleIdForHumans: string,
    leaderIdForHumans: string,
    followerIdForHumans: string
  }>,
  criteria: Array<CriterionViewModel>
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

    const { criteria } = this.props;
    const { selectedCouple } = this.state;

    return (
      <>
        <CouplePicker
          onClick={this.selectCouple}
          coupleIdsForHumans={coupleIdsForHumans}
          selectedCoupleIdForHuman={selectedCouple.coupleIdForHumans}
        />
        <NoteTakingForm
          onSubmit={notes => alert("This is us submitting the notes!")}
          selectedCoupleIdForHumans={selectedCouple.coupleIdForHumans}
          coupleIdsForHumans={coupleIdsForHumans}
          criterionCount={criteria.length}
        >
          {({
            selectedValuesLeader,
            selectValueLeader,
            selectedValuesFollower,
            selectValueFollower
          }) => (
            <>
              <NoteTakerColumn
                participantId={selectedCouple.leaderIdForHumans}
                criteria={criteria}
                selectedValues={selectedValuesLeader}
                selectValue={selectValueLeader}
              />
              <NoteTakerColumn
                participantId={selectedCouple.followerIdForHumans}
                criteria={criteria}
                selectedValues={selectedValuesFollower}
                selectValue={selectValueFollower}
              />
            </>
          )}
        </NoteTakingForm>
      </>
    );
  }
}

type NoteTakingFormState = {
  selectedValuesLeader: {
    [coupleIdForHumans: string]: { [criterionName: string]: ?number }
  },
  selectedValuesFollower: {
    [coupleIdForHumans: string]: { [criterionName: string]: ?number }
  }
};
type NoteTakingFormProps = {
  selectedCoupleIdForHumans: string,
  coupleIdsForHumans: Array<string>,
  children: ({
    selectedValuesLeader: { [criterionName: string]: ?number },
    selectValueLeader: (value: number, citerionName: string) => void,
    selectedValuesFollower: { [criterionName: string]: ?number },
    selectValueFollower: (value: number, citerionName: string) => void
  }) => ReactNode,

  onSubmit: (notes: NoteTakingFormState) => void
};
class NoteTakingForm extends React.Component<
  NoteTakingFormProps,
  NoteTakingFormState
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

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          this.props.onSubmit(this.state);
        }}
      >
        <div className="note-taking-area">
          {this.props.children({
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
          })}
        </div>

        <button type="submit" className="note-taking-submit-button">
          Submit
        </button>
      </form>
    );
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
        onChange={({ currentTarget }) => {
          selectValue(parseInt(currentTarget.value, 10));
        }}
      />
      {value}
    </label>
  );
}

export default NoteTakerContainer;
