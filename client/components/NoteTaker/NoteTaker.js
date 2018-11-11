// @flow

import React from "react";

import CouplePicker from "./CouplePicker";
import NoteTakerForm from "./NoteTakerForm";
import NoteTakerColumn from "./NoteTakerColumn";

type CriterionViewModel = {
  criterionName: string,
  color: "blue" | "red" | "green" | "purple"
};

export type noteableEntityWithCriteria = {
  noteableEntityIdForHumans: string,
  criteria: Array<CriterionViewModel>
};

type NoteTakerProps = {
  couples: Array<{
    coupleIdForHumans: string,
    noteableEntities: Array<noteableEntityWithCriteria>
  }>
};
type NoteTakerState = {
  selectedCoupleIndex: number
};
class NoteTaker extends React.Component<NoteTakerProps, NoteTakerState> {
  state = {
    selectedCoupleIndex: 0
  };

  componentDidMount() {
    if (!isInProduction()) {
      warnIfInvalidProps(this.props);
    }
  }

  render() {
    const { couples } = this.props;
    if (couples.length === 0) {
      // eslint-disable-next-line no-console
      console.error("Expects at least one couple");
      return null;
    }

    const { selectedCoupleIndex } = this.state;
    const coupleIdsForHumans = couples.map(couple => couple.coupleIdForHumans);
    const selectedCouple = couples[selectedCoupleIndex];

    return (
      <>
        <CouplePicker
          onClick={coupleIndex =>
            this.setState({ selectedCoupleIndex: coupleIndex })
          }
          coupleIdsForHumans={coupleIdsForHumans}
          selectedIndex={selectedCoupleIndex}
        />
        <NoteTakerForm
          onSubmit={notes => alert("This is us submitting the notes!")}
          selectedCoupleIndex={selectedCoupleIndex}
          coupleCount={couples.length}
          noteableEntitiesPerCoupleCount={couples[0].noteableEntities.length}
        >
          {({ childProps }) =>
            childProps.map((props, noteableEntityIndex) => (
              <NoteTakerColumn
                key={
                  selectedCouple.noteableEntities[noteableEntityIndex]
                    .noteableEntityIdForHumans
                }
                participantId={
                  selectedCouple.noteableEntities[noteableEntityIndex]
                    .noteableEntityIdForHumans
                }
                criteria={
                  selectedCouple.noteableEntities[noteableEntityIndex].criteria
                }
                {...props}
              />
            ))
          }
        </NoteTakerForm>
      </>
    );
  }
}

function isInProduction() {
  return process.env.NODE_ENV === "production";
}

function warnIfInvalidProps(props: NoteTakerProps) {
  props.couples.forEach((couple, index, couples) => {
    if (index === 0) {
      return;
    }

    const noteableEntityCount = couple.noteableEntities.length;
    const prevNoteableEntityCount = couples[index - 1].noteableEntities.length;

    if (noteableEntityCount !== prevNoteableEntityCount) {
      // eslint-disable-next-line no-console
      console.error(
        `Each couple must have an equal amount of noteable entities: ${index} has ${noteableEntityCount} and should be ${prevNoteableEntityCount}`
      );
    }
  });
}

export default NoteTaker;
