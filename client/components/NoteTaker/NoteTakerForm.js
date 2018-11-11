// @flow
import React, { type Node as ReactNode } from "react";
import Modal from "react-modal";
import styled from "styled-components";

type CriterionViewModel = {
  criterionName: string,
  color: "blue" | "red" | "green" | "purple"
};

type SelectedValues = Array<{
  [coupleIdForHumans: string]: { [criterionName: string]: ?number }
}>;

type NoteTakerChildProps = Array<{
  selectedValues: { [criterionName: string]: ?number },
  selectValue: (value: number, citerionName: string) => void
}>;
type NoteTakerFormState = {
  selectedValues: SelectedValues,
  showConfirmationModal: boolean
};
type NoteTakerFormProps = {
  selectedCoupleIdForHumans: string,
  coupleIdsForHumans: Array<string>,
  criteriaForNotableEntities: Array<Array<CriterionViewModel>>,

  children: ({ childProps: NoteTakerChildProps }) => ReactNode,

  onSubmit: (notes: SelectedValues) => void
};

const StyledNoteTakingArea = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const StyledSubmitButton = styled.button`
  float: right;

  height: 5rem;
  width: 12rem;
  margin: 0;

  outline: none;

  border: none;
  border-radius: 0.8rem;

  text-decoration: none;
  background: #569ab8;
  color: #fefefe;
  font-family: sans-serif;
  font-size: 2rem;
  cursor: pointer;
  text-align: center;

  :active {
    transform: scale(0.99);
  }

  :hover,
  :focus {
    background: #4b8ba7;
  }
`;

const StyledCancelButton = styled.button`
  height: 5rem;
  width: 12rem;
  margin: 0;

  outline: none;

  border: #ccc 0.2rem solid;
  border-radius: 0.8rem;

  text-decoration: none;
  background: #fefefe;
  color: #222;
  font-family: sans-serif;
  font-size: 2rem;
  cursor: pointer;
  text-align: center;

  margin-right: 1rem;

  :active {
    transform: scale(0.99);
  }

  :hover,
  :focus {
    background: #cccccc50;
  }
`;

const StyledButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const StyledModalHeader = styled.h1`
  margin-top: 5rem;
  text-align: center;
  font-size: 3rem;
`;

// $FlowFixMe
const StyledModal = styled(Modal)`
  border: #ccc 0.2rem solid;
  border-radius: 0.5rem;
  width: 45rem;
  height: 25rem;
  background: #fefefe;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
`;
class NoteTakerForm extends React.Component<
  NoteTakerFormProps,
  NoteTakerFormState
> {
  state = initializeState(this.props);

  render() {
    return (
      <form
        onSubmit={(e: SyntheticEvent<HTMLInputElement>) => {
          e.preventDefault();
          this.setState({ showConfirmationModal: true });
        }}
      >
        <StyledModal
          isOpen={this.state.showConfirmationModal}
          onRequestClose={() => this.setState({ showConfirmationModal: false })}
        >
          <StyledModalHeader>Submit notes</StyledModalHeader>
          <StyledButtonRow>
            <StyledCancelButton
              type="button"
              onClick={() => this.setState({ showConfirmationModal: false })}
            >
              Cancel
            </StyledCancelButton>
            <StyledSubmitButton
              type="button"
              onClick={() => {
                this.setState({ showConfirmationModal: false });
                this.props.onSubmit(this.state.selectedValues);
              }}
            >
              Submit
            </StyledSubmitButton>
          </StyledButtonRow>
        </StyledModal>
        <StyledNoteTakingArea>
          {this.props.children({
            childProps: buildChildProps(
              this.props,
              this.state,
              selectedValues => this.setState({ selectedValues })
            )
          })}
        </StyledNoteTakingArea>

        <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
      </form>
    );
  }
}

function initializeState(props: NoteTakerFormProps): NoteTakerFormState {
  return {
    selectedValues: props.criteriaForNotableEntities.map(() =>
      props.coupleIdsForHumans.reduce(
        (selectedValues, coupleIdForHumans) => ({
          ...selectedValues,
          [coupleIdForHumans]: {}
        }),
        {}
      )
    ),
    showConfirmationModal: false
  };
}

function buildChildProps(
  props: NoteTakerFormProps,
  state: NoteTakerFormState,
  setState: (updatedValues: SelectedValues) => void
): NoteTakerChildProps {
  return props.criteriaForNotableEntities.map((_, notableEntityGroupIndex) => ({
    selectedValues:
      state.selectedValues[notableEntityGroupIndex][
        props.selectedCoupleIdForHumans
      ],
    selectValue: (value: number, criterionName: string) =>
      setState(
        updateValueForCriterionAtIndex(
          state.selectedValues,
          props.selectedCoupleIdForHumans,
          criterionName,
          notableEntityGroupIndex,
          value
        )
      )
  }));
}

function updateValueForCriterionAtIndex(
  selectedValues: SelectedValues,
  selectedCoupleIdForHumans: string,
  criterionName: string,
  index: number,
  value: number
): SelectedValues {
  return selectedValues.map((values, i) => {
    if (index === i) {
      return {
        ...values,
        [selectedCoupleIdForHumans]: {
          ...values[selectedCoupleIdForHumans],
          [criterionName]: value
        }
      };
    }

    return values;
  });
}

export default NoteTakerForm;
