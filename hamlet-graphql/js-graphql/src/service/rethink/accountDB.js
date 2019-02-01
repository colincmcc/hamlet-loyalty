
import * as r from 'rethinkdb';
import * as _ from 'lodash';
import * as db from './rethinkRepository';

const hasCurrentBlock = currentBlock => obj => r.and(
  obj('startBlockNum').le(currentBlock),
  obj('endBlockNum').gt(currentBlock)
);

const getAttribute = attr => obj => obj(attr);
const getRecordId = getAttribute('recordId');
const getPublicKey = getAttribute('publicKey');
const getName = getAttribute('name');
const getReporters = getAttribute('reporters');
const getAuthorized = getAttribute('authorized');

const hasPublicKey = key => obj => r.eq(
  key,
  getPublicKey(obj)
);

const getAssociatedAccountId = role => record => record(role).nth(-1)('AccountId');
const getOwnerId = getAssociatedAccountId('owners');
const getCustodianId = getAssociatedAccountId('custodians');

const isAssociatedWithRecord = association => account => record => r.eq(
  association(record),
  getPublicKey(account)
);

const isRecordOwner = isAssociatedWithRecord(getOwnerId);
const isRecordCustodian = isAssociatedWithRecord(getCustodianId);

const isReporter = account => property => getReporters(property)
  .filter(hasPublicKey(getPublicKey(account)))
  .do(seq => r.branch(
    seq.isEmpty(),
    false,
    getAuthorized(seq.nth(0))
  ));

const getTable = (tableName, block) => r.table(tableName).filter(hasCurrentBlock(block));

const listQuery = filterQuery => block => getTable('accounts', block)
  .filter(filterQuery)
  .map(account => r.expr({
    name: getName(account),
    key: getPublicKey(account),
    owns: getTable('records', block)
      .filter(isRecordOwner(account))
      .map(getRecordId)
      .distinct(),
    custodian: getTable('records', block)
      .filter(isRecordCustodian(account))
      .map(getRecordId)
      .distinct(),
    reports: getTable('properties', block)
      .filter(isReporter(account))
      .map(getRecordId)
      .distinct()
  })).coerceTo('array');

const fetchUser = publicKey => r.table('users')
  .filter(hasPublicKey(publicKey))
  .pluck('username', 'email', 'encryptedKey')
  .nth(0);

const fetchQuery = (publicKey, auth) => block => getTable('accounts', block)
  .filter(hasPublicKey(publicKey))
  .pluck('label', 'publicKey')
  .nth(0)
  .do(
    account => r.branch(
      auth,
      account.merge(
        fetchUser(publicKey)
      ),
      account
    )
  );


const listAccounts = filterQuery => db.queryWithCurrentBlock(listQuery(filterQuery));

const fetchAccount = (publicKey, auth) => db.queryWithCurrentBlock(fetchQuery(publicKey, auth));

export {
  listAccounts,
  fetchAccount
};
