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

const AccountTC = TypeComposer.create(`
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
    resolver: () => AssetTC.getResolver('dbFindOne'),
    prepareArgs: {
      filter: source => ({ owners: `${[source.publicKey]}` })
    }
  }
);

AccountTC.addRelation(
  'holdings',
  {
    resolver: () => UserTC.getResolver('dbFindOne'),
    prepareArgs: {
      filter: source => ({ owners: `${[source.publicKey]}` })
    }
  }
);

AccountTC.addRelation(
  'records',
  {
    resolver: () => UserTC.getResolver('dbFindOne'),
    prepareArgs: {
      filter: source => ({ owners: `${[source.publicKey]}` })
    }
  }
);
AccountTC.addRelation(
  'user',
  {
    resolver: () => UserTC.getResolver('dbFindOne'),
    prepareArgs: {
      input: source => ({ publicKey: `${source.publicKey}` })
    }
  }
);
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

createAccountTransactionResolver(AccountTC);
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
