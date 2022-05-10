import { task } from "hardhat/config";




task("mintTo", "Mints from the NFT contract")
  .addParam("from", "contract address") 
  .addParam("to", "The address to receive a token")
  .addParam("id", "Unique token identifier")
  .setAction(async (taskArgs, hre) => {
	
    const contract = await hre.ethers.getContractAt("AnotherERC721", taskArgs.from);
	  await contract.mintTo(taskArgs.to, taskArgs.id, { gasLimit: 500_000, });

    console.log(`from address ${taskArgs.from}`);
    console.log(`to address ${taskArgs.to}`);
});