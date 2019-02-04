
import * as r from 'rethinkdb';
import * as db from './rethinkRepository';

/* Helpers */

const getAttribute = attr => obj => obj(attr);
const getAssetId = getAttribute('id');
const getName = getAttribute('name');
const getDescription = getAttribute('description');
const getPublicKey = getAttribute('publicKey');


const getAssociatedAccountId = role => asset => asset(role).nth(-1)('accountId');
const getOwnerId = getAssociatedAccountId('owners');

const getAssociatedAccounts = role => asset => asset(role);
const getOwners = getAssociatedAccounts('owners');
// const getCustodians = getAssociatedAccounts('custodians');

const hasAttribute = getAttr => attr => obj => r.eq(attr, getAttr(obj));
const hasName = hasAttribute(getName);
const hasAssetId = hasAttribute(getAssetId);
const hasPublicKey = hasAttribute(getPublicKey);

const hasBlock = block => obj => r.and(
  obj('startBlockNum').le(block),
  obj('endBlockNum').gt(block)
);

const getTable = (tableName, block) => r.table(tableName).filter(hasBlock(block));

const findAsset = assetId => block => getTable('assets', block)
  .filter(hasAssetId(assetId))
  .nth(0);


const getAccount = publicKey => block => getTable('accounts', block)
  .filter(hasPublicKey(publicKey))
  .pluck('name', 'publicKey')
  .coerceTo('array')
  .do(results => r.branch(
    results.isEmpty(),
    { name: 'BAD DATA', publicKey: 'BAD DATA' },
    results(0)
  ));

const fetchAssetQuery = assetId => block => findAsset(assetId)(block);

const listAssetsQuery = (authedKey, filterQuery) => block => getTable('assets', block)
  .filter(filterQuery)
  .coerceTo('array');

/* Exported functions */


const fetchAsset = assetId => db.queryWithCurrentBlock(fetchAssetQuery(assetId));

const listAssets = (authedKey, filterQuery) => db.queryWithCurrentBlock(listAssetsQuery(authedKey, filterQuery));

export {
  fetchAsset,
  listAssets
};
