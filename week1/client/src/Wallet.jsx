import { useState } from "react";
import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { toHex } from 'ethereum-cryptography/utils'

function Wallet({ address, setAddress, balance, setBalance, privAddr, setPrivAddr }) {
	
	const [amount, setAmount] = useState(0);
	const [wallet, setWallet] = useState("");

	const handleGenerateWallet = async () => {
		
		const priv = secp256k1.utils.randomPrivateKey();
		const ethAddr = getEthAddress(secp256k1.getPublicKey(priv));
		setAddress(`0x${ethAddr}`);
		setPrivAddr(priv);
		const { data: { balance } } = await server.post(`generate`, { body: { amount: amount, ethAddr } });
		setBalance(balance);
	}
	
  async function onChange(evt) {
    const address = evt.target.value;
    setWallet(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Generate a wallet below" value={wallet} onChange={onChange} />
      </label>

      <div className="balance">Balance: {balance}</div>
			
			{
				!address && (
					<>
						<label>
							Amount
							<input type="number" placeholder="Type an amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
						</label>
						
						<button onClick={handleGenerateWallet}>
							Generate wallet
						</button>
					</>
				)
			}
			
			{
				address && (
					<>
						<div>My</div>
						<div>Ethereum address: {address}</div>
						<div>Private key: {privAddr}</div>
					</>
				)
			}
    </div>
  );
}

export default Wallet;

function getEthAddress(publicKey) {
	const hash = keccak256(publicKey.slice(1, publicKey.length));
	return (toHex(hash.slice(-20)));
}
