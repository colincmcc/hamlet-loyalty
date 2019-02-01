/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { BadRequest, Unauthorized } from '../utils/errors';
import { userQuery } from './rethink';

dotenv.config();

const SALT_ROUNDS = 10;
const { JWT_SECRET } = process.env;

// Hashes a password as promised
const hashPassword = pass => bcrypt.hash(pass, SALT_ROUNDS);

// Creates a new JWT token as promised
const createToken = payload => new Promise((resolve, reject) => {
  jwt.sign(payload, JWT_SECRET, (err, token) => {
    if (err) reject(err);
    else resolve(token);
  });
});

// Verifies a token is valid as promised.
// Sends back the decoded payload, or throws an error if invalid.
const verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) reject(err);
    else resolve(payload);
  });
});


// Checks an object with username and password keys.
// Returns an auth token and the user's private key if it passes.
const authorize = ({ username, password }) => {
  if (!username || !password) {
    const message = 'Authorization requires username and password';
    return Promise.reject(new BadRequest(message));
  }

  return userQuery(users => users.filter({ username }))
    .then((matches) => {
      if (matches.length === 0) throw new Error();
      const user = matches[0];

      return bcrypt
        .compare(password, user.password)
        .then((passValid) => {
          if (!passValid) throw new Error();
          return createToken(user.publicKey);
        })
        .then(token => ({
          authorization: token,
          encryptedKey: user.encryptedKey
        }));
    })
    .catch(() => {
      throw new Unauthorized('Authorization Failed');
    });
};

export {
  hashPassword,
  createToken,
  verifyToken,
  authorize
};
