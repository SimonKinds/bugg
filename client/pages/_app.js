import React from "react";
import App, { Container } from "next/app";
import Modal from "react-modal";
import { createGlobalStyle } from "styled-components";
import firebase from "firebase/app";
import "firebase/firestore";

try {
  firebase.initializeApp({
    apiKey: "AIzaSyCHDNJxHS3_OSiQbejKriGKliO1iG2jNv8",
    authDomain: "bugg-222319.firebaseapp.com",
    projectId: "bugg-222319"
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    // eslint-disable-next-line no-console
    console.error("Firebase initialization error", err.stack);
  }
}

Modal.setAppElement("#__next");

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    --max-content-width: 768px;

    margin: 0;
    background-color: #fafafa;
  }
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <GlobalStyle />
        <Component {...pageProps} />
      </Container>
    );
  }
}
