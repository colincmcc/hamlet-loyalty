import { TypeComposer } from 'graphql-compose';
import { GraphQLString } from 'graphql'; // ES6

import {
  createAccountTransactionResolver,
  createDbFindOneResolver
} from '../../utils/resolverFunctions';
import UserTC from './User';


const AccountTC = TypeComposer.create(`
type Account {
  label: String
  description: String
  publicKey: String
  holdings: [String]
  user: User
}
`);
createAccountTransactionResolver(AccountTC);
createDbFindOneResolver(AccountTC);

export function getAccountResolvers() {
  return {
    findAccount: AccountTC.getResolver('dbFindOne')
  };
}

export function getAccountMutations() {
  return {
    createAccount: AccountTC.getResolver('createAccountBcTransaction')
  };
}

export default AccountTC;
