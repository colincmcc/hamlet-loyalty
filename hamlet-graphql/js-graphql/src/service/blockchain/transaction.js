/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */


import * as _ from 'lodash';
import * as sjcl from 'sjcl';
import { createHash } from 'crypto';
import { createContext, CryptoFactory } from 'sawtooth-sdk/signing';
import * as secp256k1 from 'sawtooth-sdk/signing/secp256k1';
import {
  Transaction,
  TransactionHeader,
  TransactionList
} from 'sawtooth-sdk/protobuf';
import * as batcher from './batcher';

// const STORAGE_KEY = "asset_track.encryptedKey";
// const FAMILY_NAME = 'hamlet_loyalty';
// const FAMILY_VERSION = '1.0';
// const NAMESPACE = 'a4d67b';
const FAMILY_NAME = 'hamlet_loyalty';
const FAMILY_VERSION = '1.0';
const NAMESPACE = 'a4d67b';

const context = new secp256k1.Secp256k1Context();
// let privateKey = null;
// let signerPublicKey = null;
const batcherPublicKey = batcher.getPublicKey();

const createTxn = (payload, signerPublicKey, privateKey) => {
  const header = TransactionHeader.encode({
    signerPublicKey,
    batcherPublicKey,
    familyName: FAMILY_NAME,
    familyVersion: FAMILY_VERSION,
    inputs: [NAMESPACE],
    outputs: [NAMESPACE],
    dependencies: [],
    // nonce: (Math.random() * 10 ** 18).toString(36),
    payloadSha512: createHash('sha512')
      .update(payload)
      .digest('hex')
  }).finish();
  const transaction = Transaction.create({
    payload,
    header,
    headerSignature: context.sign(header, privateKey)
  });
  return transaction;
};

const encodeTxns = transactions => TransactionList.encode({ transactions }).finish();

/**
 * Generates a new private key, saving it it to memory and storage (encrypted).
 * Returns both a public key and the encrypted private key.
 */
const makePrivateKey = (password) => {
  const privateKey = context.newRandomPrivateKey();
  const signerPublicKey = context.getPublicKey(privateKey).asHex();
  const encryptedKey = sjcl.encrypt(password, privateKey.asHex());
  return { encryptedKey, publicKey: signerPublicKey, privateKey };
};

/**
 * Saves an encrypted key to storage, and the decrypted version in memory.

const setPrivateKey = (password, encryptedKey) => {
  const privateKeyHex = sjcl.decrypt(password, encryptedKey);

  privateKey = secp256k1.Secp256k1PrivateKey.fromHex(privateKeyHex);
  signerPublicKey = context.getPublicKey(privateKey).asHex();

  //window.localStorage.setItem(STORAGE_KEY, encryptedKey);

  return encryptedKey;
};

/**
 * Returns the user's private key as promised, requesting password as needed.
 */
const getPrivateKey = (password, encryptedKey) => Promise
  .resolve()
  .then(() => sjcl.decrypt(password, encryptedKey));

const getSignerPublicKey = privateKey => context.getPublicKey(privateKey).asHex();
/**
 * Re-encrypts a private key with a new password.
 */
const changePassword = (oldPassword, password, encryptedKey) => getPrivateKey(oldPassword, encryptedKey)
  .then((privateKey) => {
    const newEncryptedKey = sjcl.encrypt(password, privateKey);
    return newEncryptedKey;
  });

export {
  makePrivateKey,
  getPrivateKey,
  changePassword,
  createTxn,
  encodeTxns,
  getSignerPublicKey
};
