import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AnotherERC721 } from "../typechain";
import { ethers } from "hardhat";
import { expect } from "chai";
import { BigNumber } from "ethers";



describe("AnotherERC721", function () {

  let owner: SignerWithAddress;
  let some: SignerWithAddress;
  let contract: AnotherERC721;

  const uri: string = "https://bafybeifymsickavgpotmfzlkywllyfricf44ovytdwnwvsttdiyytycagi.ipfs.nftstorage.link/metadata/";
  const id0 = BigNumber.from(0);
  const id1 = BigNumber.from(1);
  
  const zero_address = "0x0000000000000000000000000000000000000000";


  beforeEach(async () => {

    [owner, some] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory("AnotherERC721");
    contract = <AnotherERC721>(await contractFactory.deploy());
    await contract.deployed();

  });


  describe("function name", () => {

    it("name", async () => {
      const tokenName = await contract.name();
      expect(tokenName).to.equal("ByeBye");
    });
      
  });


  describe("function symbol", () => { 
    
    it("symbol", async () => {
      const tokenSymbol = await contract.symbol();
      expect(tokenSymbol).to.equal("BB");
    });

  });


  describe("function mintTo", function () {

    it("Should revert if not owner", async () => {
        const promise = contract.connect(some).mintTo(owner.address, id0); 
        await expect(promise).to.be.revertedWith('Ownable: caller is not the owner');
    });


    it("Only owner can mint", async () => {
        const promise = contract.mintTo(some.address, id1);
        await expect(promise).to.not.be.revertedWith('Ownable: caller is not the owner');
    });


    it("Should emit transfer event", async () => {
        const promise = contract.connect(owner).mintTo(some.address, id1);
        await expect(promise).to.emit(contract, "Transfer").withArgs(zero_address, some.address, id1);
    });


    it("Should mint token for address", async () => {
        await contract.setBaseTokenURI(uri);
        await contract.mintTo(some.address, id1);
        const returnedURI = await contract.connect(some).tokenURI(id1);
        expect(uri + id1).to.equal(returnedURI);
    });

  });


  describe("function setBaseTokenURI", () => { 

    
    it("Should revert if not owner", async () => {
        const promise = contract.connect(some).setBaseTokenURI(uri);
        await expect(promise).to.be.revertedWith('Ownable: caller is not the owner');
    });


    it("Only owner can set base uri", async () => {
        const promise = contract.setBaseTokenURI(uri);
        await expect(promise).to.not.be.revertedWith('Ownable: caller is not the owner');
    });


  });


});
