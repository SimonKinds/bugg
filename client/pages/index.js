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
              <div>
                <h2>48</h2>
                <fieldset>
                  <legend>style</legend>
                  <label htmlFor="style-0">
                    0<input name="style-48" id="style-0" type="radio" />
                  </label>
                  <label htmlFor="style-1">
                    1<input name="style-48" id="style-1" type="radio" />
                  </label>
                  <label htmlFor="style-2">
                    2<input name="style-48" id="style-2" type="radio" />
                  </label>
                  <label htmlFor="style-3">
                    3<input name="style-48" id="style-3" type="radio" />
                  </label>
                  <label htmlFor="style-4">
                    4<input name="style-48" id="style-4" type="radio" />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>sexiness</legend>
                  <label htmlFor="sexiness-0">
                    0<input name="sexiness-48" id="sexiness-0" type="radio" />
                  </label>
                  <label htmlFor="sexiness-1">
                    1<input name="sexiness-48" id="sexiness-1" type="radio" />
                  </label>
                  <label htmlFor="sexiness-2">
                    2<input name="sexiness-48" id="sexiness-2" type="radio" />
                  </label>
                  <label htmlFor="sexiness-3">
                    3<input name="sexiness-48" id="sexiness-3" type="radio" />
                  </label>
                  <label htmlFor="sexiness-4">
                    4<input name="sexiness-48" id="sexiness-4" type="radio" />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>looks</legend>
                  <label htmlFor="looks-0">
                    0<input name="looks-48" id="looks-0" type="radio" />
                  </label>
                  <label htmlFor="looks-1">
                    1<input name="looks-48" id="looks-1" type="radio" />
                  </label>
                  <label htmlFor="looks-2">
                    2<input name="looks-48" id="looks-2" type="radio" />
                  </label>
                  <label htmlFor="looks-3">
                    3<input name="looks-48" id="looks-3" type="radio" />
                  </label>
                  <label htmlFor="looks-4">
                    4<input name="looks-48" id="looks-4" type="radio" />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>smell</legend>
                  <label htmlFor="smell-0">
                    0<input name="smell-48" id="smell-0" type="radio" />
                  </label>
                  <label htmlFor="smell-1">
                    1<input name="smell-48" id="smell-1" type="radio" />
                  </label>
                  <label htmlFor="smell-2">
                    2<input name="smell-48" id="smell-2" type="radio" />
                  </label>
                  <label htmlFor="smell-3">
                    3<input name="smell-48" id="smell-3" type="radio" />
                  </label>
                  <label htmlFor="smell-4">
                    4<input name="smell-48" id="smell-4" type="radio" />
                  </label>
                </fieldset>
              </div>
              <div>
                <h2>33</h2>
                <fieldset>
                  <legend>style</legend>
                  <label htmlFor="style-0">
                    0<input name="style-33" id="style-0" type="radio" />
                  </label>
                  <label htmlFor="style-1">
                    1<input name="style-33" id="style-1" type="radio" />
                  </label>
                  <label htmlFor="style-2">
                    2<input name="style-33" id="style-2" type="radio" />
                  </label>
                  <label htmlFor="style-3">
                    3<input name="style-33" id="style-3" type="radio" />
                  </label>
                  <label htmlFor="style-4">
                    4<input name="style-33" id="style-4" type="radio" />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>sexiness</legend>
                  <label htmlFor="sexiness-0">
                    0<input name="sexiness-33" id="sexiness-0" type="radio" />
                  </label>
                  <label htmlFor="sexiness-1">
                    1<input name="sexiness-33" id="sexiness-1" type="radio" />
                  </label>
                  <label htmlFor="sexiness-2">
                    2<input name="sexiness-33" id="sexiness-2" type="radio" />
                  </label>
                  <label htmlFor="sexiness-3">
                    3<input name="sexiness-33" id="sexiness-3" type="radio" />
                  </label>
                  <label htmlFor="sexiness-4">
                    4<input name="sexiness-33" id="sexiness-4" type="radio" />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>looks</legend>
                  <label htmlFor="looks-0">
                    0<input name="looks-33" id="looks-0" type="radio" />
                  </label>
                  <label htmlFor="looks-1">
                    1<input name="looks-33" id="looks-1" type="radio" />
                  </label>
                  <label htmlFor="looks-2">
                    2<input name="looks-33" id="looks-2" type="radio" />
                  </label>
                  <label htmlFor="looks-3">
                    3<input name="looks-33" id="looks-3" type="radio" />
                  </label>
                  <label htmlFor="looks-4">
                    4<input name="looks-33" id="looks-4" type="radio" />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>smell</legend>
                  <label htmlFor="smell-0">
                    0<input name="smell-33" id="smell-0" type="radio" />
                  </label>
                  <label htmlFor="smell-1">
                    1<input name="smell-33" id="smell-1" type="radio" />
                  </label>
                  <label htmlFor="smell-2">
                    2<input name="smell-33" id="smell-2" type="radio" />
                  </label>
                  <label htmlFor="smell-3">
                    3<input name="smell-33" id="smell-3" type="radio" />
                  </label>
                  <label htmlFor="smell-4">
                    4<input name="smell-33" id="smell-4" type="radio" />
                  </label>
                </fieldset>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default IndexPage;
