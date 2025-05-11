require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.VITE_INFURA_PROJECT_ID}`,
      accounts: [process.env.VITE_PRIVATE_KEY],
    },
  },
};
