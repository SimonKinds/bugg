// @flow

import React from "react";

import "./styles.css";

function IndexPage() {
  return (
    <>
      <header className="header">
        <h1 className="site-name">Bugg</h1>
      </header>
      <div className="container">
        <div className="note-taking-information">
          <div>
            <h1 className="tournament-name">
              Tournoi de Danse 4Temps De Paris
            </h1>
            <div className="round-information">
              <p className="round-name">Round 2</p>
              <p className="group-name">Group 3</p>
            </div>
          </div>
          <div className="judge-information">
            <p className="judge-name">Logan</p>
            <p className="judge-type-name">Judge</p>
          </div>
        </div>
        <main>
          <div className="couple-picker-container">
            <div className="couple-picker-row">
              <button
                type="button"
                className="couple-picker couple-picker--visible"
              >
                48 - 33
              </button>
              <span className="couple-picker" />
              <button
                type="button"
                className="couple-picker couple-picker--visible"
              >
                48 - 33
              </button>
              <span className="couple-picker" />
              <button
                type="button"
                className="couple-picker couple-picker--visible"
              >
                48 - 33
              </button>
            </div>
            <div className="couple-picker-row">
              <span className="couple-picker" />
              <button
                type="button"
                className="couple-picker couple-picker--visible"
              >
                48 - 33
              </button>
              <span className="couple-picker" />
              <button
                type="button"
                className="couple-picker couple-picker--visible"
              >
                48 - 33
              </button>
              <span className="couple-picker" />
            </div>
          </div>
          <div>
            <form>
              <div className="note-taking-area">
                <div className="note-taking-column">
                  <h2 className="note-taking-column-header">48</h2>
                  <NoteTakingColumnItem
                    participantId="48"
                    criterionName="style"
                    color="blue"
                    values={[0, 1, 2, 3, 4]}
                  />
                  <NoteTakingColumnItem
                    participantId="48"
                    criterionName="sexiness"
                    color="red"
                    values={[0, 1, 2, 3, 4]}
                  />
                  <NoteTakingColumnItem
                    participantId="48"
                    criterionName="looks"
                    color="green"
                    values={[0, 1, 2, 3, 4]}
                  />
                  <NoteTakingColumnItem
                    participantId="48"
                    criterionName="smell"
                    color="purple"
                    values={[0, 1, 2, 3, 4]}
                  />
                </div>
                <div className="note-taking-column">
                  <h2 className="note-taking-column-header">33</h2>
                  <NoteTakingColumnItem
                    participantId="33"
                    criterionName="style"
                    color="blue"
                    values={[0, 1, 2, 3, 4]}
                  />
                  <NoteTakingColumnItem
                    participantId="33"
                    criterionName="sexiness"
                    color="red"
                    values={[0, 1, 2, 3, 4]}
                  />
                  <NoteTakingColumnItem
                    participantId="33"
                    criterionName="looks"
                    color="green"
                    values={[0, 1, 2, 3, 4]}
                  />
                  <NoteTakingColumnItem
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
        </main>
      </div>
    </>
  );
}

type NoteTakingColumnProps = {
  participantId: string,
  criterionName: string,
  values: Array<number>,
  color: "blue" | "red" | "green" | "purple"
};
function NoteTakingColumnItem({
  participantId,
  criterionName,
  values,
  color
}: NoteTakingColumnProps) {
  return (
    <fieldset
      className={`note-taking-column-item note-taking-column-item--${color}`}
    >
      <h3 className="note-taking-column-item-header">{criterionName}</h3>
      <div className="note-taking-column-item-options">
        {values.map(value => (
          <NoteTakingColumnItemOption
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

type NoteTakingColumnItemOptionProps = {
  participantId: string,
  criterionName: string,
  value: number
};
function NoteTakingColumnItemOption({
  participantId,
  criterionName,
  value
}: NoteTakingColumnItemOptionProps) {
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

export default IndexPage;
