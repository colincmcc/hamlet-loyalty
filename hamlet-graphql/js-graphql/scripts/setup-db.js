
import * as r from 'rethinkdb';

import * as dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const NAME = process.env.DB_NAME;

r.connect({ host: HOST, port: PORT })
  .then((conn) => {
    console.log(`Creating "${NAME}" database...`);
    r.dbList().contains(NAME).run(conn)
      .then((dbExists) => {
        if (dbExists) throw new Error(`"${NAME}" already exists`);
        return r.dbCreate(NAME).run(conn);
      })
      .then(() => {
        console.log('Creating "users" table...');
        return r.db(NAME).tableCreate('users', {
          primaryKey: 'publicKey'
        }).run(conn);
      })
      .then(() => {
        // The usernames table is used to quickly ensure unique usernames
        console.log('Creating "usernames" table...');
        return r.db(NAME).tableCreate('usernames', {
          primaryKey: 'username'
        }).run(conn);
      })
      .then(() => {
        console.log('Creating "accounts" table...');
        return r.db(NAME).tableCreate('accounts').run(conn);
      })
      .then(() => r.db(NAME).table('accounts').indexCreate('publicKey').run(conn))
      .then(() => {
        console.log('Creating "assets" table...');
        return r.db(NAME).tableCreate('assets').run(conn);
      })
      .then(() => r.db(NAME).table('assets').indexCreate('name').run(conn))
      .then(() => {
        console.log('Creating "offers" table...');
        return r.db(NAME).tableCreate('offers').run(conn);
      })
      .then(() => r.db(NAME).table('offers').indexCreate('offerId').run(conn))
      .then(() => {
        console.log('Creating "holdings" table...');
        return r.db(NAME).tableCreate('holdings').run(conn);
      })
      .then(() => r.db(NAME).table('holdings').indexCreate('holdingId').run(conn))
      .then(() => {
        console.log('Creating "records" table...');
        return r.db(NAME).tableCreate('records').run(conn);
      })
      .then(() => {
        r.db(NAME).table('records').indexCreate('recordId').run(conn);
      })
      .then(() => {
        console.log('Creating "recordTypes" table...');
        return r.db(NAME).tableCreate('recordTypes').run(conn);
      })
      .then(() => r.db(NAME).table('recordTypes').indexCreate('name').run(conn))
      .then(() => {
        console.log('Creating "properties" table...');
        return r.db(NAME).tableCreate('properties').run(conn);
      })
      .then(() => r.db(NAME).table('properties').indexCreate('attributes', [
        r.row('name'),
        r.row('recordId')
      ]).run(conn))
      .then(() => {
        console.log('Creating "propertyPages" table...');
        return r.db(NAME).tableCreate('propertyPages').run(conn);
      })
      .then(() => r.db(NAME).table('propertyPages').indexCreate('attributes', [
        r.row('name'),
        r.row('recordId'),
        r.row('pageNum')
      ]).run(conn))
      .then(() => {
        console.log('Creating "proposals" table...');
        return r.db(NAME).tableCreate('proposals').run(conn);
      })
      .then(() => r.db(NAME).table('proposals').indexCreate('attributes', [
        r.row('recordId'),
        r.row('timestamp'),
        r.row('receivingAgent'),
        r.row('role')
      ]).run(conn))
      .then(() => {
        console.log('Creating "blocks" table...');
        return r.db(NAME).tableCreate('blocks', {
          primaryKey: 'blockNum'
        }).run(conn);
      })
      .then(() => {
        console.log('Bootstrapping complete, closing connection.');
        return conn.close();
      })
      .catch((err) => {
        console.log(`Unable to bootstrap "${NAME}" db: ${err.message}`);
        return conn.close();
      });
  })
  .catch((err) => {
    console.log(`Unable to connect to db at ${HOST}:${PORT}}: ${err.message}`);
  });
