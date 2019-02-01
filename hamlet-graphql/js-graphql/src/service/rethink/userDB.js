

import * as r from 'rethinkdb';
import * as _ from 'lodash';
import * as db from './rethinkRepository';

const USER_SCHEMA = {
  username: String,
  password: String,
  email: /.+@.+\..+/,
  publicKey: String,
  '?encryptedKey': String,
  '*': null
};

// Modified user schema with optional keys
const UPDATE_SCHEMA = _.mapKeys(USER_SCHEMA, (_, key) => {
  if (key === '*' || key[0] === '?') return key;
  return `?${key}`;
});

const userQuery = query => db.queryTable('users', query);

// TODO: refactor insert steps
// eslint-disable-next-line
const userInsert = user => {
  return db.validate(user, USER_SCHEMA)
    .then(() => db.insertTable('users', user))
  // eslint-disable-next-line
    .then(results => {
      return db.insertTable('usernames', { username: user.username })
        .then(() => results)
      // eslint-disable-next-line
        .catch(err => {
          // Delete user, before re-throwing error
          // eslint-disable-next-line
          return db.modifyTable('users', users => {
            return users.get(user.publicKey).delete();
          })
            .then(() => {
              throw err;
            });
        });
    });
};

const userUpdate = (publicKey, changes) => db.validate(changes, UPDATE_SCHEMA)
  .then(() => db.updateTable('users', publicKey, changes))
  .then((results) => {
    // If changes did not change the resource, just fetch it
    if (results.unchanged === 1) {
      return db.queryTable('users', users => users.get(publicKey), false);
    }

    const oldUser = results.changes[0].old_val;
    const newUser = results.changes[0].new_val;

    // If username did not change, send back new users
    if (!changes.username) return newUser;

    // Modify usernames table with new name
    return db.modifyTable('usernames', usernames => usernames.get(oldUser.username).delete().do(() => usernames.insert({ username: changes.username })))
      .then(() => newUser)
      .catch(err => (
        // If failed to update usernames, reset user and re-throw error
        db.updateTable('users', publicKey, oldUser)
          .then(() => {
            throw err;
          })
      ));
  });
export {
  userQuery,
  userInsert,
  userUpdate
};
