import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { ModifyVariable } from "../typechain-types";

describe("TestModifyVariable", function () {
	let modifyValue: ModifyVariable;
	let ca: string;
	
	this.beforeAll(async function () {
		const ModifyValue = await ethers.getContractFactory("ModifyVariable");
		modifyValue = await ModifyValue.deploy(10);
		
		await modifyValue.deployed();
		
		ca = modifyValue.address;
	});
	
	it("should deploy a contract with initial value 10", async function () {
		assert.equal((await modifyValue.x()).toNumber(), 10);
	});
	
	it("should modify the value to 20", async function () {
		await modifyValue.modify(20);
		
		assert.equal((await modifyValue.x()).toNumber(), 20);
	})
})