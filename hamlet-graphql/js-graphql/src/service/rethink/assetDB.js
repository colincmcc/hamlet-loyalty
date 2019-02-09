
import * as r from 'rethinkdb';
import * as _ from 'lodash';
import * as db from './rethinkRepository';

const ASSET_SCHEMA = {
  name: String,
  description: String,
  rules: [{ type: String, value: String }],
  owners: [String]
};

// Modified asset schema with optional keys
const UPDATE_SCHEMA = _.mapKeys(ASSET_SCHEMA, (_, key) => {
  if (key === '*' || key[0] === '?') return key;
  return `?${key}`;
});

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
  .filter(hasName(assetId))
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

const fetchAssetQuery = assetId => (block) => {
  console.log(block);
  return findAsset(assetId)(block);
};

const listAssetsQuery = filterQuery => block => getTable('assets', block)
  .filter(filterQuery)
  .coerceTo('array');

/* Exported functions */


const fetchAsset = assetId => db.queryWithCurrentBlock(fetchAssetQuery(assetId));

const listAssets = filterQuery => db.queryWithCurrentBlock(listAssetsQuery(filterQuery));

export {
  fetchAsset,
  listAssets
};
