import { TypeComposer } from 'graphql-compose';
import { GraphQLString } from 'graphql'; // ES6

import {
  createAccountTransactionResolver,
  createDbFindOneResolver,
  createDbFindManyResolver
} from '../../utils/resolverFunctions';
import UserTC from './User';
import { Account } from '../../protos/proto';


const AccountTC = TypeComposer.create(`
type Account {
  label: String
  description: String
  publicKey: String
  holdings: [String]
  user: User
  assets: [Asset]
  holdings: [Holding]
  ownedRecords: [Record]
  custodianRecords: [Record]
  reports: [Property]
}
`);

createAccountTransactionResolver(AccountTC);
createDbFindOneResolver(AccountTC, {
  name: 'String',
  publicKey: 'String',
  email: 'String',
  assetId: 'String',
  ownedRecordId: 'String',
  custodianRecordId: 'String',
  reportId: 'String'
});
createDbFindManyResolver(AccountTC);

export function getAccountResolvers() {
  return {
    findAccount: AccountTC.getResolver('dbFindOne'),
    findAccounts: AccountTC.getResolver('dbFindMany')
  };
}

export function getAccountMutations() {
  return {
    createAccount: AccountTC.getResolver('createAccountBcTransaction')
  };
}

export default AccountTC;
