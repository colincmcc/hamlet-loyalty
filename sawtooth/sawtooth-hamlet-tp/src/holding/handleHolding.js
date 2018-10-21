
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')

// createHolding (CreateHolding): The transaction.
// header (TransactionHeader): The header of the Transaction.
// state (MarketplaceState): The wrapper around the context.

const handleHoldingCreation = (createHolding, header, state) => {
  let holdingId = createHolding.getId()
  console.log(holdingId)
  if(!state.getAccount(header.signerPublicKey)){
    throw new InvalidTransaction(
      `Unable to create holding, signing key has no Account:  ${header.signerPublicKey} `
    )
  } else if (state.getHoldingState(holdingId)) {
    throw new InvalidTransaction(
      `Holding ID ${createHolding.getId()} already exist`
    )
  } else {
    const asset = state.getAsset(createHolding.getAsset())
    console.log(asset)

    if(asset = null){
      throw new InvalidTransaction(
        `Failed to create Holding, asset ${createHolding.getAsset()} does not exist`
      )
    }
    console.log("owners list", asset.getOwnersList())
    if(createHolding.getQuantity() > 0 && !asset.getOwnersList().contains(header.signerPublicKey)){
      throw new InvalidTransaction(
        `Failed to create Holding, quantity ${createHolding.getQuantity()} is a non-zero and the transaction signer public key  ${header.signerPublicKey} is not an owner of the asset`
      )
    }
    state.setHoldingState(
      createHolding.getId(),
      createHolding.getLabel(),
      createHolding.getDescription(),
      header.signerPublicKey,
      createHolding.getAsset(),
      createHolding.getQuantity()
    )

    state.addHoldingToAccount(
      header.signerPublicKey,
      createHolding.getId()
    )
  }
}

module.exports = {handleAssetCreation}
