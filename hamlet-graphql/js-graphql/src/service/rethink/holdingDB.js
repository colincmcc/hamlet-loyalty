
import * as r from 'rethinkdb';
import * as db from './rethinkRepository';

/* Helpers */

const getAttribute = attr => obj => obj(attr);
const getName = getAttribute('label');
const getHoldingId = getAttribute('holdingId');
const getDescription = getAttribute('description');
const getAccount = getAttribute('account');
const getAsset = getAttribute('asset');
const getQuantity = getAttribute('quantity');


const getAssociatedAccountId = role => asset => asset(role).nth(-1)('accountId');
const getOwnerId = getAssociatedAccountId('owners');

const getAssociatedAccounts = role => asset => asset(role);
const getOwners = getAssociatedAccounts('owners');
// const getCustodians = getAssociatedAccounts('custodians');

const hasAttribute = getAttr => attr => obj => r.eq(attr, getAttr(obj));
const hasName = hasAttribute(getName);
const hasHoldingId = hasAttribute(getHoldingId);
const hasAccount = hasAttribute(getAccount);
const hasAsset = hasAttribute(getAsset);

const hasBlock = block => obj => r.and(
  obj('startBlockNum').le(block),
  obj('endBlockNum').gt(block)
);

const getTable = (tableName, block) => r.table(tableName).filter(hasBlock(block));

const findHolding = holdingId => block => getTable('holdings', block)
  .filter(hasHoldingId(holdingId))
  .nth(0);


const getHoldingAccount = publicKey => block => getTable('accounts', block)
  .filter(hasAccount(publicKey))
  .pluck('label', 'publicKey')
  .coerceTo('array')
  .do(results => r.branch(
    results.isEmpty(),
    { name: 'BAD DATA', publicKey: 'BAD DATA' },
    results(0)
  ));

const getHoldingAsset = assetId => block => getTable('assets', block)
  .filter(hasAsset(assetId))
  .pluck('name', 'holdingId', 'rules')
  .coerceTo('array')
  .do(results => r.branch(
    results.isEmpty(),
    { name: 'BAD DATA', publicKey: 'BAD DATA' },
    results(0)
  ));

const fetchHoldingQuery = holdingId => block => findHolding(holdingId)(block);

// TODO: Use authentication key to make sure the user has the right to see the holdings. Allow asset owners to see current holdings of their assets
const listHoldingQuery = filterQuery => block => getTable('holdings', block)
  .filter(filterQuery)
  .coerceTo('array');

/* Exported functions */


const fetchHolding = holdingId => db.queryWithCurrentBlock(fetchHoldingQuery(holdingId));

const listHoldings = (filterQuery) => {
  console.log(filterQuery);
  return db.queryWithCurrentBlock(listHoldingQuery(filterQuery));
};

export {
  fetchHolding,
  listHoldings
};
