const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { abi } = require('./contract');
const address = '0xbf7A143371a5001A88EC021C8921fEe7d3f8743d';
const privateKey = '';
const moralisUrl =
  'https://speedy-nodes-nyc.moralis.io/39f9e12bf020c85e5091c894/polygon/mumbai';

const init = async () => {
  const provider = new Provider(privateKey, moralisUrl);
  // @ts-ignore
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(abi, address, { gas: 1000000 });
  for (let i = 0; i < 10; i++) {
    try {
      console.log(`minting ${i} token`);
      const txn = await contract.methods.mintOne('', 1, 1).send({ from: '' });
      console.log(txn);
    } catch (err) {
      console.log(`error in minting ${i} token`);
    }
  }
};
init();
