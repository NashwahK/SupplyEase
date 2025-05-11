const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const SupplyCIDStorage = await hre.ethers.getContractFactory("SupplyCIDStorage");
  
    // Deploy the contract and wait for it to be mined
    const supplyCIDStorage = await SupplyCIDStorage.deploy();
    await supplyCIDStorage.waitForDeployment(); // New Hardhat versions use this
  
    const address = await supplyCIDStorage.getAddress();
    console.log("SupplyCIDStorage contract deployed to:", address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
      