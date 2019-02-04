import { TypeComposer } from 'graphql-compose';
import { GraphQLString } from 'graphql'; // ES6
import composeWithJson from 'graphql-compose-json';
import * as batcher from '../../service/blockchain/batcher';


const InfoTC = TypeComposer.create(`
type Info
`);
InfoTC.addFields({
  pubKey: {
    type: GraphQLString,
    resolve: async ({ args, context }) => {
      console.log(context.privateKey);
      return batcher.getPublicKey();
    }
  },
  mapsApiKey: {
    type: GraphQLString,
    resolve: () => process.env.MAPS_API_KEY
  }
});

InfoTC.addResolver({
  kind: 'query',
  name: 'findInfo',
  type: InfoTC,
  resolve: async ({ args, context }) => {
    console.log(context.privateKey);
    return { pubkey: batcher.getPublicKey() };
  }
});
export function getInfoResolvers() {
  return {
    info: InfoTC.getResolver('findInfo')
  };
}

export default InfoTC;
