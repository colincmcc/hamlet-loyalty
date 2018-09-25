const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')
const payload_pb = require('./protos/payload_pb')

class HamletPayload {

  constructor (payload) {

    this.transaction = payload_pb.TransactionPayload
    this.currentTransaction =  this.transaction.deserializeBinary(payload)
  }

  // Returns protobuf Create Account message
  createAccount () {
    return this.currentTransaction.getCreateAccount()
  }

  isCreateAccount (payload) {
    const createAccountType = payload_pb.TransactionPayload.PayloadType.CREATE_ACCOUNT
    return this.currentTransaction.getPayloadType() == createAccountType
  }

  createAsset () {
    return this.currentTransaction.getCreateAsset()
  }

  isCreateAsset (payload) {
    const createAssetType = payload_pb.TransactionPayload.PayloadType.CREATE_ASSET
    return this.currentTransaction.getPayloadType() == createAssetType
  }

}

module.exports = HamletPayload