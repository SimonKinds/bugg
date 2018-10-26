// @flow

import React from "react";

import "./styles.css";

function IndexPage() {
  return (
    <div>
      <Header />
      <main>
        <p>Next.js page!</p>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Bugg</h1>
    </header>
  );
}

export default IndexPage;
