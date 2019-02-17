import { TypeComposer, InputTypeComposer } from 'graphql-compose';

import {
  createTransactionResolver,
  createDbFindOneResolver,
  createDbFindManyResolver
} from '../../utils/resolverFunctions';

import { AccountTC } from './Account';
import { AssetTC } from './Asset';

export const HoldingTC = TypeComposer.create(`
type Holding {
  holdingId: String,
  label: String
  description: String
  account: String
  asset: String
  quantity: String
}
`);
const HoldingITC = HoldingTC.getITC();
const CreateHoldingITC = InputTypeComposer.create({
  name: 'CreateHoldingInput',
  description: 'Used to find or create an Holding',
  fields: {
    holdingId: 'String',
    label: 'String',
    description: 'String',
    asset: 'String',
    quantity: 'Int'
  }
});

HoldingTC.addRelation(
  'accountData',
  {
    resolver: () => AccountTC.getResolver('dbFindOne'),
    prepareArgs: {
      input: source => ({ publicKey: `${[source.account]}` })
    }
  }
);

HoldingTC.addRelation(
  'assetData',
  {
    resolver: () => AssetTC.getResolver('dbFindOne'),
    prepareArgs: {
      input: source => ({ publicKey: `${[source.assetName]}` })
    }
  }
);

createTransactionResolver(HoldingTC, CreateHoldingITC);
createDbFindOneResolver(HoldingTC, HoldingITC);
createDbFindManyResolver(HoldingTC, HoldingITC);

export function getHoldingResolvers() {
  return {
    findHolding: HoldingTC.getResolver('dbFindOne'),
    findHoldings: HoldingTC.getResolver('dbFindMany')
  };
}

export function getHoldingMutations() {
  return {
    createHolding: HoldingTC.getResolver('createBcTransaction')
  };
}

export default HoldingTC;
