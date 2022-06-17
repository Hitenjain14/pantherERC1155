const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { abi } = require('./contract');
const address = '0x79BAAbA8eF2F4661306e5e31bBf6cA87686c68be';
const moralisUrl =
  'https://polygon-mainnet.g.alchemy.com/v2/8lVyeqfXiotIGQRtXNlooUjmEjJDvg7y';
const list = require('./pantherWhitelist.json');
const init = async () => {
  // @ts-ignore
  const web3 = new Web3(moralisUrl);

  const contract = new web3.eth.Contract(abi, address, { gas: 80000 });

  for (let i = 10; i < list.length; i++) {
    try {
      const b = await contract.methods.balanceOf(list[i].wallets, 1).call();
      console.log('b', b);
      if (b > 1) {
        console.log(list[i].wallets);
        console.log('mutliple', i);
      }
      if (b == 0) {
        console.log(i);
        break;
      }
    } catch (err) {
      console.log(err);
    }
  }
};

init();
