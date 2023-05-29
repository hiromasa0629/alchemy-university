import { ethers } from "hardhat";

async function main() {
	const [deployer] = await ethers.getSigners();
	console.log("Deploying contracts with the account:", deployer.address);
	
	const weiAmount = (await deployer.getBalance()).toString();
  console.log("Account balance:", ethers.utils.formatEther(weiAmount));
	
	
  const factory = await ethers.getContractFactory("GoofyGoober");
	const contract = await factory.deploy();

  await contract.deployed();

  console.log(`GoofyGoober is deployed on: ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});