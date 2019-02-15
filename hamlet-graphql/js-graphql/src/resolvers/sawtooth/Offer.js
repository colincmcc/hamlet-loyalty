import { TypeComposer, EnumTypeComposer, InputTypeComposer } from 'graphql-compose';
import { AuthenticationError } from 'apollo-server';

import { GraphQLString } from 'graphql'; // ES6
import { createTransactionResolver } from '../../utils/resolverFunctions';
import { RuleITC } from './Rule';
import { payloadMethods, createTxn, submit } from '../../service/blockchain';
import { DEFAULT_WAIT_TIME } from '../../utils/constants';
import { AcceptOffer } from '../../protos/proto';

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

const CreateOfferITC = InputTypeComposer.create({
  name: 'CreateOfferInput',
  description: 'Used to create an Offer',
  fields: {
    id: 'String',
    label: 'String',
    description: 'String',
    source: 'String',
    source_quantity: 'Int',
    target: 'String',
    target_quantity: 'Int',
    rules: [RuleITC]
  }
});

const AcceptOfferITC = InputTypeComposer.create({
  name: 'AcceptOfferInput',
  description: 'Used to accept an Offer',
  fields: {
    id: 'String',
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

    const payload = payloadMethods.createAcceptOffer({
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

createTransactionResolver(OfferTC, CreateOfferITC);

export function getOfferResolvers() {
  return {};
}

export function getOfferMutations() {
  return {
    createOffer: OfferTC.getResolver('createBcTransaction'),
    acceptOffer: OfferTC.getResolver('acceptOffer')
  };
}

export default OfferTC;
