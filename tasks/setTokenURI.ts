import { task } from "hardhat/config";



task("setTokenURI", "Sets the base token URI for the deployed smart contract")
  .addParam("address", "Token address")
  .addParam("uri", "The base of the tokenURI endpoint to set")
  .setAction(async (taskArgs, hre) => {

      const contract = await hre.ethers.getContractAt("AnotherERC721", taskArgs.address);
	    await contract.setBaseTokenURI(taskArgs.uri, { gasLimit: 500_000, });

      console.log(`from address ${ taskArgs.address }`);
      console.log(`to address ${ taskArgs.uri }`);
});