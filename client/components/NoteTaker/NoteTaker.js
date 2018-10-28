// @flow

import React from "react";

type NoteTakerContainerProps = {
  couples: Array<{
    coupleIdForHumans: string,
    leaderIdForHumans: string,
    followerIdForHumans: string
  }>
};
type NoteTakerContainerState = {
  selectedCouple: string
};
class NoteTakerContainer extends React.Component<
  NoteTakerContainerProps,
  NoteTakerContainerState
> {
  render() {
    return (
      <>
        <div className="couple-picker-container">
          <div className="couple-picker-row">
            <CouplePickerButton coupleIdForHumans={"48 - 33"} />
            <CouplePickerButton empty />
            <CouplePickerButton coupleIdForHumans={"48 - 33"} />
            <CouplePickerButton empty />
            <CouplePickerButton coupleIdForHumans={"48 - 33"} />
          </div>
          <div className="couple-picker-row">
            <CouplePickerButton empty />
            <CouplePickerButton coupleIdForHumans={"48 - 33"} />
            <CouplePickerButton empty />
            <CouplePickerButton coupleIdForHumans={"48 - 33"} />
            <CouplePickerButton empty />
          </div>
        </div>
        <div>
          <form>
            <div className="note-taking-area">
              <div className="note-taking-column">
                <h2 className="note-taking-column-header">48</h2>
                <NoteTakerColumnItem
                  participantId="48"
                  criterionName="style"
                  color="blue"
                  values={[0, 1, 2, 3, 4]}
                />
                <NoteTakerColumnItem
                  participantId="48"
                  criterionName="sexiness"
                  color="red"
                  values={[0, 1, 2, 3, 4]}
                />
                <NoteTakerColumnItem
                  participantId="48"
                  criterionName="looks"
                  color="green"
                  values={[0, 1, 2, 3, 4]}
                />
                <NoteTakerColumnItem
                  participantId="48"
                  criterionName="smell"
                  color="purple"
                  values={[0, 1, 2, 3, 4]}
                />
              </div>
              <div className="note-taking-column">
                <h2 className="note-taking-column-header">33</h2>
                <NoteTakerColumnItem
                  participantId="33"
                  criterionName="style"
                  color="blue"
                  values={[0, 1, 2, 3, 4]}
                />
                <NoteTakerColumnItem
                  participantId="33"
                  criterionName="sexiness"
                  color="red"
                  values={[0, 1, 2, 3, 4]}
                />
                <NoteTakerColumnItem
                  participantId="33"
                  criterionName="looks"
                  color="green"
                  values={[0, 1, 2, 3, 4]}
                />
                <NoteTakerColumnItem
                  participantId="33"
                  criterionName="smell"
                  color="purple"
                  values={[0, 1, 2, 3, 4]}
                />
              </div>
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

type CouplePickerButtonProps = {
  coupleIdForHumans?: string,
  empty?: boolean
};
function CouplePickerButton({
  coupleIdForHumans,
  empty
}: CouplePickerButtonProps) {
  if (empty) {
    return <span className="couple-picker" />;
  }

  return (
    <button type="button" className="couple-picker couple-picker--visible">
      {coupleIdForHumans}
    </button>
  );
}

type NoteTakerColumnProps = {
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
}: NoteTakerColumnProps) {
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
