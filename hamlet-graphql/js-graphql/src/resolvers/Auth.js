import { TypeComposer } from 'graphql-compose';
import * as auth from '../service/auth';

const AuthTC = TypeComposer.create(`
type Auth {
  authorization: String,
  encryptedKey: String
}
`);
AuthTC.addResolver({
  name: 'authorize',
  type: AuthTC,
  args: {
    username: 'String',
    password: 'String'
  },
  resolve: async ({ args, context }) => {
    const authorization = await auth.authorize({
      username: args.username,
      password: args.password
    });
    return authorization;
  }
});

export function getAuthResolvers() {
  return {
    getAuth: AuthTC.getResolver('authorize')
  };
}

export function getAuthMutations() {
  return {
  };
}

export default AuthTC;
