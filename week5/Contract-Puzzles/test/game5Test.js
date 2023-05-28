const { loadFixture, setBalance } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
	
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
		const threshold = '0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf';
		let randomwWallet;
		
		while (1) {
			randomwWallet = ethers.Wallet.createRandom().connect(ethers.provider);
			const walletBN = ethers.BigNumber.from(randomwWallet.address);
			const thresholdBN = ethers.BigNumber.from(threshold);
			//walletBigNumber < thresholdBigNumber
			if (walletBN.lt(thresholdBN)) break ;
		}
		
		// Fund randomWallet with 1 ETH
		await setBalance(randomwWallet.address, ethers.utils.parseEther("1"));
    await game.connect(randomwWallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
