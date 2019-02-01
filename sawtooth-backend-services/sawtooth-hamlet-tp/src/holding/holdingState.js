const addresser = require('../hamletAddresser/addresser')
const holding_pb = require('../protos/holding_pb')

const _timeout = 2000



const setHolding = (name, description, owners, rules, addressCache, context) => {
  let address = addresser.makeAssetAddress(name)
  console.log(address)

  let container = _getAssetContainer(addressCache, address)

  let asset = _getAssetFromContainer(
    container,
    name
  ) || container.addEntries()
    console.log("asset", asset)

    asset.setName(name)
    asset.setOwnersList(owners)
    asset.setDescription(description)
    asset.setRulesList(rules)

  console.log("entrieslist setasset", container.getEntriesList())

  let data = container.serializeBinary()

  addressCache.set(address, data)


  let entriesToSubmit = {
    [address]: data
  }
  console.log("entries submitted", entriesToSubmit)

  return context.setState(
    entriesToSubmit,
    _timeout
  ).then(res => Promise.resolve(res))

}

const addHolding = () => {

}

const changeHoldingQty = () => {

}


const getHolding = (holdingId, addressCache, context) => {
  const address = addresser.makeHoldingAddress(holdingId)

  context.getState(
    [address],
    this.timeout
  ).then(addressValues => {
    console.log("get holding ad val", addressValues)
    addressCache.set(address, addressValues)

    const container = _getHoldingContainer(addressCache, address)

    const holding = _getHoldingFromContainer(
      container,
      name
    )
    return holding
  })
}


const _getHoldingContainer = (addressCache, address) => {

  let entry = addressCache.get(address)
  console.log("entry", entry)

  let container

  if(entry){
    container = holding_pb.HoldingContainer.deserializeBinary(entry[address])
  } else {
    container = new holding_pb.HoldingContainer()
  }
  return container
}

const _getHoldingFromContainer = (container, holdingId) => {
  console.log("get holding from con", container)

  container.getEntriesList().forEach(entry => {
    console.log("found entry", entry.getName())
    if(entry.getId() == holdingId){
      return entry
    } else {
      console.log(holdingId + " was not found in container.")
      return null
    }
  })
}

module.exports = {
  setHolding,
  addHolding
}