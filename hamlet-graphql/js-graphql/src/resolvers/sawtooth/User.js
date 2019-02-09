import { TypeComposer, InputTypeComposer } from 'graphql-compose';
import { updateOneDbResolver, createDbFindOneResolver } from '../../utils/resolverFunctions';

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

const UserITC = InputTypeComposer.create({
  name: 'UserInput',
  description: 'Used to find or create an User',
  fields: {
    label: 'String',
    publicKey: 'String',
    email: 'String',
    assetId: 'String',
    ownedRecordId: 'String',
    custodianRecordId: 'String',
    reportId: 'String'
  }
});
createDbFindOneResolver(UserTC, UserITC);

updateOneDbResolver(UserTC, {
  username: 'String',
  password: 'String',
  email: 'String'
});
export function getUserResolvers() {
  return {
    findUser: UserTC.getResolver('dbFindOne')
  };
}

export function getUserMutations() {
  return {
    updateUser: UserTC.getResolver('dbUpdateOne')
  };
}

export default UserTC;
