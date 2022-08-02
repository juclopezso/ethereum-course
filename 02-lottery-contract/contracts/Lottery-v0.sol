pragma solidity ^0.4.17;

contract Lottery {

  address public manager;
  address[] public players;

  function Lottery() public {
    // global 'msg' variable its a special variable that is available in all contracts
    // msg.sender: who created the contract
    manager = msg.sender;
  }

  function getPlayers() public view returns (address[]) {
    return players;
  }

  // payable: expects ether to be sent to the contract
  function enter() public payable {
    // global function for validation if false, it will throw an error
    // msg.value: amount of ether (wei) sent to the contract
    // ether: helper function for ether conversion
    require(msg.value > 0.01 ether); 
    players.push(msg.sender);
  }

  function pickWinner() public onlyManager {
    uint winnerIndex = random() % players.length;
    // this.balance: amount of ether sent to the contract
    players[winnerIndex].transfer(this.balance);
    // reset the contract state (players array)
    players = new address[](0); // (0): initial size of 0
  }

  function returnFund() public onlyManager {
    // TODO
  }

  modifier onlyManager() {
    // only manager can call the function
    require(msg.sender == manager);
    _; // the code of the function will be executed here
  }

  // pseudo-random number generator
  function random() private view returns(uint) {
    // now: current time global function
    return uint(keccak256(block.difficulty, now, players));
  }


  // definitions
    // this.block.number: current block number
    // this.block.coinbase: address of the miner
    // this.block.timestamp: timestamp of the block
    // this.block.difficulty: difficulty of the block
    // this.block.gasLimit: gas limit of the block
    // this.block.gasUsed: gas used in the block
    // this.block.number: block number
    // this.block.coinbase: address of the miner
    // this.block.timestamp: timestamp of the block
    // this.block.difficulty: difficulty of the block
    // this.block.gasLimit: gas limit of the block
    // this.block.gasUsed: gas used in the block
    // this.block.number: block number
    // this.block.coinbase: address of the miner
    // this.block.timestamp: timestamp of the block
    // this.block.difficulty: difficulty of the block
    // this.block.gasLimit: gas limit of the block
    // this.block.gasUsed: gas used in the block
    // this.block.number: block number
    // this.block.coinbase: address of the miner
    // this.block.timestamp: timestamp of the block
    // this.block.difficulty: difficulty of the block
    // this.block.gasLimit: gas limit of the block
    // this.block.gasUsed: gas used in the block
    // this.block.number: block number
    // this.block.coinbase: address of the miner
    // this.block.timestamp: timestamp of the block
    // this.block.difficulty: difficulty of the block
    // this.block.gasLimit: gas limit of the block
    // this.block.gasUsed: gas used in the block
    // this.block.number: block number
    // this.block.coinbase: address of the miner
    // this.block.timestamp: timestamp of the block
    // this.block.difficulty: difficulty of the block
    // this.block.gasLimit: gas limit of the block
}