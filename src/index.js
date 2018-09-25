const { TransactionProcessor } = require('sawtooth-sdk/processor')
const HamletHandler = require('./handler')
const address = 'tcp://127.0.0.1:4004'

const transactionProcessor = new TransactionProcessor(address)

transactionProcessor.addHandler(new HamletHandler())

transactionProcessor.start()

