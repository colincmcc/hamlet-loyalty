
import * as r from 'rethinkdb';
import * as _ from 'lodash';
import * as db from './rethinkRepository';

const hasCurrentBlock = currentBlock => obj => r.and(
  obj('startBlockNum').le(currentBlock),
  obj('endBlockNum').gt(currentBlock)
);

const getAttribute = attr => obj => obj(attr);
const getAssetId = getAttribute('id');
const getRecordId = getAttribute('recordId');
const getPublicKey = getAttribute('publicKey');
const getName = getAttribute('label');
const getReporters = getAttribute('reporters');
const getAuthorized = getAttribute('authorized');

const hasPublicKey = key => obj => r.eq(
  key,
  getPublicKey(obj)
);


/**
 * Record Associations
 * Function that compares the given account with the owners and custodians
 * fields in a list of [Record]s
 * @param {Record} record The record being checked in the filter function
 * @param {string} role The field being searched in the record row
 */
const getAssociatedRecordAccountId = role => record => record(role).nth(-1)('AccountId');
const getOwnerId = getAssociatedRecordAccountId('owners');
const getCustodianId = getAssociatedRecordAccountId('custodians');

const isAssociatedWithRecord = association => account => record => r.eq(
  association(record),
  getPublicKey(account)
);

/**
 * Takes an account and association type and searches the association types field in the
 * records table for the given account.  Return records that contain the account key
 * in the given field
 */
const isRecordOwner = isAssociatedWithRecord(getOwnerId);
const isRecordCustodian = isAssociatedWithRecord(getCustodianId);


/**
 * Asset Association
 * Function that compares a given account with the owners field in a list of [Asset]s
 * @param {Asset} asset The asset being checked in the filter function
 * @param {string} role The field being searched in the asset row (could default to owner)
 */
const getAssociatedAssetAccountId = role => asset => asset(role).nth(-1)('AccountId');
const getAssetOwnerId = getAssociatedAssetAccountId('owners');

const isAssociatedWithAsset = association => account => asset => r.eq(
  association(asset),
  getPublicKey(account)
);
const isAssetOwner = isAssociatedWithAsset(getAssetOwnerId);


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
  .coerceTo('array');

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
