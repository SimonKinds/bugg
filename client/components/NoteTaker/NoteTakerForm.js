// @flow
import React, { type Node as ReactNode } from "react";
import Modal from "react-modal";
import styled from "styled-components";

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

  border: #ccc 2px solid;
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
  border: #ccc 2px solid;
  border-radius: 0.5rem;
  width: 45rem;
  height: 25rem;
  background: #fefefe;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
`;

type CriterionViewModel = {
  criterionName: string,
  color: "blue" | "red" | "green" | "purple"
};

type NoteTakerChildProps = Array<{
  selectedValues: { [criterionName: string]: ?number },
  selectValue: (value: number, citerionName: string) => void
}>;
type NoteTakerFormState = {
  selectedValues: Array<{
    [coupleIdForHumans: string]: { [criterionName: string]: ?number }
  }>,
  showConfirmationModal: boolean
};
type NoteTakerFormProps = {
  selectedCoupleIdForHumans: string,
  coupleIdsForHumans: Array<string>,
  criteriaForNotableEntities: Array<Array<CriterionViewModel>>,

  children: ({ childProps: NoteTakerChildProps }) => ReactNode,

  onSubmit: (
    notes: Array<{
      [coupleIdForHumans: string]: { [criterionName: string]: ?number }
    }>
  ) => void
};
class NoteTakerForm extends React.Component<
  NoteTakerFormProps,
  NoteTakerFormState
> {
  state = {
    selectedValues: this.props.criteriaForNotableEntities.map(() =>
      this.props.coupleIdsForHumans.reduce(
        (selectedValues, coupleIdForHumans) => ({
          ...selectedValues,
          [coupleIdForHumans]: {}
        }),
        {}
      )
    ),
    showConfirmationModal: false
  };

  render() {
    const { selectedCoupleIdForHumans } = this.props;
    const { selectedValues } = this.state;

    const childProps: NoteTakerChildProps = this.props.criteriaForNotableEntities.map(
      (_, i) => ({
        selectedValues: selectedValues[i][selectedCoupleIdForHumans],
        selectValue: (value: number, criterionName: string) => {
          const updatedValues = selectedValues.map((values, j) => {
            if (i === j) {
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

          this.setState({ selectedValues: updatedValues });
        }
      })
    );

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
            childProps
          })}
        </StyledNoteTakingArea>

        <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
      </form>
    );
  }
}

export default NoteTakerForm;
