// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV2 is Initializable {
	uint public numSodas;
	address public owner;
	mapping(address => uint) public purchases;
	
	function initialize(uint _numSodas) public initializer {
		numSodas = _numSodas;
		owner = msg.sender;
	}
	
	function purchaseSoda() public payable {
		require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda!");
		require(numSodas > 0, "Sold out");
		numSodas--;
		purchases[msg.sender]++;
	}
	
	function addSodas(uint sodas) external onlyOwner {
		require(sodas > 0, "Cannot add zero sodas");
		numSodas += sodas;
	}
	
	function withdrawProfits() external onlyOwner {
		(bool success, ) = payable(msg.sender).call{ value: address(this).balance }("");
		require(success, "Withdraw failed");
	}
	
	function setNewOwner(address _newOwner) public onlyOwner {
		owner = _newOwner;
	}
	
	modifier onlyOwner {
		require(msg.sender == owner, "Only Owner");
		_;
	}
	
}