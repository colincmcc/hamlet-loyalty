import { TypeComposer, EnumTypeComposer, InputTypeComposer } from 'graphql-compose';
import { AuthenticationError } from 'apollo-server';

import {
  createTransactionResolver,
  createDbFindManyResolver,
  createDbFindOneResolver
} from '../../utils/resolverFunctions';
import { RuleITC } from './Rule';
import { HoldingTC } from './Holding';
import { payloadMethods, createTxn, submit } from '../../service/blockchain';
import { DEFAULT_WAIT_TIME } from '../../utils/constants';

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
  offerId: String
  label: String
  description: String
  owners: [String]
  source: String
  source_quantity: Int
  target: String
  target_quantity: Int
  rules: [Rule]
  status: Status
}
`);
const OfferITC = OfferTC.getITC();
const CreateOfferITC = InputTypeComposer.create({
  name: 'CreateOfferInput',
  description: 'Used to create an Offer',
  fields: {
    offerId: 'String',
    label: 'String',
    description: 'String',
    source: 'String',
    sourceQuantity: 'Int',
    target: 'String',
    targetQuantity: 'Int',
    rules: [RuleITC]
  }
});

const AcceptOfferITC = InputTypeComposer.create({
  name: 'AcceptOfferInput',
  description: 'Used to accept an Offer',
  fields: {
    offerId: 'String',
    source: 'String',
    target: 'String',
    count: 'Int'
  }
});

OfferTC.addResolver({
  kind: 'mutation',
  name: 'acceptOffer',
  args: { input: AcceptOfferITC },
  resolve: async ({ args, context }) => {
    if (!context.user) throw new AuthenticationError('not logged in');
    const { privateKey, user: signerPublicKey } = context;

    const { input } = args;

    const payload = payloadMethods.acceptOffer({
      ...input
    });
    const txnBytes = createTxn(payload, signerPublicKey, privateKey);
    return submit([txnBytes], { wait: DEFAULT_WAIT_TIME })
      .then(async (result) => {
        console.log(result);

        return result;
      });
  }
});

OfferTC.addRelation(
  'targetHolding',
  {
    resolver: () => HoldingTC.getResolver('dbFindOne'),
    prepareArgs: {
      input: source => ({ holdingId: `${[source.target]}` })
    }
  }
);

OfferTC.addRelation(
  'sourceHolding',
  {
    resolver: () => HoldingTC.getResolver('dbFindOne'),
    prepareArgs: {
      input: source => ({ holdingId: `${[source.source]}` })
    }
  }
);

createTransactionResolver(OfferTC, CreateOfferITC);
createDbFindOneResolver(OfferTC, OfferITC);
createDbFindManyResolver(OfferTC, OfferITC);

export function getOfferResolvers() {
  return {
    findOffer: OfferTC.getResolver('dbFindOne'),
    findOffers: OfferTC.getResolver('dbFindMany')
  };
}

export function getOfferMutations() {
  return {
    createOffer: OfferTC.getResolver('createBcTransaction'),
    acceptOffer: OfferTC.getResolver('acceptOffer')
  };
}

export default OfferTC;
