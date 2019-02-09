import { TypeComposer, InputTypeComposer } from 'graphql-compose';
import {
  createTransactionResolver,
  createUpdateTransactionResolver,
  createDbFindManyResolver,
  createDbFindOneResolver
} from '../../utils/resolverFunctions';
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
    owners: ['String'],
    encryptedKey: 'String',
    password: 'String'
  }
});
createTransactionResolver(AssetTC, AssetITC);
createUpdateTransactionResolver(AssetTC, AssetITC);
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
  return {
    findAsset: AssetTC.getResolver('dbFindOne')
  };
}

export function getAssetMutations() {
  return {
    createAsset: AssetTC.getResolver('createBcTransaction'),
    updateAsset: AssetTC.getResolver('updateBcTransaction')
  };
}

export default AssetTC;
