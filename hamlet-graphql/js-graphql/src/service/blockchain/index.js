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

import _ from 'lodash';
import { Stream } from 'sawtooth-sdk/messaging/stream';
import {
  Message,
  ClientBatchSubmitRequest,
  ClientBatchSubmitResponse,
  ClientBatchStatus,
  ClientBatchStatusRequest,
  ClientBatchStatusResponse
} from 'sawtooth-sdk/protobuf';
import * as dotenv from 'dotenv';
import * as batcher from './batcher';


dotenv.config();

const { VALIDATOR_URL } = process.env;
const stream = new Stream(VALIDATOR_URL);

const connect = () => new Promise(resolve => stream.connect(resolve)).then(() => {
  stream.onReceive((msg) => {
    console.warn('Received message of unknown type:', msg.messageType);
  });
});


const submit = (txnBytes, { wait }) => {
  // const batch = txnBytes;
  const batch = batcher.batch(txnBytes);
  console.log('-------created batch', batch);
  console.log('-------batch id', batch.headerSignature);
  return stream
    .send(
      Message.MessageType.CLIENT_BATCH_SUBMIT_REQUEST,
      ClientBatchSubmitRequest.encode({
        batches: [batch]
      }).finish()
    )
    .then(response => ClientBatchSubmitResponse.decode(response))
    .then((decoded) => {
      console.log('-------decoded response', decoded);
      const submitStatus = _.findKey(
        ClientBatchSubmitResponse.Status,
        val => val === decoded.status
      );
      console.log('-------submit status', submitStatus);
      if (submitStatus !== 'OK') {
        throw new Error(
          `Batch submission failed with status '${submitStatus}'`
        );
      }

      if (wait === null) {
        return { batch: batch.headerSignature };
      }
      console.log('----- Returning stream');
      return stream
        .send(
          Message.MessageType.CLIENT_BATCH_STATUS_REQUEST,
          ClientBatchStatusRequest.encode({
            batchIds: [batch.headerSignature],
            wait: true,
            timeout: wait
          }).finish()
        )
        .then((statusResponse) => {
          const statusBody = ClientBatchStatusResponse.decode(statusResponse)
            .batchStatuses[0];

          console.log('-------statusbody', statusBody);
          console.log('-------statusbody status', statusBody.status);
          if (statusBody.status !== ClientBatchStatus.Status.COMMITTED) {
            const id = statusBody.batchId;
            const status = _.findKey(
              ClientBatchStatus.Status,
              val => val === statusBody.status
            );
            const message = statusBody.invalidTransactions.length > 0
              ? statusBody.invalidTransactions[0].message
              : '';
            throw new Error(
              `Batch ${id} is ${status}, with message: ${message}`
            );
          }

          // Wait to return until new block is in database
          return new Promise(resolve => setTimeout(() => {
            resolve({ batch: batch.headerSignature });
          }, 1000));
        });
    });
};

export { connect, submit };

export {
  makePrivateKey,
  getPrivateKey,
  changePassword,
  createTxn,
  encodeTxns,
  getSignerPublicKey
} from './transaction';

export {
  batch, getPublicKey, validateTxns, encodeBatchList
} from './batcher';

export { payloadMethods, encode, FLOAT_PRECISION } from './payloads';
