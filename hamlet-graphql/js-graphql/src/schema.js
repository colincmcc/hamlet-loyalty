import { GQC } from 'graphql-compose';
// import * as mailgun from "mailgun";
import pubsub from './subscriptions';
import { getAuthResolvers, getAuthMutations } from './resolvers/Auth';
import {
  getInfoResolvers,
  getAssetMutations,
  getAssetResolvers,
  getAccountResolvers,
  getAccountMutations,
  getOfferMutations,
  getOfferResolvers,
  getUserMutations,
  getUserResolvers
} from './resolvers/sawtooth';

require('dotenv').config();
// * Misc
const authQueries = getAuthResolvers();
const authMutations = getAuthMutations();
// * Sawtooth
// Queries
const assetQueries = getAssetResolvers();
const accountQueries = getAccountResolvers();
const infoQueries = getInfoResolvers();
const userQueries = getUserResolvers();
// Mutations
const assetMutations = getAssetMutations();
const accountMutations = getAccountMutations();
const userMutations = getUserMutations();
// Subscriptions

GQC.rootMutation().addFields({
  ...assetMutations,
  ...accountMutations,
  ...userMutations,
  ...authMutations
});
GQC.rootQuery().addFields({
  ...infoQueries,
  ...accountQueries,
  ...userQueries,
  ...authQueries,
  ...assetQueries
});

// GQC.rootSubscription().addFields({});

const schema = GQC.buildSchema(); // returns GraphQLSchema

export default schema;
