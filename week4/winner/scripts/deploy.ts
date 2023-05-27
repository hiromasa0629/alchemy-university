import { ethers } from "hardhat";

async function main() {
	const Contract = await ethers.getContractFactory("Contract");
	const contract = await Contract.deploy();
	
	await contract.deployed();
	
	console.log(`Contract is deployed at ${contract.address}`);
	
  const Relay = await ethers.getContractFactory("Relay");
  const relay = await Relay.deploy(contract.address);

  await relay.deployed();

	console.log(`Relay is deployed at ${relay.address}`);
	
	const tx = await relay.attemptWinner();
	
	console.log(`Attempted winner at ${tx.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
