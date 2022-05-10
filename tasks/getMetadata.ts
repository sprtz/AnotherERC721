import { task } from "hardhat/config";



task("getMetadata", "Fetches the token metadata for the given token ID")
  .addParam("for", "For token address")
  .addParam("id", "The tokenID to fetch metadata for")
  .setAction(async (taskArgs, hre) => {

    const contract = await hre.ethers.getContractAt("AnotherERC721",taskArgs.for);
	const response = await contract.tokenURI(taskArgs.tokenId, { gasLimit: 500_000, });
	
	const metadata_url = response;
	console.log(`Metadata URL: ${metadata_url}`);

	const metadata = await fetch(metadata_url).then(res => res.json());
	console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`);
});