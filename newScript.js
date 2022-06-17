const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { abi } = require('./contract');
const address = '0x79BAAbA8eF2F4661306e5e31bBf6cA87686c68be';
const privateKey = '';
const moralisUrl =
  'https://polygon-mainnet.g.alchemy.com/v2/8lVyeqfXiotIGQRtXNlooUjmEjJDvg7y';
const fs = require('fs');

const list = require('./pantherWhitelist.json');

const init = async () => {
  const provider = new Provider(privateKey, moralisUrl);
  // @ts-ignore
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(abi, address, { gas: 100000 });
  const gasPrice = (await web3.eth.getGasPrice()) * 2.5;
  console.log(gasPrice);
  try {
    // console.log('sending');
    // const txn = await contract.methods.mintOne(list[102].wallets, 1, 1).send({
    //   from: '0x59109E77C2d9eE837768425C4f37e6BdfF2cFaD1',
    //   gasPrice,
    // });
    // console.log(txn);
  } catch (err) {
    console.log(err);
  }
};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
