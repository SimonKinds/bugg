import React from "react";
import App, { Container } from "next/app";
import Modal from "react-modal";
import { createGlobalStyle } from "styled-components";

Modal.setAppElement("#__next");

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
  html {
    font-size: 62.5%;
    font-family: Montserrat, sans-serif;
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
