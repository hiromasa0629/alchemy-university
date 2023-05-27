import { ethers } from "hardhat";
import dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY: string = process.env.TESTNET_PRIVATE_KEY!;

/**
 * Deploy counter contract
 */
async function deployCounter() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.deployed();
	
  console.log(`Counter deployed to: ${counter.address}`);
}

async function deployFaucet() {
	const Faucet = await ethers.getContractFactory("Faucet");
	const faucet = await Faucet.deploy();
	
	await faucet.deployed();
	
	console.log(`Faucet deployed to: ${faucet.address}`);
}

async function deployModifyValue() {
	const ModifyValue = await ethers.getContractFactory("ModifyValue");
	const modifyValue = await ModifyValue.deploy();
	
	await modifyValue.deployed();
	
	console.log(`ModifyValue deploy to: ${modifyValue.address}`);
}

async function main() {
	await deployModifyValue();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
