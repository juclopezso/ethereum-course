// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli'); // ganache creates a set of accounts to test with in an unlocked state
const Web3 = require('web3'); // Web3 is a constructor function that's why it's capitalized
// Web3 v.0.x.x does not support async/await
// each instance of web3 can connect to a different ethereum network
// provider is like a gateway to the ethereum network
const web3 = new Web3(ganache.provider()); // instance of web3 connect to ganache

const { abi, evm } = require('../compile');


// mocha is a test running framework
// to run mocha test add this to the package.json in the scripts section: "test": "mocha"
// then run: npm run test

let accounts;
let inbox;
const initMessage = 'Hi there (constructor arguments)';

beforeEach(async() => {
  // get a list of all accounts

  // almost every function in web3 is async
  // promise version:
  // web3.eth.getAccounts()
  //   .then(fetchedAccounts => {
  //     console.log(fetchedAccounts);
  //   });

  // async/await version:
  accounts = await web3.eth.getAccounts();

  // use one of the accounts to deploy the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [initMessage],
    })
    .send({ from: accounts[0], gas: '1000000' });

});

describe('Dummy', () => { 
  it('deploys a contract', () => {
    // test if contract was deployed by checking if it has an address assigned
    assert.ok(inbox.options.address); // value exists
  });

  it('has a default message', async() => {
    // call() instant read data of a contract
    const message = await inbox.methods.message().call();
    assert.equal(message, initMessage);
  });

  it('can change message', async() => {
    const newMessage = 'New message';
    // send() write data to a contract
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  })

});
