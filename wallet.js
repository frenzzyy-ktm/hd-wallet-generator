
const { ethers } = require("ethers");

function generateWallets(mnemonic, requestedCount = 1) {
  const MAX = 100;
  const count = Math.min(requestedCount, MAX);

  const wallets = [];

  for (let i = 0; i < count; i++) {
    const path = `m/44'/60'/0'/0/${i}`;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);

    wallets.push({
      index: i,
      address: wallet.address,
      privateKey: wallet.privateKey
    });
  }

  return wallets;
}

module.exports = { generateWallets };
