const { isValidProvider } = require('@truffle/hdwallet-provider');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');


const provider = new HDWalletProvider(
  process.env.ACCOUNT_MNEMONIC,
  'https://rinkeby.infura.io/v3/' + process.env.INFURA_KEY,
);

const web3 = new Web3(provider);

const deploy = async() => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(JSON.stringify(abi, null, 2));
  console.log('Contract deployed to', result.options.address);

  // prevent hanging the deployemnt
  provider.engine.stop();
};

deploy();