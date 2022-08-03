import Web3 from "web3";
 
window.ethereum.request({ method: "eth_requestAccounts" });
 
// gets the provider from the window object provided by metamask
const web3 = new Web3(window.ethereum);
 
export default web3;