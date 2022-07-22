// compile code will go here
const path = require('path'); 
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// read the raw source code
const source = fs.readFileSync(inboxPath, 'utf8');

// interface: ABI -> like bridge between contract and javascript

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
 
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Inbox.sol'
].Inbox;