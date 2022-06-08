pragma solidity ^0.4.17;


contract Inbox {

  string public message;

  function Inbox(string message) public {
    this.message = message;
  }

  function setMessage(string message) public {
    this.message = message;
  }

  // name / type / returns
  function getMessage() public view returns (string) {
    return this.message;
  }

  // types:
  // public: anyone can call this function
  // private: only this contract can call this function
  // view: tihis funtions returns data and does not modify the contracts data
  // constant: retuns data and dot not modify the contracts data
  // pure: function will not modify or even read the contracts data
  // payable: when some call this funtions they might send ehter along


}
