
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

if (!process.env.PRIVATE_KEY) {
  throw new Error("define PRIVATE_KEY in .env first!");
}
if (!process.env.INFURA_APIKEY) {
  throw new Error("define INFURA_APIKEY in .env first!");
}
if (!process.env.ETHERSCAN_APIKEY) {
  throw new Error("define ETHERSCAN_APIKEY in .env first!");
}

module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_APIKEY
  },
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    rinkeby: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY],
        providerOrUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_APIKEY}`
      }),
      network_id: 4
    },
    mainnet: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY],
        providerOrUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_APIKEY}`
      }),
      network_id: 1
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0",
      docker: false,
      settings: { // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
      //  evmVersion: "byzantium"
    }
  }
};