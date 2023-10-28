require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        development: {
            url: "http://127.0.0.1:8545",
            chainId: 1337
        },
    }
};