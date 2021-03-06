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

import * as path from 'path';
import _ from 'lodash';
import protobuf from 'protobufjs';

const protos = {};

const loadProtos = (filename, protoNames) => {
  const protoPath = path.resolve(__dirname, '../../../../protos', filename);
  return protobuf.load(protoPath).then((root) => {
    protoNames.forEach((name) => {
      protos[name] = root.lookupType(name);
    });
  });
};

const compile = () => Promise.all([
  loadProtos('account.proto', ['Account', 'AccountContainer']),
  loadProtos('asset.proto', ['Asset', 'AssetContainer']),
  loadProtos('holding.proto', ['Holding', 'HoldingContainer']),
  loadProtos('offer.proto', ['Offer', 'OfferContainer']),
  loadProtos('rule.proto', ['Rule']),
  loadProtos('offer_history.proto', [
    'OfferHistory',
    'OfferHistoryContainer'
  ]),

  loadProtos('property.proto', [
    'Property',
    'PropertyContainer',
    'PropertyPage',
    'PropertyPageContainer',
    'PropertySchema',
    'PropertyValue',
    'Location'
  ]),
  loadProtos('proposal.proto', ['Proposal', 'ProposalContainer']),
  loadProtos('record.proto', [
    'Record',
    'RecordContainer',
    'RecordType',
    'RecordTypeContainer'
  ]),
  loadProtos('payload.proto', [
    'TransactionPayload',
    'CreateAccount',
    'CreateAsset',
    'CreateHolding',
    'AcceptOffer',
    'CloseOffer',
    'CreateOffer',
    'FinalizeRecord',
    'CreateRecord',
    'CreateRecordType',
    'UpdateProperties',
    'CreateProposal',
    'AnswerProposal',
    'RevokeReporter'
  ])
]);

exports = _.assign(protos, { compile });
