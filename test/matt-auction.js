const MattAuction = artifacts.require("./MattAuction.sol");
const Keyring = require('eth-simple-keyring');
const sigUtil = require('eth-sig-util');

contract("MattAuction", accounts => {
  it("can verify a bid signature", async () => {
    const mattAuctionInstance = await MattAuction.deployed();

    const account = {
      address: '0x708ef7f37f853314b40539a102c18141b491f790',
      privateKey: '0xa20d33a11f56d2ff8e1248ae07b494887f1274aac5a0e2e47683bf4ae43679f3',
    };
    const keyring = new Keyring([account.privateKey]);

    const types = {
      Bid: [
        { name: 'nft', type: 'uint256' },
        { name: 'bidderAddress', type: 'address' },
        { name: 'currencyTokenAddress', type: 'address' },
        { name: 'currencyTokenAmount', type: 'uint256' },
      ],
      EIP712Domain: [
        { name: '', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
    };
    const primaryType = 'Bid';
    const message = {
      nft: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      bidderAddress: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      currencyTokenAddress: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      currencyTokenAmount: '0x100',
    };
    const { nft, bidderAddress, currencyTokenAddress, currencyTokenAmount } = message;

    const typedMessage = {
      types,
      primaryType,
      domain: {
        name: 'MattAuction',
        version: '1',
        chainId: 1,
        verifyingContract: MattAuction.address,
      },
      message,
    };

    console.log(sigUtil.signTypedData.toString());
    const signature = sigUtil.signTypedData(keyring.wallets[0].privateKey, {
      data: typedMessage,
      version: 'V4',
    });

    console.log(`signature: ${signature}`);

    const verified = debug(await mattAuctionInstance.verifyBidSignature(nft, bidderAddress, currencyTokenAddress, currencyTokenAmount, signature));
    assert(verified, 'signature is verified');
  });
});

/**
 * 
const { ethers } = require("ethers");

const account = {
  address: '0x708ef7f37f853314b40539a102c18141b491f790',
  privateKey: '0xa20d33a11f56d2ff8e1248ae07b494887f1274aac5a0e2e47683bf4ae43679f3',
};
const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
const keyring = new Keyring([account.privateKey]);

const ethersProvider = new ethers.providers.Web3Provider(provider);
const signer = new ethers.Wallet(account.privateKey, ethersProvider);
const contract = new ethers.Contract(contractAddress, abi, signer);

const types = {
  Bid: [
    { name: 'nft', type: 'uint256' },
    { name: 'bidderAddress', type: 'address' },
    { name: 'currencyTokenAddress', type: 'address' },
    { name: 'currencyTokenAmount', type: 'uint256' },
  ],
  EIP712Domain: [
    { name: '', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
};
const primaryType = 'Bid';
const message = {
  nft: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  bidderAddress: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  currencyTokenAddress: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  currencyTokenAmount: '0x100',
};
const { nft, bidderAddress, currencyTokenAddress, currencyTokenAmount } = message;

console.dir(provider);
const typedMessage = {
  types,
  primaryType,
  domain: {
    name: 'MattAuction',
    version: '1',
    chainId: 1,
    verifyingContract: contractAddress,
  },
  message,
};

console.log(sigUtil.signTypedData.toString());
const signature = sigUtil.signTypedData(keyring.wallets[0].privateKey, {
  data: typedMessage,
  version: 'V4',
});

console.log(`signature: ${signature}`);

const verified = await contract.verifyBidSignature(nft, bidderAddress, currencyTokenAddress, currencyTokenAmount, signature);

  t.ok(verified);
});
**/



async function send(provider, opts) {
  return new Promise((res, rej) => {
    provider.sendAsync(opts, (err, result) => {
      if (err) { return rej(err); }
      res(result.result);
    });
  });
}

async function wait (ms) {
  return new Promise(res => setTimeout(res, ms | 5));
}
