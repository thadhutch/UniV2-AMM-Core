const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BevoSwap V2", function () {
  it("Should deploy the factory contract", async function () {
    const feeToSetterAddress = "0x8289d6a2eD28E4B52eDF32662ECd54e7033F76B1";

    const BevoswapV2Factory = await ethers.getContractFactory(
      "BevoswapV2Factory"
    );
    const bevoswapV2Factory = await BevoswapV2Factory.deploy(
      feeToSetterAddress
    );
    await bevoswapV2Factory.deployed();

    describe("Test Token Deployments + Pair Creation", function () {
      it("Should deploy the test tokens and create a pair", async function () {
        const Token1 = await ethers.getContractFactory("Token1");
        const token1 = await Token1.deploy();
        await token1.deployed();

        const Token2 = await ethers.getContractFactory("Token2");
        const token2 = await Token2.deploy();
        await token2.deployed();
        const tokenAddress1 = token1.address;
        const tokenAddress2 = token2.address;

        await bevoswapV2Factory.createPair(tokenAddress1, tokenAddress2);
      });
    });

    // wait until the transaction is mined
  });
});
