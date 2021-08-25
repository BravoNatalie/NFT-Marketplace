const Color = artifacts.require("Color");
const ColorMarketplace = artifacts.require("ColorMarketplace");

module.exports = async function(deployer) {
  await deployer.deploy(Color);

  const token = await Color.deployed()

  await deployer.deploy(ColorMarketplace, token.address)

  const market = await ColorMarketplace.deployed()

  await token.setMarketplace(market.address)
};
