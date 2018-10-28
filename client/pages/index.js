// @flow

import React from "react";
import Head from "next/head";
import NoteTaker from "../components/NoteTaker";

import "./styles.css";

function IndexPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
          <NoteTaker couples={[]} />
        </main>
      </div>
    </>
  );
}

export default IndexPage;
