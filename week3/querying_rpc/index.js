const axios = require('axios');

const ALCHEMY_URL = "https://eth-mainnet.g.alchemy.com/v2/rd9Wxx0J2ZIgK-J7QM_MA5gy6tC5ay_2";

axios.post(ALCHEMY_URL, {
	jsonrpc: "2.0",
	id: 100,
	method: "eth_getBlockByNumber",
	params: [
    "0xb443", // block 46147
    false  // retrieve the full transaction object in transactions array
	]
}).then((res) => {
	console.log(res.data);
})

