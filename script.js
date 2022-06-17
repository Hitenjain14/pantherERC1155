//@ts-nocheck
const Web3 = require('web3');

const { abi } = require('./contract');
const address = '0x79BAAbA8eF2F4661306e5e31bBf6cA87686c68be';
const privateKey = '';
const userAddress = '0x59109E77C2d9eE837768425C4f37e6BdfF2cFaD1';
const moralisUrl =
  'https://speedy-nodes-nyc.moralis.io/39f9e12bf020c85e5091c894/polygon/mainnet';
const list = require('./pantherWhitelist.json');

const init = async () => {
  const provider = new Web3.providers.HttpProvider(moralisUrl);
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(abi, address);

  const id = await web3.eth.net.getId();
  for (let i = 102; i < 106; i++) {
    try {
      console.log(`minting ${i} token`);
      const txn = contract.methods.mintOne(list[i].wallets, 1, 1);
      const gas = await txn.estimateGas({ from: userAddress });
      const data = txn.encodeABI();
      const nonce = await web3.eth.getTransaction(userAddress);

      const signedTxn = await web3.eth.accounts.signTransaction(
        {
          to: address,
          data,
          gas,
          nonce,
          chainId: id,
        },
        privateKey
      );
      const receipt = await web3.eth.sendTransaction(signedTxn.rawTransaction);
      console.log(receipt);
    } catch (err) {
      console.log(err);
    }
  }
};

init();
