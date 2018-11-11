// @flow
import React, { type Node as ReactNode } from "react";
import Modal from "react-modal";

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
      <form>
        <Modal
          isOpen={this.state.showConfirmationModal}
          onRequestClose={() => this.setState({ showConfirmationModal: false })}
          className="modal"
        >
          <h1 className="modal__header">Submit notes</h1>
          <div className="modal__button-row">
            <button
              type="button"
              className="modal__cancel-button"
              onClick={() => this.setState({ showConfirmationModal: false })}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="note-taking-submit-button"
              onClick={() => {
                this.setState({ showConfirmationModal: false });
                this.props.onSubmit(this.state.selectedValues);
              }}
            >
              Submit
            </button>
          </div>
        </Modal>
        <div className="note-taking-area">
          {this.props.children({
            childProps
          })}
        </div>

        <button
          type="button"
          className="note-taking-submit-button"
          onClick={() => this.setState({ showConfirmationModal: true })}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default NoteTakerForm;
