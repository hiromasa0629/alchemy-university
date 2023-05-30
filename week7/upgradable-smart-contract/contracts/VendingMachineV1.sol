// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV1 is Initializable {
	uint public numSodas;
	address public owner;
	
	function initialize(uint _numSodas) public initializer {
		numSodas = _numSodas;
		owner = msg.sender;
	}
	
	function purchaseSoda() public payable {
		require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda!");
		numSodas--;
	}
}