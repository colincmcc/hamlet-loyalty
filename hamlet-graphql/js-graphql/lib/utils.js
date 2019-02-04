import { TypeComposer } from 'graphql-compose';
import axios from 'axios';
import { withFilter } from 'apollo-server';
import pubsub from './subscriptions';

require('dotenv').config();

// ! TypeComposer can not add subscriptions to type yet

const baseUrl = process.env.wpEndpoint;

/**
 * * WORDPRESS RESOLVER FUNCTIONS
 */
// * Find one by ID
export function createFindByIdResolver(tc, urlAddr) {
  tc.addResolver({
    name: 'findById',
    type: tc,
    args: {
      id: 'Int!'
    },
    resolve: async ({ args, context }) => context.loader.load(`${baseUrl}/${urlAddr}/${args.id}/`)
  });
}

// * Resolve a list of urls
export function createFindByUrlListResolver(tc) {
  tc.addResolver({
    name: 'findByUrlList',
    type: [tc],
    resolve: ({ context }) => context.loader.loadMany(rp.args.urls)
  });
}

// * Resolve a list of IDs
export function createFindByIdListResolver(tc, urlAddr) {
  tc.addResolver({
    name: 'findByIdList',
    type: [tc],
    resolve: ({ args, context }) => {
      const urlList = args.ids.map(id => [`${baseUrl}/${urlAddr}/${id}`]);
      return context.loader.loadMany(urlList);
    }
  });
}

// * Find all of a post type
export function createFindAllResolver(tc, urlAddr) {
  tc.addResolver({
    name: 'findAll',
    type: [tc],
    resolve: ({ context }) => context.loader.load(`${baseUrl}/${urlAddr}/`)
  });
}

// * Find all of a post type with a given meta value
export function createFindByMetaResolver(tc, urlAddr, metaType) {
  tc.addResolver({
    name: 'findByMeta',
    type: [tc],
    args: {
      [metaType]: 'String!'
    },
    resolve: ({ args, context }) => context.loader.load(`${baseUrl}/${urlAddr}?${metaType}=${args[[metaType]]}`)
  });
}


/**
 * *COINBASE RESOLVER FUNCTIONS
 */
const coinbaseInstance = axios.create({
  baseURL: coinbaseEndpoint,
  timeout: 5000,
  headers: {
    'X-CC-Api-Key': `${coinbaseKey}`,
    'X-CC-Version': `${coinbaseApiVersion}`,
    'Content-Type': 'application/json'
  }
});

// * Find all Coinbase events
export function createFindAllCbResolver(tc, urlAddr) {
  tc.addResolver({
    name: 'findAllCb',
    type: [tc],
    args: {
    },
    resolve: async ({ context }) => {
      const responseData = coinbaseInstance.get(`/${urlAddr}`).then(response => response.data.data).catch((error) => {
        // handle error
        console.log(error);
      });
      return await responseData;
    }
  });
}

// * Find a Coinbase event based on id
export function createFindCbByIdResolver(tc, urlAddr) {
  tc.addResolver({
    name: 'findCbById',
    type: tc,
    args: {
      id: 'String!'
    },
    resolve: async ({ args, context }) => {
      const responseData = coinbaseInstance
        .get(`/${urlAddr}/${args.id}`)
        .then(response => response.data.data)
        .catch((error) => {
          // handle error
          console.log(error);
        });
      return await responseData;
    }
  });
}

// * Create Coinbase event
export function createCreateCbResolver(tc, urlAddr) {
  tc.addResolver({
    name: 'createCb',
    type: tc,
    args: {
      name: 'String',
      description: 'String',
      amount: 'String',
      pricingType: 'String',
      custId: 'String',
      custName: 'String'
    },
    resolve: async ({ args, context }) => {
      const data = {
        name: args.name,
        description: args.description,
        local_price: {
          amount: args.amount,
          currency: 'USD'
        },
        pricing_type: args.pricingType,
        metadata: {
          customer_id: args.custId,
          customer_name: args.custName
        }
      };

      const responseData = coinbaseInstance.post(`/${urlAddr}`, data).then(response => response.data.data).catch((error) => {
        // handle error
        console.log(error);
      });
      return await responseData;
    }
  });
}

// * Coinbase webhook subscriptions
export function createSubEventUpdatedResolver(tc) {
  tc.addResolver({
    kind: 'subscription',
    name: 'subEventUpdated',
    type: tc,
    resolve: payload => payload.chargeUpdated,
    subscribe: () => pubsub.asyncIterator('CHARGE_UPDATED')
  });
}
