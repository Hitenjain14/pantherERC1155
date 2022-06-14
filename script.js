//@ts-nocheck
const Web3 = require('web3');

const { abi } = require('./contract');
const address = '0xbf7A143371a5001A88EC021C8921fEe7d3f8743d';
const privateKey = '';
const userAddress = '';
const moralisUrl =
  'https://speedy-nodes-nyc.moralis.io/39f9e12bf020c85e5091c894/polygon/mumbai';

const init = async () => {
  try {
    const provider = new Web3.providers.HttpProvider(moralisUrl);
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, address);

    const id = await web3.eth.net.getId();
    for (let i = 0; i < 10; i++) {
      console.log(`minting ${i} token`);
      const txn = contract.methods.mintOne('', 1, 1);
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
    }
  } catch (err) {
    console.log(err.message);
  }
};

init();
