import { TypeComposer } from 'graphql-compose';
import * as _ from 'lodash';
import { withFilter } from 'apollo-server';
import sjcl from 'sjcl';
import * as dotenv from 'dotenv';
import {
  submit,
  makePrivateKey,
  payloadMethods,
  createTxn,
  getSignerPublicKey
} from '../service/blockchain';
import {
  fetchAccount, userInsert, userQuery, userUpdate
} from '../service/rethink';
import {
  AssetTC, AccountTC, OfferTC, UserTC
} from '../resolvers/sawtooth';
import { BadRequest } from './errors';
import * as auth from '../service/auth';

dotenv.config();

const { VALIDATOR_URL, SAWTOOTH_URL } = process.env;
const DEFAULT_WAIT_TIME = 30;


/**
 * * SAWTOOTH RESOLVER FUNCTIONS
 */

// TODO: switch private key getter to respond to a password or saved private key
// TODO: set up a transaction batcher


/**
 *  Creating a user steps
 *  Submit transaction to validator -> save user to database -> set auth
 */


const createAccountData = (password, name, description) => {
  const {
    publicKey,
    encryptedKey,
    privateKey: newPrivateKey
  } = makePrivateKey(password);

  const accountPayload = payloadMethods.createAccount({
    label: name,
    description
  });
  return {
    publicKey, encryptedKey, newPrivateKey, accountPayload
  };
};


const createUser = user => Promise.resolve()
  .then(() => fetchAccount(user.publicKey, null)
    .catch(() => {
      throw new BadRequest('Public key must match an Account on blockchain');
    }))
  .then(() => auth.hashPassword(user.password))
  .then(hashed => userInsert(_.assign({}, user, { password: hashed }))
    .catch((err) => {
      throw new BadRequest(err.message);
    }))
  .then(() => auth.createToken(user.publicKey))
  .then(token => ({
    authorization: token,
    encryptedKey: user.encryptedKey || null
  }));

const updateUser = (changes, { authedKey }) => Promise.resolve()
  .then(() => {
    if (changes.password) {
      return auth.hashPassword(changes.password)
        .then(hashed => _.set(changes, 'password', hashed));
    }
    return changes;
  })
  .then(finalChanges => userUpdate(authedKey, finalChanges))
  .then(updated => _.omit(updated, 'password'));

// * Create Sawtooth Transaction
export function createTransactionResolver(tc) {
  tc.addResolver({
    name: 'createBcTransaction',
    type: tc,
    args: {
      name: 'String',
      username: 'String',
      description: 'String',
      password: 'String',
      encryptedKey: 'String',
      email: 'String',
      publicKey: 'String'
    },
    resolve: async ({ args, context }) => {
      let payload;
      let account;
      let privateKey;
      let signerPublicKey;
      let user;
      let encryptedKey;
      switch (tc) {
        case AssetTC:
          console.log('Creating Asset');

          payload = payloadMethods.createAsset({
            name: args.name,
            decsription: args.description
          });
          break;

        case OfferTC:
          console.log('Creating Asset');

          payload = payloadMethods.createAsset({
            name: args.name,
            decsription: args.description
          });
          break;
        default: {
          privateKey = sjcl.decrypt(args.password, args.encryptedKey);
          signerPublicKey = getSignerPublicKey(privateKey);
          break;
        }
      }
      console.log('----created payload ', payload);
      const txnBytes = createTxn(payload, signerPublicKey, privateKey);
      console.log('----created txn', txnBytes);

      const submitresponse = submit([txnBytes], { wait: DEFAULT_WAIT_TIME });
      submitresponse.then(value => console.log('-----------------value', value));
      console.log(submitresponse);
    }
  });
}

export function createAccountTransactionResolver(tc) {
  tc.addResolver({
    name: 'createAccountBcTransaction',
    type: tc,
    args: {
      name: 'String',
      username: 'String',
      description: 'String',
      password: 'String',
      encryptedKey: 'String',
      email: 'String',
      publicKey: 'String'
    },
    resolve: async ({ args, context }) => {
      console.log('Creating Account');
      let createdAccount;
      let createdUser;
      const {
        accountPayload,
        encryptedKey,
        publicKey,
        newPrivateKey
      } = createAccountData(
        args.password,
        args.name,
        args.description
      );


      const signerPublicKey = publicKey;
      const privateKey = newPrivateKey;
      const payload = accountPayload;

      const user = {
        username: args.username,
        password: args.password,
        email: args.email,
        publicKey,
        encryptedKey
      };

      console.log('----created payload ', payload);
      const txnBytes = createTxn(payload, signerPublicKey, privateKey);
      console.log('----created txn', txnBytes);

      return submit([txnBytes], { wait: DEFAULT_WAIT_TIME })
        .then(async (result) => {
          console.log(result);
          const authInfo = await createUser(user);
          createdUser = {
            username: args.username,
            email: args.email,
            publicKey,
            encryptedKey,
            authToken: authInfo.authorization
          };
          createdAccount = {
            label: args.name,
            description: args.description,
            publicKey,
            user
          };
          return createdAccount;
        });
    }
  });
}

export function createDbFindOneResolver(tc) {
  tc.addResolver({
    name: 'dbFindOne',
    type: tc,
    args: {
      name: 'String',
      username: 'String',
      description: 'String',
      password: 'String',
      encryptedKey: 'String',
      email: 'String',
      publicKey: 'String'
    },
    resolve: async ({ args, context }) => {
      let data;
      let formattedData;
      switch (tc) {
        case AccountTC:
          data = await fetchAccount(args.publicKey, true);

          formattedData = {
            label: data.label,
            publicKey: data.publicKey,
            user: {
              username: data.username,
              encryptedKey: data.encryptedKey,
              email: data.email
            }
          };
          break;
        case UserTC:
          data = await fetchAccount(args.publicKey, true);

          formattedData = {
            label: data.label,
            publicKey: data.publicKey,
            user: {
              username: data.username,
              encryptedKey: data.encryptedKey,
              email: data.email
            }
          };
          break;
        default:
          break;
      }
      return formattedData;
    }
  });
}


export function createDbFindManyResolver(tc) {
  tc.addResolver({
    name: 'dbFindOne',
    type: tc,
    args: {
      name: 'String',
      username: 'String',
      description: 'String',
      password: 'String',
      encryptedKey: 'String',
      email: 'String',
      publicKey: 'String'
    },
    resolve: async ({ args, context }) => {
      let data;
      switch (tc) {
        case AccountTC:
          const accountData = await fetchAccount(args.publicKey, true);

          const data = {
            label: accountData.label,
            publicKey: accountData.publicKey,
            user: {
              username: accountData.username,
              encryptedKey: accountData.encryptedKey,
              email: accountData.email
            }
          };
          break;

        default:
          break;
      }
      return data;
    }
  });
}


export function updateOneDbResolver(tc, fields) {
  tc.addResolver({
    name: 'dbUpdateOne',
    type: tc,
    args: fields,
    resolve: async ({ args, context }) => {
      if (!context.user) return {};
      let updated;
      let formattedData;
      formattedData = updateUser(args, { authedKey: context.user });

      return formattedData;
    }
  });
}
