import { TypeComposer } from 'graphql-compose';

import {
  createTransactionResolver,
  createDbFindOneResolver
} from '../../utils/resolverFunctions';

export const AssociatedAccountTC = TypeComposer.create(`
type AssociatedAccount {
  account_id: String
  timestamp: Int
  account: Account
}
`);

export const RecordTypeTC = TypeComposer.create(`
type AssociatedAccount {
  name: String
  properties: [PropertySchema]
}
`);

const RecordTC = TypeComposer.create(`
type Record {
  record_id: String,
  record_type: String
  owners: [AssociatedAccount]
  custodians: [AssociatedAccount]
  final: Boolean
}
`);
createTransactionResolver(RecordTC);
createDbFindOneResolver(RecordTC, {
  recordId: 'String',
  name: 'String'
});

export function getRecordResolvers() {
  return {
    findRecord: RecordTC.getResolver('dbFindOne')
  };
}

export function getRecordMutations() {
  return {
    createRecord: RecordTC.getResolver('createBcTransaction')
  };
}

export default RecordTC;
