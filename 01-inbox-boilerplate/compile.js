// compile code will go here
const path = require('path'); 
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// read the raw source code
const source = fs.readFileSync(inboxPath, 'utf8');

// module.exports = solc.compile(source, 1); // 1 is the number of contracts trying to compile
module.exports = solc.compile(source, 1).contracts[":Inbox"]; // just returns the Inbox.sol contract


// interface: ABI -> like bridge between contract and javascript