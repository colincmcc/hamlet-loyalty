import { TypeComposer } from 'graphql-compose';
import AccountTC from './Account';
import { updateOneDbResolver } from '../../utils/resolverFunctions';

const UserTC = TypeComposer.create(`
type User {
  username: String
  password: String
  email: String
  publicKey: String
  encryptedKey: String
  authToken: String
}
`);


UserTC.addRelation( // GraphQL relation definition
  'account',
  {
    resolver: () => AccountTC.getResolver('dbFindOne'),
    prepareArgs: {
      filter: source => ({
        publicKey: `${source.publicKey}`
      })
    },
    projection: { publicKey: true }
  }
);
updateOneDbResolver(UserTC, {
  username: 'String',
  password: 'String',
  email: 'String'
});
export function getUserResolvers() {
  return {};
}

export function getUserMutations() {
  return {
    updateUser: UserTC.getResolver('dbUpdateOne')
  };
}

export default UserTC;
