import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
	networks: {
		sepolia: {
			url: process.env.ALCHEMY_SEPOLIA_RPC_URL,
			accounts: [process.env.TESTNET_PRIVATE_KEY!]
		}
	}
};

export default config;
