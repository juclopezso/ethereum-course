// deploy code will go here
const { isValidProvider } = require('@truffle/hdwallet-provider');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  process.env.ACCOUNT_MNEMONIC,
  'https://rinkeby.infura.io/v3/' + process.env.INFURA_KEY,
);

const web3 = new Web3(provider);

const deploy = async() => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  // interface is the ABI of the contract
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello Wod']})
    .send({ gas: '1000000', from: accounts[0] });

  // print the address where is deployed
  console.log('Contract deployed to', result.options.address);

  // prevent hanging the deployemnt
  provider.engine.stop();
};

deploy();