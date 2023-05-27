///SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
	uint public x;
	
	constructor(uint _x) {
		x = _x;
	}
	
	function modify(uint _x) public {
		x = _x;
	}
}