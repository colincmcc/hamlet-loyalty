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
const pbts = require("protobufjs/cli/pbts")
const pbjs = require("protobufjs/cli/pbjs")

let files = fs
  .readdirSync(path.resolve(__dirname, "../../../protos"))
  .map(f => path.resolve(__dirname, "../../../protos", f))
  .filter(f => f.endsWith(".proto"));


pbjs.main([ "--target", "json-module", ...files ], (err, output) => {
    if (err) throw err;

    if (output !== "") {
      pbts.main(["-o", "bundle.d.ts", output])
    }

});



//"build:proto_types": "pbts -o src/protoTypes.d.ts src/protoBundle.js",

/*
let fileDir = "../src/bundle.js"
let outDir = "../src/bundle.d.ts"
let file = path.resolve(__dirname, fileDir)
let output = path.resolve(__dirname, outDir)


pbts.main([file]);
*/