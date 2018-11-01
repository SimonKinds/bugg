// @flow

import React from "react";

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
            <div className="note-taking-area">
              <NoteTakerColumn
                participantId={selectedCouple.leaderIdForHumans}
              />
              <NoteTakerColumn
                participantId={selectedCouple.followerIdForHumans}
              />
            </div>
            <button type="submit" className="note-taking-submit-button">
              Submit
            </button>
          </form>
        </div>
      </>
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
  participantId: string
};
function NoteTakerColumn({ participantId }: NoteTakerColumnProps) {
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
        />
      ))}
    </div>
  );
}

type NoteTakerColumnItemProps = {
  participantId: string,
  criterionName: string,
  values: Array<number>,
  color: "blue" | "red" | "green" | "purple"
};
function NoteTakerColumnItem({
  participantId,
  criterionName,
  values,
  color
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
          />
        ))}
      </div>
    </fieldset>
  );
}

type NoteTakerColumnItemOptionProps = {
  participantId: string,
  criterionName: string,
  value: number
};
function NoteTakerColumnItemOption({
  participantId,
  criterionName,
  value
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
      />
      {value}
    </label>
  );
}

export default NoteTakerContainer;
