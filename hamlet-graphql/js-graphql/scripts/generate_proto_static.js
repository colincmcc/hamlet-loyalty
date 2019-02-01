/**
 * Copyright 2016 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
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
 * ------------------------------------------------------------------------------
 */

// Adapted from https://github.com/hyperledger/sawtooth-supply-chain/blob/master/asset_client/scripts/generate_proto_json.js

const fs = require("fs");
const path = require("path");
const protobuf = require("protobufjs");
const jsTarget = require("protobufjs/cli/targets/static-module")
const pbts = require("protobufjs/cli/pbts")
const pbjs = require("protobufjs/cli/pbjs")

let root = new protobuf.Root();

let files = fs
  .readdirSync(path.resolve(__dirname, "../../../protos"))
  .map(f => path.resolve(__dirname, "../../../protos", f))
  .filter(f => f.endsWith(".proto"));

try {
  root = root.loadSync(files);
} catch (e) {
  console.log("Unable to load protobuf files!");
  throw e;
}

jsTarget(root, {}, (err, output) => {
  if (err) {
    throw err;
  }

  if (output !== "") {
    process.stdout.write(output, "utf8");
  }

});