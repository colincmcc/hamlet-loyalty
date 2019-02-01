import { TypeComposer } from 'graphql-compose';
import { GraphQLString } from 'graphql'; // ES6
import { createTransactionResolver } from '../../utils/resolverFunctions';


const OfferTC = TypeComposer.create(`
type Asset {
  name: String
  description: String
  publicKey: String
  owners: [String]
}
`);
createTransactionResolver(OfferTC);

export function getOfferResolvers() {
  return {};
}

export function getOfferMutations() {
  return {
    createOffer: OfferTC.getResolver('createBcTransaction')
  };
}

export default OfferTC;
