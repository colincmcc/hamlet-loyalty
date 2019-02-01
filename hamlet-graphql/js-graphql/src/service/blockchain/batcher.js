

import * as secp256k1 from 'sawtooth-sdk/signing/secp256k1';
import {
  Batch,
  BatchHeader,
  TransactionHeader,
  TransactionList,
  BatchList
} from 'sawtooth-sdk/protobuf';
import * as dotenv from 'dotenv';
import { BadRequest } from '../../utils/errors';

dotenv.config();

const { PRIVATE_KEY } = process.env;

// Initialize secp256k1 Context and PrivateKey wrappers
const context = new secp256k1.Secp256k1Context();
const privateKey = secp256k1.Secp256k1PrivateKey.fromHex(PRIVATE_KEY);

const publicKeyHex = context.getPublicKey(privateKey).asHex();
console.log(`Batch signer initialized with public key: ${publicKeyHex}`);

// Decode transaction headers and throw errors if invalid
const validateTxns = (txns) => {
  const headers = txns.map(txn => TransactionHeader.decode(txn.header));

  headers.forEach((header) => {
    if (header.batcherPublicKey !== publicKeyHex) {
      throw new BadRequest(
        `Transactions must use batcherPublicKey: ${publicKeyHex}`
      );
    }
  });
};

// Wrap an array of transactions in an encoded BatchList
const batchTxns = (txns) => {
  const header = BatchHeader.encode({
    signerPublicKey: publicKeyHex,
    transactionIds: txns.map(txn => txn.headerSignature)
  }).finish();

  return Batch.create({
    header,
    headerSignature: context.sign(header, privateKey),
    transactions: txns
  });
};

const encodeBatchList = batch => BatchList.encode({
  batches: [batch]
}).finish().slice();

// Validate an encoded TransactionList, then wrap in an encoded BatchList
const batch = (txnList) => {
  // const txns = TransactionList.decode(txnList).transactions;
  validateTxns(txnList);
  return batchTxns(txnList);
};

// Return the server's hex encoded public key
const getPublicKey = () => publicKeyHex;

export {
  batch, getPublicKey, batchTxns, validateTxns, encodeBatchList
};
