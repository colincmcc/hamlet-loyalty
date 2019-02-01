import { TypeComposer } from 'graphql-compose';
import { GraphQLString } from 'graphql'; // ES6
import { createTransactionResolver } from '../../utils/resolverFunctions';


const AssetTC = TypeComposer.create(`
type Asset {
  name: String
  description: String
  publicKey: String
  owners: [String]
}
`);
createTransactionResolver(AssetTC);

export function getAssetResolvers() {
  return {};
}

export function getAssetMutations() {
  return {
    createAsset: AssetTC.getResolver('createBcTransaction')
  };
}

export default AssetTC;
