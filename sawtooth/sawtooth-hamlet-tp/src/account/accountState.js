
const account_pb = require('../protos/account_pb')
const addresser = require('../hamletAddresser/addresser')

const _timeout = 2000

const getAccount = (publicKey, addressCache, context) => {
  let address = addresser.makeAccountAddress(publicKey)

  context.getState(
    [address],
    _timeout
  ).then(addressValues => {
    console.log("get account ad val", addressValues)
    addressCache.set(address, addressValues)

    let container = _getAccountContainer(addressCache, address)

    let account = _getAccountFromContainer(
      container,
      publicKey
    )
    return account
  })

}


const setAccount = (publicKey, label, description, holdings, addressCache, context) => {
  let address = addresser.makeAccountAddress(publicKey)

  let container = _getAccountContainer(addressCache, address)

  console.log("get account con", container)
  let account = _getAccountFromContainer(
    container,
    publicKey
  ) || container.addEntries()

  account.setPublicKey(publicKey)
  account.setLabel(label)
  account.setDescription(description)
  account.setHoldingsList(holdings)
  console.log("entrieslist setaccount", container.getEntriesList())

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

const _getAccountContainer = (addressCache, address) => {

  let entry = addressCache.get(address)
  console.log('entry', entry)

  let container

  if(entry){
    container = account_pb.AccountContainer.deserializeBinary(entry[address])
  } else {
    container = new account_pb.AccountContainer()
  }
  return container
}



const _getAccountFromContainer = (container, publicKey) => {
  console.log("get entry con", container)
  container.getEntriesList().forEach(entry => {
    console.log("found entry", entry.getPublicKey())
    if(entry.getPublicKey() == publicKey){
      return entry
    } else {
      console.log(publicKey + " was not found in container.")
      return null
    }
  })
}

module.exports = {
  setAccount,
  getAccount
}