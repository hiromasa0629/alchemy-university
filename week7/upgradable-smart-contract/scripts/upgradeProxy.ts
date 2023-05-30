import { ethers, upgrades } from "hardhat";

const proxyAddress = "0x99468a1900a691e5DcC7401A38d259D34B22eA63";

async function main() {
	const VendingMachineV2 = await ethers.getContractFactory("VendingMachineV2");
	const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);
	await upgraded.deployed();
	
	const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);
	
	console.log(`The current contract owner is: ${await upgraded.owner()}`);
	console.log(`Implementation contract address: ${implementationAddress}`);
}

main()