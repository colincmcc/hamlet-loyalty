const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')
const HamletState  = require('../hamletState')


// createAccount (CreateAccount): The transaction.
// header (TransactionHeader): The header of the Transaction.
// state (MarketplaceState): The wrapper around the Context.

const handleAccountCreation = (createAccount, header, state) => {
  if(state.getAccountState(header.signerPublicKey)){
    throw new InvalidTransaction(
      `Account with key ${header.signerPublicKey} already exists!`
    )
  } else {
    state.setAccountState(
      header.signerPublicKey,
      createAccount.getLabel(),
      createAccount.getDescription(),
      holdings = []
    )
  }

}

module.exports = { handleAccountCreation }
