// @flow

import React from "react";

import CouplePicker from "./CouplePicker";
import NoteTakerForm from "./NoteTakerForm";

import "./styles.css";

type CriterionViewModel = {
  criterionName: string,
  color: "blue" | "red" | "green" | "purple"
};

type NoteTakerContainerProps = {
  coupleIdsForHumans: Array<string>,
  notableEntitiesForHumans: {
    [coupleIdForHuman: string]: Array<string>
  },

  criteriaForNotableEntities: Array<Array<CriterionViewModel>>
};
type NoteTakerContainerState = {
  selectedCoupleIdForHumans: string,
  notableEntitiesForHumans: Array<string>
};
class NoteTakerContainer extends React.Component<
  NoteTakerContainerProps,
  NoteTakerContainerState
> {
  state = initializeNoteTakerContainerState(this.props);

  selectCouple = (coupleIdForHumans: string) => {
    const { notableEntitiesForHumans } = this.props;
    const newSelectedNotableEntities =
      notableEntitiesForHumans[coupleIdForHumans];

    if (newSelectedNotableEntities == null) {
      // eslint-disable-next-line no-console
      console.error("Selected couple does not exist");
    } else {
      this.setState({
        selectedCoupleIdForHumans: coupleIdForHumans,
        notableEntitiesForHumans: newSelectedNotableEntities
      });
    }
  };

  render() {
    if (this.state.selectedCoupleIdForHumans == null) {
      // eslint-disable-next-line no-console
      console.error("Expects at least one couple");
      return null;
    }

    const { criteriaForNotableEntities, coupleIdsForHumans } = this.props;
    const { selectedCoupleIdForHumans, notableEntitiesForHumans } = this.state;

    return (
      <>
        <CouplePicker
          onClick={this.selectCouple}
          coupleIdsForHumans={coupleIdsForHumans}
          selectedCoupleIdForHuman={selectedCoupleIdForHumans}
        />
        <NoteTakerForm
          onSubmit={notes => alert("This is us submitting the notes!")}
          selectedCoupleIdForHumans={selectedCoupleIdForHumans}
          coupleIdsForHumans={coupleIdsForHumans}
          criteriaForNotableEntities={criteriaForNotableEntities}
        >
          {({ childProps }) =>
            childProps.map((props, i) => (
              <NoteTakerColumn
                key={notableEntitiesForHumans[i]}
                participantId={notableEntitiesForHumans[i]}
                criteriaForNotableEntities={criteriaForNotableEntities}
                criteria={criteriaForNotableEntities[i]}
                {...props}
              />
            ))
          }
        </NoteTakerForm>
      </>
    );
  }
}

function initializeNoteTakerContainerState({
  coupleIdsForHumans,
  notableEntitiesForHumans,
  criteriaForNotableEntities
}: NoteTakerContainerProps): NoteTakerContainerState {
  const defaultCouple = coupleIdsForHumans[0];

  if (!process.env.NODE_ENV !== "production") {
    coupleIdsForHumans.forEach(coupleIdForHumans => {
      const notableEntities = notableEntitiesForHumans[coupleIdForHumans];

      if (notableEntities.length !== criteriaForNotableEntities.length) {
        // eslint-disable-next-line no-console
        console.error(
          "The amount of notable entities must be equal to the amount of criteriaForNotableEntities"
        );
      }
    });
  }

  return {
    selectedCoupleIdForHumans: defaultCouple,
    notableEntitiesForHumans: notableEntitiesForHumans[defaultCouple]
  };
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
        onChange={({ currentTarget }: SyntheticEvent<HTMLInputElement>) => {
          selectValue(parseInt(currentTarget.value, 10));
        }}
      />
      {value}
    </label>
  );
}

export default NoteTakerContainer;
