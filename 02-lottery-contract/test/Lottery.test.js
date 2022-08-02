const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });
});

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('allows an account to enter', async() => {
    await lottery.methods.enter().send({
      from: accounts[0],
      // value: amount in wei to send to the contract
      value: web3.utils.toWei('0.03', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    
    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length); // value that shoud be, value that is
  });

  it('allows multiple players or accounts to enter', async() => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.03', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.03', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.03', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    
    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length); 
  });

  it('requires a minimum amount of ether to enter', async() => {
    try {
      // if something goes wrong, it will throw an error
      await lottery.metods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.0001', 'ether') // could be 10 (wei)
      });
      // if the code below is excuted, it means that the test failed
      assert(false); // test will fail
    } catch(error) {
      // checks if there is an error
      assert(error); // checks truthyness of e
    }
  });

  it('only manager can pick a winner', async() => {
    try {
      await lotter.methods.pickWinner().send({
        from: accounts[1]
      }) 
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it('sends money to the winner and resets the players array', async() => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinner().send({ from: accounts[0] });

    const finalBalance = await web3.eth.getBalance(accounts[0]);

    // differencee will be less than the amount of ether sent to the contract because of gas
    const difference = finalBalance - initialBalance;
    assert(difference > web3.utils.toWei('1.8', 'ether'));

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    })

    assert.equal(0, players.length);

    // TODO: test if lottery contract balance is 0
  });
})