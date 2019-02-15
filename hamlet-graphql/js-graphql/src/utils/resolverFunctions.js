import * as _ from 'lodash';
import { AuthenticationError } from 'apollo-server';
import sjcl from 'sjcl';
import * as dotenv from 'dotenv';
import {
  submit,
  makePrivateKey,
  payloadMethods,
  createTxn
} from '../service/blockchain';
import {
  fetchAccount, userInsert, userQuery, userUpdate,
  listAccounts, fetchAsset, listAssets
} from '../service/rethink';

import {
  AssetTC, AccountTC, OfferTC, UserTC, HoldingTC
} from '../resolvers/sawtooth';

import { BadRequest } from './errors';
import * as auth from '../service/auth';
import { fetchUser } from '../service/rethink/userDB';
import { uuid4 } from './utils';
import { DEFAULT_WAIT_TIME } from './constants';

dotenv.config();

const { VALIDATOR_URL, SAWTOOTH_URL, JWT_SECRET } = process.env;


/**
 * * SAWTOOTH RESOLVER FUNCTIONS
 */

// TODO: switch private key getter to respond to a password or saved private key
// TODO: set up a transaction batcher


/**
 *  Creating a user steps
 *  Submit transaction to validator -> save user to database -> set auth
 */


const createAccountData = (password, label, description) => {
  const {
    publicKey,
    encryptedKey,
    privateKey: newPrivateKey
  } = makePrivateKey(password);

  const accountPayload = payloadMethods.createAccount({
    label,
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
export function createTransactionResolver(tc, inputType) {
  tc.addResolver({
    name: 'createBcTransaction',
    type: tc,
    args: { input: inputType },
    resolve: async ({ args, context }) => {
      if (!context.user) throw new AuthenticationError('not logged in');
      const { input } = args;
      let payload;
      const { privateKey, user: signerPublicKey } = context;
      let formattedData;
      const generatedId = uuid4();
      console.log(signerPublicKey);
      console.log(privateKey);

      // TODO: fix rule.value output to be bytes
      const rulePayload = input.rules ? input.rules.map(rule => ({
        type: payloadMethods.createAsset.enum[rule.type],
        value: rule.value
      })) : [];

      switch (tc) {
        case AssetTC:
          console.log('Creating Asset');

          payload = payloadMethods.createAsset({
            name: input.name,
            description: input.description,
            rules: rulePayload
          });

          formattedData = {
            name: input.name,
            description: input.description,
            rules: input.rules,
            owners: [context.user]
          };
          break;

        case OfferTC:
          console.log('Creating Offer');
          payload = payloadMethods.createOffer({
            id: generatedId,
            label: input.label,
            description: input.description,
            source: input.source,
            source_quantity: input.source_quantity,
            target: input.target,
            target_quantity: input.target_quantity,
            rules: rulePayload
          });
          formattedData = {
            id: generatedId,
            label: input.label,
            description: input.description,
            asset: input.asset,
            quantity: input.quantity
          };
          break;

        case HoldingTC:
          console.log('Creating Holding');

          payload = payloadMethods.createHolding({
            id: generatedId,
            label: input.label,
            asset: input.asset,
            description: input.description,
            quantity: input.quantity
          });

          formattedData = {
            id: generatedId,
            label: input.label,
            asset: input.asset,
            description: input.description,
            quantity: input.quantity
          };
          break;

        default: {
          break;
        }
      }
      console.log('----signer pubkey', signerPublicKey);
      console.log('----created payload ', payload);
      const txnBytes = createTxn(payload, signerPublicKey, privateKey);
      console.log('----created txn', txnBytes);

      return submit([txnBytes], { wait: DEFAULT_WAIT_TIME })
        .then(async (result) => {
          console.log(result);

          return formattedData;
        });
    }
  });
}

// * Create Sawtooth Transaction
export function createUpdateTransactionResolver(tc, inputType) {
  tc.addResolver({
    name: 'updateBcTransaction',
    type: tc,
    args: { input: inputType },
    resolve: async ({ args, context }) => {
      if (!context.user) throw AuthenticationError('not logged in');
      const { input } = args;
      let payload;
      const { privateKey } = context;
      const signerPublicKey = context.user;
      let data;
      let formattedData;

      console.log(signerPublicKey);
      console.log(privateKey);
      // TODO: fix rule.value output to be bytes
      const rulePayload = input.rules ? input.rules.map(rule => ({
        type: payloadMethods.createAsset.enum[rule.type],
        value: rule.value
      })) : [];
      console.log('rules', rulePayload);

      switch (tc) {
        case AssetTC:
          console.log('Updating Asset');

          payload = payloadMethods.updateAsset({
            name: input.name,
            description: input.description,
            rules: rulePayload,
            owners: input.owners
          });
          formattedData = {
            name: input.name,
            description: input.description,
            rules: input.rules,
            owners: input.owners
          };

          break;
        case OfferTC:
          console.log('Updating Offer');

          payload = payloadMethods.updateOffer({
            name: input.name,
            description: input.description
          });
          break;
        default: {
          break;
        }
      }
      console.log('----signer pubkey', signerPublicKey);
      console.log('----created payload ', payload);
      const txnBytes = createTxn(payload, signerPublicKey, privateKey);
      console.log('----created txn', txnBytes);

      return submit([txnBytes], { wait: DEFAULT_WAIT_TIME })
        .then(async (result) => {
          console.log(result);

          return formattedData;
        });
    }
  });
}

export function createAccountTransactionResolver(tc, inputType) {
  tc.addResolver({
    name: 'createAccountBcTransaction',
    type: tc,
    args: { input: inputType },
    resolve: async ({ args, context }) => {
      const { input } = args;

      console.log('Creating Account');
      let createdAccount;
      let createdUser;

      const {
        accountPayload,
        encryptedKey,
        publicKey,
        newPrivateKey
      } = createAccountData(
        input.password,
        input.label,
        input.description
      );

      const signerPublicKey = publicKey;
      const privateKey = newPrivateKey;
      const payload = accountPayload;
      console.log('----pub key', signerPublicKey);
      console.log('----privKey', privateKey);
      const user = {
        username: input.username,
        password: input.password,
        email: input.email,
        publicKey,
        encryptedKey
      };

      console.log('----created payload ', payload);
      const txnBytes = createTxn(payload, signerPublicKey, privateKey);
      console.log('----created txn', txnBytes);

      // TODO: Create user, then create blockchain record
      return submit([txnBytes], { wait: DEFAULT_WAIT_TIME })
        .then(async (result) => {
          console.log(result);
          const authInfo = await createUser(user);
          createdUser = {
            username: input.username,
            email: input.email,
            publicKey,
            encryptedKey,
            authToken: authInfo.authorization
          };
          createdAccount = {
            label: input.name,
            description: input.description,
            publicKey,
            user
          };
          return createdAccount;
        });
    }
  });
}

export function createDbFindOneResolver(tc, inputType) {
  tc.addResolver({
    name: 'dbFindOne',
    type: tc,
    args: { input: inputType },
    resolve: async ({ args, context }) => {
      const { input } = args;
      let data;
      let formattedData;
      switch (tc) {
        case AccountTC:
          data = await fetchAccount(input.publicKey, true);

          formattedData = {
            label: data.label,
            publicKey: data.publicKey
          };
          break;
        case UserTC:
          formattedData = await userQuery(users => users.filter(input), false)[0];
          break;
        case AssetTC:
          data = await fetchAsset(input.name, true);

          formattedData = {
            name: data.name,
            id: data.id,
            description: data.description,
            owners: data.owners,
            rules: data.rules
          };
          break;
        default:
          break;
      }
      console.log('findOne', formattedData);
      return formattedData;
    }
  });
}


export function createDbFindManyResolver(tc, inputType) {
  tc.addResolver({
    name: 'dbFindMany',
    type: [tc],
    args: { input: inputType },
    resolve: async ({ args, context }) => {
      const { input } = args;
      let data;
      let formattedData;
      let filterQuery;
      switch (tc) {
        case AccountTC:
          data = await listAccounts(input);
          break;
        case AssetTC:
          data = await listAssets(input);
          break;
        case UserTC:
          data = await userQuery(users => users.filter(input));
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
      if (!context.user) throw AuthenticationError('not logged in');
      let updated;
      let formattedData;
      console.log('user updating data', context.user);
      switch (tc) {
        case UserTC:
          formattedData = updateUser(args, { authedKey: context.user });
          break;
        case AssetTC:
          formattedData = assetUpdate(args.assetName, args);
          break;
        default:
          break;
      }

      return formattedData;
    }
  });
}
