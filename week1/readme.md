## ECDSA Node

- [My way of tackling](#my-way-of-tackling-200-secp256k1)

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

## My way of tackling (2.0.0 secp256k1)

1. Generate a random wallet in frontend and save the eth address in the backend with amount
2. Everytime a user wants to send a transaction
	- Sign the transaction with private key (private key is temporary and will be lost with every reload)
	- Recover the public address from the signature
	- Send the `messageHash`, `public address` and `signature` to the backend
	- verify the signature with public address using secp256k1
	- derive eth address from the public address
	- check for existing of the eth address and do the plus minus operation
	