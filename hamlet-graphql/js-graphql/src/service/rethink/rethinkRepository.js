import * as r from 'rethinkdb';
import * as _ from 'lodash';
import jsSchema from 'js-schema';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST, DB_PORT, DB_NAME, RETRY_WAIT
} = process.env;
const AWAIT_TABLE = 'blocks';

// Connection to db for query methods, run connect before querying
let connection = null;

const promisedTimeout = (fn, wait) => new Promise(resolve => setTimeout(resolve, wait)).then(fn);

const awaitDatabase = () => r.tableList().run(connection)
  .then((tableNames) => {
    if (!tableNames.includes(AWAIT_TABLE)) {
      throw new Error();
    }
    console.log('Successfully connected to database:', DB_NAME);
  })
  .catch(() => {
    console.warn('Database not initialized:', DB_NAME);
    console.warn(`Retrying database in ${RETRY_WAIT / 1000} seconds...`);
    return promisedTimeout(awaitDatabase, RETRY_WAIT);
  });

const connect = () => r.connect({ host: DB_HOST, port: DB_PORT, db: DB_NAME })
  .then((conn) => {
    connection = conn;
    return awaitDatabase();
  })
  .catch((err) => {
    if (err instanceof r.Error.ReqlDriverError) {
      console.warn('Unable to connect to RethinkDB');
      console.warn(`Retrying in ${RETRY_WAIT / 1000} seconds...`);
      return promisedTimeout(connect, RETRY_WAIT);
    }
    throw err;
  });

const runQuery = query => query
  .run(connection)
  .catch((err) => {
    console.error(err.message);
    throw new Error(err.message);
  });

const queryWithCurrentBlock = query => runQuery(
  r.table('blocks')
    .orderBy(r.desc('blockNum'))
    .nth(0)('blockNum')
    .do(query)
);

// Runs a specified query against a database table
const queryTable = (table, query, removeCursor = true) => query(r.table(table))
  .run(connection)
  .then(cursor => (removeCursor ? cursor.toArray() : cursor))
  .catch((err) => {
    console.error(`Unable to query "${table}" table!`);
    console.error(err.message);
    throw new Error(err.message);
  });

// Use for queries that modify a table, turns error messages into errors
const modifyTable = (table, query) => queryTable(table, query, false)
  .then((results) => {
    if (!results) {
      throw new Error(`Unknown error while attempting to modify "${table}"`);
    }
    if (results.errors > 0) {
      throw new Error(results.first_error);
    }
    return results;
  });

// Inserts a document into a table, throwing an error on failure
// Accepts an optional validator function, which should have an errors method
const insertTable = (table, doc) => modifyTable(table, t => t.insert(doc))
  .then((results) => {
    if (results.inserted === 0) {
      throw new Error(`Unknown Error: Unable to insert to ${table}`);
    }
    return results;
  });

const updateTable = (table, primary, changes) => modifyTable(table, t => t.get(primary).update(changes, { returnChanges: true }))
  .then((results) => {
    if (results.replaced === 0 && results.unchanged === 0) {
      throw new Error(`Unknown Error: Unable to update ${primary}`);
    }
    return results;
  });

// Validates a db input based on a schema as promised
const validate = (input, schema) => Promise.resolve()
  .then(() => {
    const validator = jsSchema(schema);
    if (validator(input)) return input;

    const errors = validator.errors(input);
    if (!errors) throw new Error('Invalid Input: one or more keys forbidden');

    const [key, message] = _.entries(errors)[0];
    throw new Error(`Invalid Input: "${key}" - ${message}`);
  });

export {
  connect,
  runQuery,
  queryWithCurrentBlock,
  queryTable,
  modifyTable,
  insertTable,
  updateTable,
  validate
};
