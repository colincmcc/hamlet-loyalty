const { TransactionProcessor } = require('sawtooth-sdk/processor')
const HamletHandler = require('./handler')
const address = process.argv[2] || 'tcp://127.0.0.1:4004'

const transactionProcessor = new TransactionProcessor(address)

transactionProcessor.addHandler(new HamletHandler())

transactionProcessor.start()

