var HDWalletProvider = require('@truffle/hdwallet-provider');  // 导入模块
var mnemonic = "mesh danger frozen arena exchange reunion wheel protect east asset era cash";  //MetaMask的助记词。 

module.exports = {
  contracts_build_directory: './client/src/contracts',

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },


    goerli: {
      provider: () => new HDWalletProvider(mnemonic, "https://goerli.infura.io/v3/502548297ebd4fcda54cac79dc86f087"),
      network_id: "*",       // rinkeby's id
      gas: 5500000,        // rinkeby has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 10000,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets )
      port:8545
    },
  },
  live:{
    host:"127.0.0.1",
    port: 8545,
    network_id: "1655800227074",
  },
  compilers: {
    solc: {
      version: "^0.8.7",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  }
};