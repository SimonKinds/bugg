// @flow

import React from "react";
import Head from "next/head";
import NoteTaker from "../components/NoteTaker";

import "./styles.css";

const leaders = ["11", "22", "33", "44", "55"];
const followers = ["16", "81", "94", "23", "17"];

const couples = leaders.map((leader, i) => `${leader} - ${followers[i]}`);

const notableEntities = couples.reduce(
  (notableEntities, couple, i) => ({
    ...notableEntities,
    [couple]: [leaders[i], followers[i]]
  }),
  {}
);

const leaderCriteria = [
  { criterionName: "style", color: "blue" },
  { criterionName: "esthethics", color: "red" },
  { criterionName: "connection", color: "green" },
  { criterionName: "improv", color: "purple" }
];

const followerCriteria = [
  { criterionName: "connection", color: "green" },
  { criterionName: "improv", color: "purple" },
  { criterionName: "style", color: "blue" },
  { criterionName: "esthethics", color: "red" }
];

const tournamentName = "Tournoi de Danse 4Temps De Paris";

function IndexPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notes - {tournamentName}</title>
      </Head>
      <header className="header">
        <h1 className="site-name">Bugg</h1>
      </header>
      <div className="container">
        <div className="note-taking-information">
          <div>
            <h1 className="tournament-name">{tournamentName}</h1>
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
          <NoteTaker
            coupleIdsForHumans={couples}
            notableEntitiesForHumans={notableEntities}
            criteriaForNotableEntities={[leaderCriteria, followerCriteria]}
          />
        </main>
      </div>
    </>
  );
}

export default IndexPage;
