const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
	const name = process.argv[2];
	const tree = new MerkleTree(niceList);
	
	const proof = tree.getProof(niceList.findIndex(n => n === name));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
		name,
		proof
  });

  console.log({ gift });
}

main();