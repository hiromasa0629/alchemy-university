/// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

interface IContract {
	function attempt() external;
}

contract Relay {
	address public cont;
	
	constructor(address _cont) {
		cont = _cont;
	}
	
	function attemptWinner() external {
		IContract(cont).attempt();
	}
}