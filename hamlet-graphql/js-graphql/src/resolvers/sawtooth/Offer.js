import { TypeComposer, EnumTypeComposer } from 'graphql-compose';
import { GraphQLString } from 'graphql'; // ES6
import { createTransactionResolver } from '../../utils/resolverFunctions';

export const StatusTC = EnumTypeComposer.create(`
  enum Status {
    STATUS_UNSET
    OPEN
    ACCEPTED
    REJECTED
    CANCELED
  }
`);
const OfferTC = TypeComposer.create(`
type Offer {
  id: String
  label: String
  description: String
  owners: [Account]
  source: String
  source_quantity: Int
  target: String
  target_quantity: Int
  rules: [Rule]
  status: Status
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
