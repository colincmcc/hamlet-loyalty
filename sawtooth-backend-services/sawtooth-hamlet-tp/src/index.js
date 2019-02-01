const { TransactionProcessor } = require('sawtooth-sdk/processor')
var program = require('commander');
const HamletHandler = require('./handler')

program
  .version('0.1.0')
  .option('-h, --host [value]', 'Set validator host')
  .parse(process.argv);


const address = program.host
console.log(address)

const transactionProcessor = new TransactionProcessor(address)

transactionProcessor.addHandler(new HamletHandler())

transactionProcessor.start()

