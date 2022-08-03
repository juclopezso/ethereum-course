import './App.css';
import web3 from './web3'
import lottery from './lottery';
import { useEffect, useState } from 'react';


function App() {

  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState(null);
  
  const getAccounts = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
  }

  const getManager = async() => {
    // { from: account[0] not } not needed, the provider already set the account
    const manager = await lottery.methods.manager().call();
    setManager(manager);
  }

  const getPlayers = async() => {
    const players = await lottery.methods.getPlayers().call();
    setPlayers(players);
  }

  const getBalance = async() => {
    const balance = await web3.eth.getBalance(lottery.options.address);
    setBalance(balance);
  }

  useEffect(() => {
    // console.log("Web3 version", web3.version);
    getAccounts();
    getManager();
    getPlayers();
    getBalance();
  }, [])

  const handleForm = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, 'ether'),
      });
      // fetch the new players and balance
      getPlayers();
      getBalance();
    } catch (error) {
      console.error(error); 
    } finally {
      setLoading(false);
    }
  }

  const handlePickWinner = async() => {
    try {
      setMessage('Waiting for transaction success...');
      // the method below does not return thw winner
      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });
      setMessage('A winner has been picked! Check your balance...');
      // fetch the new players and balance
      getPlayers();
      getBalance();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by <b>{ manager }</b></p>
      <p>There are currently <b>{ players.length }</b> people entered, competing to win <b>{ web3.utils.fromWei(balance, 'ether') }</b> ether!</p>
      <hr />
      <h4>Wanna try luck?</h4>
      <form onSubmit={ handleForm }>
        <div>
          <label>Amount of ether to enter</label>
          <input 
            type="number"
            value={ amount }
            onChange={ e => setAmount(e.target.value) }
          />
        </div>
        <button type='submit'>Enter</button>
      </form>
      <hr />
      {
        accounts.includes(manager) &&
        <div>
          <h4>Time to pick a winner?</h4>
          {
            message
            ? <p>{ message }</p>
            : <button onClick={ handlePickWinner }>Pick Winner</button>
          }
        </div>
      }
    </div> 
  );
}

export default App;
