const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { toHex, hexToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');


app.use(cors());
app.use(express.json());

const balances = {};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { recipient, amount, signature, msgHash, pubAddr } = req.body;
	signature.r = BigInt(signature.r);
	signature.s = BigInt(signature.s);
	if (!secp256k1.verify(signature, msgHash, pubAddr)) return res.status(400).send({ message: "Invalid transaction" });

	
	// Derive eth address from hex public address
	const sender = `0x${getEthAddress(hexToBytes(pubAddr))}`;
	if (!balances[sender]) return res.status(400).send({ message: "Invalid sender" });
	
  setInitialBalance(sender);
  setInitialBalance(recipient);
	
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.post("/generate", (req, res) => {
	const { body: { amount, ethAddr } } = req.body;
	
	balances[`0x${ethAddr}`] = +amount;
	console.log(balances);
	res.status(200).send({ amount: +amount });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function getEthAddress(publicKey) {
	const hash = keccak256(publicKey.slice(1, publicKey.length));
	return (toHex(hash.slice(-20)));
}