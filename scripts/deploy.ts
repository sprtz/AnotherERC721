import { ethers } from "hardhat";


async function main() {


  const factory = await ethers.getContractFactory("AnotherERC721");
  const token = await factory.deploy();


  await token.deployed();

  console.log("AnotherERC721 deployed to:", token.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});