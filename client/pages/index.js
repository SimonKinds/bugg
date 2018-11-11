// @flow

import React from "react";
import Head from "next/head";
import styled from "styled-components";
import NoteTaker from "../components/NoteTaker";

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

const leaders = ["11", "22", "33", "44", "55"];
const followers = ["16", "81", "94", "23", "17"];

const coupleIdsForHumans = leaders.map(
  (leader, i) => `${leader} - ${followers[i]}`
);

const noteableEntitiesWithCriteria = coupleIdsForHumans.map(
  (coupleId, index) => {
    return {
      coupleIdForHumans: coupleId,
      noteableEntities: [
        { noteableEntityIdForHumans: leaders[index], criteria: leaderCriteria },
        {
          noteableEntityIdForHumans: followers[index],
          criteria: followerCriteria
        }
      ]
    };
  }
);

const tournamentName = "Tournoi de Danse 4Temps De Paris";

const StyledHeader = styled.header`
  height: 5rem;
  border-bottom: 0.1rem solid #c4c4c4;
  background-color: #fefefe;
  display: flex;
  align-content: center;
  justify-content: center;
`;
const StyledSiteName = styled.h1`
  font-size: 2.4rem;
  margin: auto 1.5rem;
  width: var(--max-content-width);
`;

const StyledContainer = styled.div`
  padding: 1rem;
  max-width: var(--max-content-width);
  margin: auto;
`;

const StyledInformationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const StyledTournamentName = styled.h1`
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  font-variant: small-caps;
`;
const StyledRoundInformation = styled.div`
  display: flex;
`;
const StyledRoundName = styled.p`
  font-variant: small-caps;
  font-size: 2rem;
  margin: 0 2rem 0 0;
`;
const StyledGroupName = styled.p`
  font-variant: small-caps;
  font-size: 2rem;
  margin: 0;
`;
const StyledJudgeInformation = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledJudgeName = styled.p`
  font-size: 2rem;
  margin: 0;
`;
const StyledJudgeType = styled.p`
  font-size: 2rem;
  font-weight: 200;
  margin: 0;
`;

function IndexPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notes - {tournamentName}</title>
      </Head>
      <StyledHeader>
        <StyledSiteName>Bugg</StyledSiteName>
      </StyledHeader>
      <StyledContainer>
        <StyledInformationContainer>
          <div>
            <StyledTournamentName>{tournamentName}</StyledTournamentName>
            <StyledRoundInformation>
              <StyledRoundName>Round 2</StyledRoundName>
              <StyledGroupName>Group 3</StyledGroupName>
            </StyledRoundInformation>
          </div>
          <StyledJudgeInformation>
            <StyledJudgeName>Logan</StyledJudgeName>
            <StyledJudgeType>Judge</StyledJudgeType>
          </StyledJudgeInformation>
        </StyledInformationContainer>
        <main>
          <NoteTaker couples={noteableEntitiesWithCriteria} />
        </main>
      </StyledContainer>
    </>
  );
}

export default IndexPage;
