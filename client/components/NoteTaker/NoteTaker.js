// @flow

import React from "react";

import CouplePicker from "./CouplePicker";
import NoteTakerForm from "./NoteTakerForm";
import NoteTakerColumn from "./NoteTakerColumn";

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

export default NoteTakerContainer;
