// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Color is ERC721Enumerable{
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;
  address public marketplace;

  struct Item {
    uint256 id;
    address creator;
    string color;//string uri;
  }

  mapping(uint256 => Item) public Items; //id => Item
  mapping(string => bool) _colorExists;

  // DELETE: string[] public colors;
  // DELETE: mapping (uint256 => uint256) public tokenIdToPrice;
  // DELETE: event NftBought(address _seller, address _buyer, uint256 _price);

  constructor () ERC721("Color", "COLORS") {}

  function mint(string memory _hexColor) public returns (uint256){
    //TODO: restrict ownership to a admin
    require(!_colorExists[_hexColor], "Color already exists!");
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    // DELETE: colors.push(_color);
    // DELETE: uint _id = colors.length;
    _mint(msg.sender, newItemId);
    approve(marketplace, newItemId);
    _colorExists[_hexColor] = true; //_setTokenURI(newItemId, tokenURI);

    Items[newItemId] = Item({
      id: newItemId, 
      creator: msg.sender,
      color: _hexColor
    });
    return newItemId;
  }

  function setMarketplace(address market) public {
    //require(msg.sender ==);
    marketplace = market;
  }

  // DELETE:
  // function allowBuy(uint256 _tokenId, uint256 _price) external {
  //       require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
  //       require(_price > 0, 'Price zero');
  //       tokenIdToPrice[_tokenId] = _price;
  //   }

  //   function disallowBuy(uint256 _tokenId) external {
  //       require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
  //       tokenIdToPrice[_tokenId] = 0;
  //   }
    
  //   function buy(uint256 _tokenId) external payable {
  //       uint256 price = tokenIdToPrice[_tokenId];
  //       require(price > 0, 'This token is not for sale');
  //       require(msg.value == price, 'Incorrect value');
        
  //       address seller = ownerOf(_tokenId+1);
  //       _transfer(seller, msg.sender, _tokenId+1);
  //       tokenIdToPrice[_tokenId] = 0; // not for sale anymore
  //       payable(seller).transfer(msg.value); // send the ETH to the seller

  //       emit NftBought(seller, msg.sender, msg.value);
  //   }

}

// TODO:
//quando for fazer o mint automaticamente dar o approval ao marketplace -> economizar gas