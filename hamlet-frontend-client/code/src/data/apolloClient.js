import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';

import { toIdValue, getMainDefinition } from 'apollo-utilities';

import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';

import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, split } from 'apollo-link';
import merge from 'lodash.merge';


import irohaResolvers from './resolvers/irohaResolvers';
import appResolvers from './resolvers/appResolvers';

require('dotenv').config();

// TODO: set network/graphql error response
// TODO: complete typeDefs

export const cacheStorage = window.localStorage;

/**
 * * Cache and persistence setup
 * * persisted data is cleared if there is a new Schema version
*/
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      accountsBy: (_, { id }) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Account', id })),
    },

  },
  dataIdFromObject: object => object.key || null,
});


export const persistor = new CachePersistor({
  cache,
  storage: cacheStorage,
});


/**
   * * Client setup
   *
  */

const typeDefs = `
    type NetworkStatus {
      isConnected: Boolean!
    }
    type Mutation {
    }
    type Query {
    }
    type Subscription {
    }
  `;
// * GRAPHQL LINK SETUP

const wsLink = new WebSocketLink({
  uri: process.env.WEBSOCKET_ENDPOINT,
  options: {
    reconnect: true,
  },
});
const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT,
});

// Send queries to http server and subscriptions to websocket
const withSplit = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// * APOLLO CLIENT SETUP
const withError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ));
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const withState = withClientState({
  ...merge(appResolvers, irohaResolvers),
  typeDefs,
  cache,
});


export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    withError,
    withState,
    withSplit,
  ]),
  cache,
});
