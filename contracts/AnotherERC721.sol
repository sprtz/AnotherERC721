//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract AnotherERC721 is ERC721, Ownable {


  using Counters for Counters.Counter;

  Counters.Counter private currentTokenId;


  string public baseTokenURI;



  constructor() ERC721("ByeBye", "BB") {
    baseTokenURI = "";
  }



  function mintTo(
      address to,
      uint id)
      public
      onlyOwner
      returns (uint) 
   {
    _safeMint(to, id);
    return id;
   }



  function _baseURI()
      internal
      view
      virtual
      override
      returns (string memory)
   {
    return baseTokenURI;
   }



  function setBaseTokenURI(
      string memory _baseTokenURI)
      public
      onlyOwner
   {
    baseTokenURI = _baseTokenURI;
   }
}