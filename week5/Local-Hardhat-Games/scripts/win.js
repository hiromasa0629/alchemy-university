// add the game address here and update the contract name if necessary
const gameAddr = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
const contractName = "Game5";

async function main() {
    // attach to the game
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // do whatever you need to do to win the game here:
		
		const giveMeAllowanceTx = await game.giveMeAllowance(50000);
		await giveMeAllowanceTx.wait();
		const mintTx = await game.mint(10000);
		await mintTx.wait();
		const tx = await game.win();
    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
