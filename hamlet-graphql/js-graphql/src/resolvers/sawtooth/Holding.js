import { TypeComposer, InputTypeComposer } from 'graphql-compose';

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
const HoldingITC = InputTypeComposer.create({
  name: 'HoldingInput',
  description: 'Used to find or create an Holding',
  fields: {
    id: 'String',
    label: 'String',
    description: 'String',
    asset: 'String',
    quantity: 'Int'
  }
});

createTransactionResolver(HoldingTC, HoldingITC);
createDbFindOneResolver(HoldingTC, HoldingITC);

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
