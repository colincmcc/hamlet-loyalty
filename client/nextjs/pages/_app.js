import App, { Container } from "next/app";
import React from "react";
import getPageContext from "../lib/getPageContext";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";


class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
              <Component pageContext={this.pageContext} {...pageProps} />
          </JssProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
