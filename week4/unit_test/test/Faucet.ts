import { setBalance, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Wallet } from '@ethersproject/wallet'
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Faucet, Faucet__factory } from '../typechain-types';

describe("Faucet", function () {
	let Faucet: Faucet__factory;
	let faucet: Faucet;
	let owner: SignerWithAddress;
	let randomWallet: SignerWithAddress;
	
	async function deployContract () {
		Faucet = await ethers.getContractFactory("Faucet");
		faucet = await Faucet.deploy();
		await faucet.deployed();
		
		[owner, randomWallet] = await ethers.getSigners();
		
		// fund randomWallet
		await setBalance(randomWallet.address, ethers.utils.parseEther("1"));
		await setBalance(faucet.address, ethers.utils.parseEther("1"));
	};
	
	describe("Contract deployment", function () {
		this.beforeAll(async () => await deployContract());
		
		it('should deploy contract and set owner correctly', async function () {
			expect((await faucet.owner()) === owner.address).to.equal(true);
		})
	})
	
	describe("Reverted transactions", function () {
		this.beforeAll(async () => await deployContract());
		
		it('should not allow withdrawals above .1 ETH at a time', async function () {
			await expect(faucet.withdraw(ethers.utils.parseEther("0.11"))).to.be.reverted;
		});
		
		it('should not allow withdrawAll if not owner', async function () {
			await expect(faucet.connect(randomWallet).withdrawAll()).to.be.reverted;
		});
		
		it('should not allow selfdustruct if not owner', async function () {
			await expect(faucet.connect(randomWallet).destroyFaucet()).to.be.reverted;
		})
	})
	
	describe("Functionality tests", () => {
		this.beforeAll(async () => await deployContract());
		
		it('should withdraw 0.05 ETH', async () => {
			const initial = await ethers.provider.getBalance(faucet.address);
			const amountToWithdraw = ethers.utils.parseEther("0.05");
			await faucet.connect(randomWallet).withdraw(amountToWithdraw);
			const final = await ethers.provider.getBalance(faucet.address);
			
			expect(final).to.equal(initial.sub(amountToWithdraw));
		})
		
		it('should withdraw all funds', async () => {
			await faucet.connect(owner).withdrawAll();
			const final = await ethers.provider.getBalance(faucet.address);
			
			expect(final).to.equal(0);
		})
	})
})