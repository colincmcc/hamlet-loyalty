import { TypeComposer } from 'graphql-compose';


const RuleTC = TypeComposer.create(`
type Rule {
  username: String!
  password: String!
  email: String
  publicKey: String!
  encryptedKey: String
  authToken: String
}
`);


export function getUserResolvers() {
  return {};
}

export function getUserMutations() {
  return {
  };
}

export default RuleTC;
