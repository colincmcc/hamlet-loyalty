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

// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
export const uuid4 = () => {
  var uuid = '',
    ii;
  for (ii = 0; ii < 32; ii += 1) {
    switch (ii) {
      case 8:
      case 20:
        uuid += '-';
        uuid += (Math.random() * 16 | 0).toString(16);
        break;
      case 12:
        uuid += '-';
        uuid += '4';
        break;
      case 16:
        uuid += '-';
        uuid += (Math.random() * 4 | 8).toString(16);
        break;
      default:
        uuid += (Math.random() * 16 | 0).toString(16);
    }
  }
  console.log('uuid', uuid);
  return uuid;
};
