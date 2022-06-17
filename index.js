const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { abi } = require('./contract');
const address = '';
const privateKey = '';
const moralisUrl =
  'https://speedy-nodes-nyc.moralis.io/e9251bb6176f4c0d110be505/polygon/mainnet';

const list = require('./pantherWhitelist.json');

const init = async () => {
  const provider = new Provider(privateKey, moralisUrl);
  // @ts-ignore
  const web3 = new Web3(provider);

  const contract = new web3.eth.Contract(abi, address, { gas: 80000 });
  for (let i = 0; i < list.length; i++) {
    const gasPrice = await web3.eth.getGasPrice();
    const gwei = gasPrice / 1000000000;
    console.log(gwei);
    if (gwei > 200) {
      console.log('skipped', list[i].wallets);
      continue;
    }
    try {
      console.log(`minting ${i} token`);
      const txn = await contract.methods
        .mintOne(list[i].wallets, 1, 1)
        .send({ from: '' });
      console.log(txn);
    } catch (err) {
      console.log(err.message);
      console.log(`error in minting ${i} token`);
    }
  }
};
init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
