import _ from 'lodash';
import * as protobuf from 'protobufjs';
import {
  Asset,
  TransactionPayload,
  PropertyValue,
  Account,
  Proposal,
  Location,
  PropertySchema
} from '../protos/proto';

// TODO: remove lodash requirment

// import protoJson from "../generated_protos.json"
const protoJson = require('../protos/generated_protos.json');
/*
interface Action {
  enumName: string;
  name: string;
  proto: any;
  xform?: (x) => any;
}

type ActionMap = {
  [key: string]: Action;
};
*/
/**
 * * SAWTOOTH HELPER FUNCTIONS
 */

// Keys for payload actions
const ACTIONS = ['CREATE_ACCOUNT', 'CREATE_ASSET'];

// Create dictionary with key, enum and class names
const titleify = allCaps => allCaps
  .split('_')
  .map(word => word[0] + word.slice(1).toLowerCase())
  .join('');

// Compile Protobufs
const root = protobuf.Root.fromJSON(protoJson);

// Create data xforms on an action by action basis
const propertiesXformer = xform => data => _.set(data, 'properties', data.properties.map(xform));

const valueXform = propertiesXformer(prop => PropertyValue.create(prop));

const schemaXform = propertiesXformer((prop) => {
  if (prop.locationValue) {
    prop.locationValue = Location.create(prop.locationValue);
  }
  return PropertySchema.create(prop);
});

const actionMap = ACTIONS.reduce((acc, enumAction) => {
  const key = enumAction.toLowerCase() + titleify(enumAction).slice(1);
  const className = `${titleify(enumAction)}Action`;
  const protoValue = root[className];
  let xform = null;
  switch (key) {
    case 'createRecord':
      xform = valueXform;
      break;
    case 'createRecordType':
      xform = schemaXform;
      break;
    case 'createProperties':
      xform = valueXform;
      break;
    default:
      break;
  }

  const keyValue = {
    enumName: enumAction,
    name: className,
    proto: protoValue,
    xform
  };
  acc[key] = { ...keyValue };
  return acc;
}, {});

/* _.map(actionMap, action => _.set(action, "xform", x => x));
actionMap.createRecord.xform = valueXform;
actionMap.createRecordType.xform = schemaXform;
actionMap.updateProperties.xform = valueXform;
*/

/**
 * Encodes a new Payload with the specified action
 */
const encode = (actionKey, actionData) => {
  const action = actionMap[actionKey];
  if (!action) {
    throw new Error('There is no payload action with that key');
  }

  return TransactionPayload.encode({
    payloadType: TransactionPayload.PayloadType[action.enumName],
    timestamp: Math.floor(Date.now() / 1000),
    [actionKey]: action.proto.create(action.xform(actionData))
  }).finish();
};

/**
 * Particular encode methods can be called directly with their key name
 * For example: payloads.createAgent({name: 'Susan'})
 */
const actionMethods = _.reduce(
  actionMap,
  (methods, value, key) => _.set(methods, key, _.partial(encode, key)),
  {}
);

// Add enums on an action by action basis
actionMethods.createRecord.enumName = PropertySchema.DataType;
actionMethods.createRecordType.enumName = PropertySchema.DataType;
actionMethods.updateProperties.enumName = PropertySchema.DataType;
actionMethods.createProposal.enumName = Proposal.Role;
actionMethods.answerProposal.enumName = actionMap.answerProposal.proto.Response;

console.log(actionMethods);
console.log(actionMap);
const FLOAT_PRECISION = 1000000;

export { actionMethods, encode, FLOAT_PRECISION };

/**
 * * WORDPRESS RESOLVER FUNCTIONS

// * Find one by ID
export function createFindByIdResolver(tc, urlAddr) {
  tc.addResolver({
    name: "findById",
    type: tc,
    args: {
      id: "Int!"
    },
    resolve: async ({ args, context }) =>
      context.loader.load(`${baseUrl}/${urlAddr}/${args.id}/`)
  });
}

// * Resolve a list of urls
export function createFindByUrlListResolver(tc) {
  tc.addResolver({
    name: "findByUrlList",
    type: [tc],
    resolve: ({ context }) => context.loader.loadMany(rp.args.urls)
  });
}

// * Resolve a list of IDs
export function createFindByIdListResolver(tc, urlAddr) {
  tc.addResolver({
    name: "findByIdList",
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
    name: "findAll",
    type: [tc],
    resolve: ({ context }) => context.loader.load(`${baseUrl}/${urlAddr}/`)
  });
}

// * Find all of a post type with a given meta value
export function createFindByMetaResolver(tc, urlAddr, metaType) {
  tc.addResolver({
    name: "findByMeta",
    type: [tc],
    args: {
      [metaType]: "String!"
    },
    resolve: ({ args, context }) =>
      context.loader.load(
        `${baseUrl}/${urlAddr}?${metaType}=${args[[metaType]]}`
      )
  });
}

/**
 * *COINBASE RESOLVER FUNCTIONS

const coinbaseInstance = axios.create({
  baseURL: coinbaseEndpoint,
  timeout: 5000,
  headers: {
    "X-CC-Api-Key": `${coinbaseKey}`,
    "X-CC-Version": `${coinbaseApiVersion}`,
    "Content-Type": "application/json"
  }
});

// * Find all Coinbase events
export function createFindAllCbResolver(tc, urlAddr) {
  tc.addResolver({
    name: "findAllCb",
    type: [tc],
    args: {},
    resolve: async ({ context }) => {
      const responseData = coinbaseInstance
        .get(`/${urlAddr}`)
        .then(response => response.data.data)
        .catch(error => {
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
    name: "findCbById",
    type: tc,
    args: {
      id: "String!"
    },
    resolve: async ({ args, context }) => {
      const responseData = coinbaseInstance
        .get(`/${urlAddr}/${args.id}`)
        .then(response => response.data.data)
        .catch(error => {
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
    name: "createCb",
    type: tc,
    args: {
      name: "String",
      description: "String",
      amount: "String",
      pricingType: "String",
      custId: "String",
      custName: "String"
    },
    resolve: async ({ args, context }) => {
      const data = {
        name: args.name,
        description: args.description,
        local_price: {
          amount: args.amount,
          currency: "USD"
        },
        pricing_type: args.pricingType,
        metadata: {
          customer_id: args.custId,
          customer_name: args.custName
        }
      };

      const responseData = coinbaseInstance
        .post(`/${urlAddr}`, data)
        .then(response => response.data.data)
        .catch(error => {
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
    kind: "subscription",
    name: "subEventUpdated",
    type: tc,
    resolve: payload => payload.chargeUpdated,
    subscribe: () => pubsub.asyncIterator("CHARGE_UPDATED")
  });
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };
    return userId;
  }

  throw new AuthError();
}

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
*/
