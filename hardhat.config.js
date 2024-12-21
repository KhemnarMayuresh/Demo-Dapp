require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    sepolia: {
      url: process.env.REACT_APP_INFURA_RPC_URL,
      accounts: [process.env.REACT_APP_TESTNET_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: "573IB28XF5DPC81ZFRZIT36GY8V3NRT25A",
  },
};
