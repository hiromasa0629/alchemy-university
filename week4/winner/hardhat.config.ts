import { HardhatUserConfig } from "hardhat/config";
import dotenv from 'dotenv';
import "@nomicfoundation/hardhat-toolbox";

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
