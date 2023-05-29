async function run() {
    const { create } = await import('ipfs-http-client');
    const ipfs = create({ url: "http://127.0.0.1:5001/api/v0" });
		
		console.log(await ipfs.config.getAll());
    
    // we added three attributes, add as many as you want!
    const metadata = {
        path: '/',
        content: JSON.stringify({
            name: "Smol",
            attributes: [
							{
									"trait_type": "Peace",
									"value": "10" 
							},
							{
									"trait_type": "Love",
									"value": "100"
							},
							{
									"trait_type": "Web3",
									"value": "1000"
							}
            ],
            // update the IPFS CID to be your image CID
            image: "QmZcAHcjzpvTHmCzsTuDLrZXHtHAFoMDQLxEQiTiUKqcUw",
            description: "Smol 156"
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

    process.exit(0);
}

run();