import { TypeComposer } from 'graphql-compose';
import * as auth from '../service/auth';

const AuthTC = TypeComposer.create(`
type Auth {
  authorization: String
  encryptedKey: String
  loggedIn: Boolean
}
`);
AuthTC.addResolver({
  name: 'authorize',
  type: AuthTC,
  args: {
    username: 'String',
    password: 'String'
  },
  resolve: ({ args, context }) => {
    const authorization = auth.authorize({
      username: args.username,
      password: args.password
    });

    return authorization;
  }
});

AuthTC.addResolver({
  name: 'logout',
  type: AuthTC,
  resolve: ({ args, context }) => {
    auth.clearPrivateKey();
  }
});

export function getAuthResolvers() {
  return {
    getAuth: AuthTC.getResolver('authorize')
  };
}

export function getAuthMutations() {
  return {
    logout: AuthTC.getResolver('logout')
  };
}

export default AuthTC;
