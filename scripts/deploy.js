// import { ethers } from "ethers";
const { ethers } = require("hardhat");
const fs = require('fs')
const path = require("path")

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const ArtTokenContract = await ethers.deployContract("ArtToken");
  // const ArtToken = await ethers.getContractFactory("ArtToken");
  // const ArtTokenContract = await ArtToken.deploy();
  console.log("ArtToken Contract deployed at:", ArtTokenContract.address);

  const ArtMarketplace = await ethers.getContractFactory("ArtMarketplace");
  const ArtMarketplaceContract = await ArtMarketplace.deploy(ArtTokenContract.address);
  console.log("ArtMarketplace Contract deployed at:", ArtMarketplaceContract.address);

  let setMark = await ArtTokenContract.setMarketplace(ArtMarketplaceContract.address);
  console.log('set marketplace on art Token ', setMark.hash);

  fs.writeFileSync('./client/src/config/contract-data.json', JSON.stringify({
    token: {
      address: ArtTokenContract.address,
      abi: getTheAbi("ArtToken")
    },
    market: {
      address: ArtMarketplaceContract.address,
      abi: getTheAbi("ArtMarketplace")
    }
  }))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

const getTheAbi = (contractName) => {
  try {
    const dir = path.resolve(
      __dirname,
      "../artifacts/contracts/" + contractName + ".sol/" + contractName + ".json"
    )
    const file = fs.readFileSync(dir, "utf8")
    const json = JSON.parse(file)
    const abi = json.abi

    return abi
  } catch (e) {
    console.log(`e`, e)
  }
}