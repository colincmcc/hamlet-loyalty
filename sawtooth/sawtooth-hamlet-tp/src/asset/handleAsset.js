
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')

// createAsset (CreateAsset): The transaction.
// header (TransactionHeader): The header of the Transaction.
// state (MarketplaceState): The wrapper around the context.

const handleAssetCreation = (createAsset, header, state) => {
  let assetName = createAsset.getName()
  console.log(assetName)
  if(state.getAccount(header.signerPublicKey)){
    throw new InvalidTransaction(
      `Unable to create asset, signing key has no Account:  ${header.signerPublicKey} `
    )
  } else if (state.getAssetState(assetName)) {
    throw new InvalidTransaction(
      `Asset named ${createAsset.getName()} already exist`
    )
  } else {
    state.setAssetState(
      assetName,
      createAsset.getDescription(),
      [header.signerPublicKey],
      createAsset.getRulesList()
    )
  }
}

module.exports = {handleAssetCreation}
