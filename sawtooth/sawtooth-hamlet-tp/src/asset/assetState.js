const addresser = require('../hamletAddresser/addresser')
const asset_pb = require('../protos/asset_pb')

const _timeout = 2000

// ASSET FUNCTIONS
const getAsset = (name, addressCache, context) => {
  const address = addresser.makeAssetAddress(name)
  context.getState(
    [address],
    this.timeout
  ).then(addressValues => {
    console.log("get asset ad val", addressValues)
    addressCache.set(address, addressValues)

    let container = _getAssetContainer(addressCache, address)

    let asset = _getAssetFromContainer(
      container,
      name
    )
    return asset
  })
}


const setAsset = (name, description, owners, rules, addressCache, context) => {
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

const _getAssetContainer = (addressCache, address) => {

  let entry = addressCache.get(address)
  console.log("entry", entry)

  let container

  if(entry){
    container = asset_pb.AssetContainer.deserializeBinary(entry[address])
  } else {
    container = new asset_pb.AssetContainer()
  }
  return container
}

const _getAssetFromContainer = (container, name) => {
  console.log("get asset from con", container)

  container.getEntriesList().forEach(entry => {
    console.log("found entry", entry.getName())
    if(entry.getName() == name){
      return entry
    } else {
      console.log(name + " was not found in container.")
      return null
    }
  })
}

module.exports = {
  getAsset,
  setAsset
}