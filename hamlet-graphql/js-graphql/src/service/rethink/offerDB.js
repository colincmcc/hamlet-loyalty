
import * as r from 'rethinkdb';
import * as db from './rethinkRepository';

/* Helpers */

const getAttribute = attr => obj => obj(attr);
const getOfferId = getAttribute('offerId');
const getSource = getAttribute('source');
const getTarget = getAttribute('target');
const getCount = getAttribute('account');


const hasAttribute = getAttr => attr => obj => r.eq(attr, getAttr(obj));
const hasOfferId = hasAttribute(getOfferId);
const hasSource = hasAttribute(getSource);
const hasTarget = hasAttribute(getTarget);
const hasCount = hasAttribute(getCount);

const hasBlock = block => obj => r.and(
  obj('startBlockNum').le(block),
  obj('endBlockNum').gt(block)
);

const getTable = (tableName, block) => r.table(tableName).filter(hasBlock(block));

const findOffer = offerId => block => getTable('offers', block)
  .filter(hasOfferId(offerId))
  .nth(0);

const fetchOfferQuery = offerId => block => findOffer(offerId)(block);

const listOfferQuery = filterQuery => block => getTable('offers', block)
  .filter(filterQuery)
  .coerceTo('array');

/* Exported functions */


const fetchOffer = offerId => db.queryWithCurrentBlock(fetchOfferQuery(offerId));

const listOffers = filterQuery => db.queryWithCurrentBlock(listOfferQuery(filterQuery));

export {
  fetchOffer,
  listOffers
};
