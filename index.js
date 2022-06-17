const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { abi } = require('./contract');
const address = '0x79BAAbA8eF2F4661306e5e31bBf6cA87686c68be';
const privateKey = '';
const moralisUrl =
  'https://polygon-mainnet.g.alchemy.com/v2/8lVyeqfXiotIGQRtXNlooUjmEjJDvg7y';

const list = require('./pantherWhitelist.json');

const init = async () => {
  const provider = new Provider(privateKey, moralisUrl);
  // @ts-ignore
  const web3 = new Web3(provider);

  const contract = new web3.eth.Contract(abi, address, { gas: 80000 });
  for (let i = 5; i < list.length; i++) {
    const gasPrice = await web3.eth.getGasPrice();
    const gwei = gasPrice / 1000000000;
    // console.log(gwei);
    if (gwei > 400) {
      console.log('skipped', list[i].wallets);
      continue;
    }
    try {
      console.log(`minting ${i} token`);
      const txn = await contract.methods.mintOne(list[i].wallets, 1, 1).send({
        from: '0x59109E77C2d9eE837768425C4f37e6BdfF2cFaD1',
        gasPrice: gasPrice,
      });
      console.log(txn);
    } catch (err) {
      console.log(err);
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
