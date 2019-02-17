import { TypeComposer, InputTypeComposer } from 'graphql-compose';

import {
  createAccountTransactionResolver,
  createDbFindOneResolver,
  createDbFindManyResolver
} from '../../utils/resolverFunctions';
import UserTC from './User';
import AssetTC from './Asset';
import HoldingTC from './Holding';
import RecordTC from './Record';

export const AccountTC = TypeComposer.create(`
type Account {
  label: String
  description: String
  publicKey: String
  holdings: [String]
}
`);

AccountTC.addRelation(
  'assets',
  {
    resolver: () => AssetTC.getResolver('dbFindMany'),
    prepareArgs: {
      input: source => ({ owners: `${source.publicKey}` })
    }
  }
);

AccountTC.addRelation(
  'holdingsData',
  {
    resolver: () => HoldingTC.getResolver('dbFindMany'),
    prepareArgs: {
      input: source => ({ account: `${[source.publicKey]}` })
    }
  }
);

AccountTC.addRelation(
  'records',
  {
    resolver: () => UserTC.getResolver('dbFindOne'),
    prepareArgs: {
      input: source => ({ owners: `${[source.publicKey]}` })
    }
  }
);
AccountTC.addRelation(
  'users',
  {
    resolver: () => UserTC.getResolver('dbFindMany'),
    prepareArgs: {
      input: source => ({ publicKey: `${source.publicKey}` })
    }
  }
);

const CreateAccountITC = InputTypeComposer.create({
  name: 'CreateAccountInput',
  description: 'Used to create an Account',
  fields: {
    password: 'String',
    label: 'String',
    description: 'String',
    username: 'String',
    email: 'String'
  }
});

const AccountITC = InputTypeComposer.create({
  name: 'AccountInput',
  description: 'Used to find or create an Account',
  fields: {
    label: 'String',
    publicKey: 'String',
    email: 'String',
    assetId: 'String',
    ownedRecordId: 'String',
    custodianRecordId: 'String',
    reportId: 'String'
  }
});

createAccountTransactionResolver(AccountTC, CreateAccountITC);
createDbFindOneResolver(AccountTC, AccountITC);
createDbFindManyResolver(AccountTC, AccountITC);

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
