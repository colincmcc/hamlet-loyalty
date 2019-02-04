import { TypeComposer, InputTypeComposer } from 'graphql-compose';
import { createTransactionResolver, createDbFindManyResolver, createDbFindOneResolver } from '../../utils/resolverFunctions';
import AccountTC from './Account';
import { RuleITC } from './Rule';

const AssetTC = TypeComposer.create(`
type Asset {
  asset_id: String
  name: String
  description: String
  owners: [String]
  rules: [Rule]
}
`);

const AssetITC = InputTypeComposer.create({
  name: 'AssetInput',
  description: 'Used to find or create an Asset',
  fields: {
    name: 'String',
    description: 'String',
    privateKey: 'String',
    rules: [RuleITC],
    owners: ['String']
  }
});
createTransactionResolver(AssetTC, AssetITC);

createDbFindManyResolver(AssetTC);
createDbFindOneResolver(AssetTC, AssetITC);


AssetTC.addRelation( // GraphQL relation definition
  'accountOwners',
  {
    resolver: () => AccountTC.getResolver('dbFindMany'),
    prepareArgs: {
      filter: source => ({
        publicKey: `${source.publicKey}`
      })
    },
    projection: { publicKey: true }
  }
);

export function getAssetResolvers() {
  return {};
}

export function getAssetMutations() {
  return {
    createAsset: AssetTC.getResolver('createBcTransaction')
  };
}

export default AssetTC;
