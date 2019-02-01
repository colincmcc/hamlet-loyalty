import _ from 'lodash';
import * as protobuf from 'protobufjs';
import * as protos from '../../protos/proto';

// TODO: remove lodash requirment

const protoJson = require('../../protos/generated_protos.json');

/**
 * * SAWTOOTH HELPER FUNCTIONS
 */

// Keys for payload actions
const ACTIONS = [
  'CREATE_ACCOUNT',
  'CREATE_ASSET',
  'CREATE_RECORD',
  'FINALIZE_RECORD',
  'CREATE_RECORD_TYPE',
  'UPDATE_PROPERTIES',
  'CREATE_PROPOSAL',
  'ANSWER_PROPOSAL',
  'REVOKE_REPORTER'
];

// Create dictionary with key, enum and class names
const titleify = allCaps => allCaps
  .split('_')
  .map(word => word[0] + word.slice(1).toLowerCase())
  .join('');

// Compile Protobufs
const root = protobuf.Root.fromJSON(protoJson);
const PayloadMsg = root.lookup('TransactionPayload');
const PropertyValueMsg = root.lookup('PropertyValue');
const PropertySchemaMsg = root.lookup('PropertySchema');
const LocationMsg = root.lookup('Location');
const ProposalMsg = root.lookup('Proposal');

// Create data xforms on an action by action basis
const propertiesXformer = xform => data => _.set(data, 'properties', data.properties.map(xform));

const valueXform = propertiesXformer(prop => PropertyValueMsg.create(prop));

const schemaXform = propertiesXformer((prop) => {
  if (prop.locationValue) {
    prop.locationValue = LocationMsg.create(prop.locationValue);
  }
  return PropertySchemaMsg.create(prop);
});
/**
 * actionMap holds the PayloadType and associated methods involved in creating the payload.
 *
 * @param enumName The PayloadType
 * @param className The name of the associated create payload (e.g. CreateAsset)
 * @param proto The actual message class used to create the payload (e.g. CreateAsset.create())
 * @param xform Transform function for the data before encoding it into
 *  a payload.  Defaults to (x)=> x
 *
 */
const actionMap2 = ACTIONS.reduce((acc, enumAction) => {
  const key = enumAction.charAt(0).toLowerCase() + titleify(enumAction).slice(1);
  const className = `${titleify(enumAction)}`;

  const protoValue = protos[className];


  let xform = x => x;

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
  acc[key] = keyValue;
  return acc;
}, {});


const actionMap = ACTIONS.reduce((map, enumName) => {
  const key = enumName[0].toLowerCase() + titleify(enumName).slice(1);
  const className = `${titleify(enumName)}`;
  return _.set(map, key, { enum: enumName, name: className });
}, {});

_.map(actionMap, action => _.set(action, 'xform', x => x));
actionMap.createRecord.xform = valueXform;
actionMap.createRecordType.xform = schemaXform;
actionMap.updateProperties.xform = valueXform;

_.map(actionMap, action => _.set(action, 'proto', root.lookup(action.name)));

/**
 * Encodes a new Payload with the specified action
 */

const encode = (actionKey, actionData) => {
  const action = actionMap[actionKey];

  if (!action) {
    throw new Error('There is no payload action with that key');
  }

  return PayloadMsg.encode({
    payloadType: PayloadMsg.PayloadType[action.enum],
    timestamp: Math.floor(Date.now() / 1000),
    [actionKey]: action.proto.create(actionData)
  }).finish();
};

/**
 * Particular encode methods can be called directly with their key name
 * For example: payloads.createAccount({label: 'Susan', description: 'Personal Account'})
 */
const payloadMethods = _.reduce(
  actionMap,
  (methods, value, key) => _.set(methods, key, _.partial(encode, key)), {}
);

const payloadMethods2 = Object.keys(actionMap).reduce(
  (acc, curr) => {
    const key = curr.toString();
    acc[key] = encode(key);
    return acc;
  },
  {}
);


// Add enums on an action by action basis
payloadMethods.createRecord.enum = PropertySchemaMsg.DataType;
payloadMethods.createRecordType.enum = PropertySchemaMsg.DataType;
payloadMethods.updateProperties.enum = PropertySchemaMsg.DataType;
payloadMethods.createProposal.enum = ProposalMsg.Role;
payloadMethods.answerProposal.enum = actionMap.answerProposal.proto.Response;

const FLOAT_PRECISION = 1000000;

export { payloadMethods, encode, FLOAT_PRECISION };
