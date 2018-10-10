const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')
const { TransactionHandler } = require('sawtooth-sdk/processor/handler')

const addresser = require('./hamletAddresser/addresser')
const handleAsset = require('./asset/handleAsset')
const handleAccount = require ('./account/handleAccount')
const handleHolding = require ('./holding/handleHolding')
const HamletPayload = require('./hamletPayload')
const HamletState = require('./hamletState')

class HamletHandler  extends TransactionHandler {
  constructor (payload) {
    super(addresser.HAMLET_FAMILY, ['1.1'], [addresser.HAMLET_NAMESPACE])
  }


  apply (transactionProcessRequest, context) {

    let payload = new HamletPayload(transactionProcessRequest.payload)

    let state = new HamletState(context)

    let header = transactionProcessRequest.header


    if (payload.isCreateAccount()) {
      return handleAccount.handleAccountCreation(payload.createAccount(), transactionProcessRequest.header, state)
    } else if (payload.isCreateAsset()) {
      return handleAsset.handleAssetCreation(payload.createAsset(), transactionProcessRequest.header, state)
    } else if (payload.isCreateHolding()) {
      return handleHolding.handleHoldingCreation(payload.createHolding(), transactionProcessRequest.header, state)
    } else {
      throw new InvalidTransaction(
          `${payload.action} is not recognized as an action.`
      )
      console.log("invalid transaction")
    }
  }
}

module.exports = HamletHandler
