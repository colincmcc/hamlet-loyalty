import { TypeComposer } from 'graphql-compose';

import {
  createTransactionResolver,
  createDbFindOneResolver
} from '../../utils/resolverFunctions';


const HoldingTC = TypeComposer.create(`
type Holding {
  id: String,
  label: String
  description: String
  account: Account
  asset: Asset
  quantity: String
}
`);
createTransactionResolver(HoldingTC);
createDbFindOneResolver(HoldingTC, {
  holdingId: 'String',
  assetId: 'String',
  accountId: 'String',
  offerId: 'String',
  name: 'String'
});

export function getHoldingResolvers() {
  return {
    findHolding: HoldingTC.getResolver('dbFindOne')
  };
}

export function getHoldingMutations() {
  return {
    createHolding: HoldingTC.getResolver('createBcTransaction')
  };
}

export default HoldingTC;
