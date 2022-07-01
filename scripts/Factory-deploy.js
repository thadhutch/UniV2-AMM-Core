const { ethers } = require("hardhat");

// npx hardhat run scripts/Factory-deploy.js --network rinkeby

async function main() {
  const feeToSetterAddress = "0x8289d6a2eD28E4B52eDF32662ECd54e7033F76B1";

  const BevoswapV2Factory = await ethers.getContractFactory(
    "BevoswapV2Factory"
  );
  const bevoswapV2Factory = await BevoswapV2Factory.deploy(feeToSetterAddress);
  await bevoswapV2Factory.deployed();

  console.log("Bevoswap Factory was deployed to: ", bevoswapV2Factory.address);

  const Token1 = await ethers.getContractFactory("Token1");
  const token1 = await Token1.deploy();
  await token1.deployed();

  const Token2 = await ethers.getContractFactory("Token2");
  const token2 = await Token2.deploy();
  await token2.deployed();
  const tokenAddress1 = token1.address;
  const tokenAddress2 = token2.address;
  console.log("Token1 Address: ", tokenAddress1);
  console.log("Token2 Address: ", tokenAddress2);

  await bevoswapV2Factory.createPair(tokenAddress1, tokenAddress2);
  console.log("Pair was created");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
