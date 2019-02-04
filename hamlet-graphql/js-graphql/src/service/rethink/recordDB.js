
import * as r from 'rethinkdb';
import * as db from './rethinkRepository';

/* Helpers */

const getAttribute = attr => obj => obj(attr);
const getRecordId = getAttribute('recordId');
const getRecordType = getAttribute('recordType');
const getProperties = getAttribute('properties');
const getName = getAttribute('name');
const getFinal = getAttribute('final');
const getPublicKey = getAttribute('publicKey');
const getDataType = getAttribute('dataType');
const getReporters = getAttribute('reporters');
const getAuthorization = getAttribute('authorized');
const getReportedValues = getAttribute('reportedValues');
const getStatus = getAttribute('status');

const getAssociatedAccountId = role => record => record(role).nth(-1)('accountId');
const getOwnerId = getAssociatedAccountId('owners');
const getCustodianId = getAssociatedAccountId('custodians');

const getAssociatedAccounts = role => record => record(role).orderBy(r.desc('timestamp'));
const getOwners = getAssociatedAccounts('owners');
const getCustodians = getAssociatedAccounts('custodians');

const hasAttribute = getAttr => attr => obj => r.eq(attr, getAttr(obj));
const hasName = hasAttribute(getName);
const hasRecordId = hasAttribute(getRecordId);
const hasPublicKey = hasAttribute(getPublicKey);
const hasStatus = hasAttribute(getStatus);

const hasBlock = block => obj => r.and(
  obj('startBlockNum').le(block),
  obj('endBlockNum').gt(block)
);

const getTable = (tableName, block) => r.table(tableName).filter(hasBlock(block));

const getProposals = recordId => receivingAccount => block => getTable('proposals', block)
  .filter(hasRecordId(recordId))
  .filter(hasStatus('OPEN'))
  .pluck('receivingAccount', 'issuingAccount', 'role', 'properties')
  .coerceTo('array');

const findRecord = recordId => block => getTable('records', block)
  .filter(hasRecordId(recordId))
  .nth(0);

const findProperty = recordId => block => propertyName => getTable('properties', block)
  .filter(hasRecordId(recordId))
  .filter(hasName(propertyName))
  .nth(0);

const getReporter = publicKey => block => getTable('accounts', block)
  .filter(hasPublicKey(publicKey))
  .pluck('name', 'publicKey')
  .coerceTo('array')
  .do(results => r.branch(
    results.isEmpty(),
    { name: 'BAD DATA', publicKey: 'BAD DATA' },
    results(0)
  ));

const getValue = dataType => value => r.branch(
  r.eq(dataType, 'BOOLEAN'), value('booleanValue'),
  r.eq(dataType, 'NUMBER'), value('numberValue'),
  r.eq(dataType, 'STRING'), value('stringValue'),
  r.eq(dataType, 'BYTES'), value('bytesValue'),
  r.eq(dataType, 'LOCATION'), value('locationValue'),
  r.eq(dataType, 'ENUM'), value('enumValue'),
  r.eq(dataType, 'STRUCT'), value('structValue'),
  value('bytesValue') // if dataType is unknown, use bytesValue
);

const getUpdate = dataType => reporterKeys => block => value => r.expr({
  value: getValue(dataType)(value),
  timestamp: value('timestamp'),
  reporter: getReporter(reporterKeys.map(getPublicKey).nth(value('reporterIndex')))(block)
});


const findReportedValues = recordId => propertyName => dataType => reporterKeys => block => getTable('propertyPages', block)
  .filter(hasRecordId(recordId))
  .filter(hasName(propertyName))
  .concatMap(getReportedValues)
  .map(getUpdate(dataType)(reporterKeys)(block))
  .orderBy(r.desc('timestamp'))
  .coerceTo('array');


const getTypeProperties = record => block => getTable('recordTypes', block)
  .filter(hasName(getRecordType(record)))
  .map(getProperties)
  .map(getName)
  .nth(0)
  .map(findProperty(getRecordId(record))(block))
  .coerceTo('array');

const getPropertyValues = recordId => block => property => getReporters(property).do(reporterKeys => getDataType(property).do(dataType => r.expr({
  name: getName(property),
  dataType,
  fixed: property('fixed'),
  numberExponent: property('numberExponent'),
  unit: property('unit'),
  reporterKeys,
  values: findReportedValues(recordId)(getName(property))(dataType)(reporterKeys)(block)
})));

const getCurrentValue = propertyValue => r.branch(
  propertyValue('values').count().eq(0),
  null,
  propertyValue('values').nth(0)
);

const makePropertiesEntry = propertyValues => propertyValues
  .map(entry => r.object(
    getName(entry),
    entry('values').pluck('value', 'timestamp')
  ))
  .reduce((left, right) => left.merge(right))
  .default({});

const getAuthorizedReporterKeys = propertyValue => propertyValue('reporterKeys')
  .filter(getAuthorization)
  .map(getPublicKey)
  .coerceTo('array');

/* Queries */

const fetchPropertyQuery = (recordId, name) => block => findProperty(recordId)(block)(name).do(property => getPropertyValues(recordId)(block)(property).do(propertyValues => r.expr({
  name,
  recordId,
  reporters: getAuthorizedReporterKeys(propertyValues),
  dataType: propertyValues('dataType'),
  value: getCurrentValue(propertyValues),
  updates: propertyValues('values')
})));


// eslint-disable-next-line
const _loadRecord = (block, authedKey) => (record) => {
  const recordId = getRecordId(record);
  return getTypeProperties(record)(block)
    .map(getPropertyValues(recordId)(block)).do(propertyValues => r.expr({
      recordId: getRecordId(record),
      owner: getOwnerId(record),
      custodian: getCustodianId(record),
      final: getFinal(record),
      properties: propertyValues
        .map(propertyValue => r.expr({
          name: getName(propertyValue),
          type: getDataType(propertyValue),
          value: getCurrentValue(propertyValue).do(
            value => r.branch(
              value,
              value('value'),
              value
            )
          ),
          reporters: getAuthorizedReporterKeys(propertyValue)
        }).merge(r.branch(
          getDataType(propertyValue).eq('NUMBER'),
          { numberExponent: propertyValue('numberExponent') },
          {}
        )).merge(r.branch(
          propertyValue('fixed'),
          { fixed: propertyValue('fixed') },
          {}
        )).merge(r.branch(
          propertyValue('unit').ne(''),
          { unit: propertyValue('unit') },
          {}
        ))),
      updates: r.expr({
        owners: getOwners(record),
        custodians: getCustodians(record),
        properties: makePropertiesEntry(propertyValues)
      }),
      proposals: getProposals(recordId)(authedKey)(block)
    }));
};

const fetchRecordQuery = (recordId, authedKey) => block => findRecord(recordId)(block).do(_loadRecord(block, authedKey));

const listRecordsQuery = (authedKey, filterQuery) => block => getTable('records', block)
  .filter(filterQuery)
  .map(_loadRecord(block, authedKey))
  .coerceTo('array');

/* Exported functions */

const fetchProperty = (recordId, propertyName) => db.queryWithCurrentBlock(fetchPropertyQuery(recordId, propertyName));

const fetchRecord = (recordId, authedKey) => db.queryWithCurrentBlock(fetchRecordQuery(recordId, authedKey));

const listRecords = (authedKey, filterQuery) => db.queryWithCurrentBlock(listRecordsQuery(authedKey, filterQuery));

export {
  fetchProperty,
  fetchRecord,
  listRecords
};
