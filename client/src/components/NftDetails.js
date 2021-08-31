import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Web3 from 'web3';

import { selectedNft, removeSelectedNft,} from "../redux/actions/nftActions";


const NftDetails = () => {

  const { nftId } = useParams();
  const marketplaceContract = useSelector((state) => state.allNft.marketplaceContract);
  const account = useSelector((state) => state.allNft.account);
  let nft = useSelector((state) => state.nft);
  let nftItem = useSelector((state) => state.allNft.nft.filter(nft => nft.tokenId === nftId));
  const { image, name, price, owner, creator,  description, tokenId, saleId, isForSale, isSold } = nft;
  const dispatch = useDispatch();


  useEffect(() => {
    if (nftId && nftId !== "" && nftItem) dispatch(selectedNft(nftItem[0]));
    return () => {
      dispatch(removeSelectedNft());
    };
  }, [nftId]);

  async function putForSale(id, price) {
    try {
      // const itemIdex = getItemIndexBuyTokenId(id);

      // const marketAddress = ArtMarketplace.networks[1337].address;
      // await artTokenContract.methods.approve(marketAddress, items[itemIdex].tokenId).send({from: accounts[0]});

      const receipt = await marketplaceContract.methods.putItemForSale(id, price).send({gas: 210000, from: account});
      console.log(receipt);
      

    } catch (error) {
      console.error("Error, puting for sale: ", error);
      alert("Error while puting for sale!");
    }
  }

  async function buy(saleId, price) {
    try {
      const receipt = await marketplaceContract.methods.buyItem(saleId).send({gas: 210000, value: price, from: account});
      console.log(receipt);
      const id = receipt.events.itemSold.id; ///saleId
      


    } catch (error) {
      console.error("Error, buying: ", error);
      alert("Error while buying!");
    }
  }

  return (
    <div className="ui grid container">
      {Object.keys(nft).length === 0 ? (
        <div>...CARREGANDO</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider"></div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{name}</h1>
                {isForSale && 
                  <h2>
                    <a className="ui teal tag label">ETH {Web3.utils.fromWei(String(price), 'ether')}</a>
                  </h2>
                }
                <h3 className="ui brown block header">Artista: {creator.slice(0,7)}...{creator.slice(-4)}</h3>
                <h3 className="ui brown block header">Dono: {owner.slice(0,7)}...{owner.slice(-4)}</h3>
                <p>{description}</p>
                {(owner === account && !isForSale) &&
                  <>
                  <div className="ui vertical animated button" tabIndex="0" onClick={() => putForSale(tokenId, 200)}>
                    <div className="visible content">VENDER</div>
                  </div>
                  <div className="two wide field">
                    <input type="text" name="price" placeholder="Preço" />
                  </div>
                  </>
                  
                }
                {(owner !== account && isForSale) &&
                  <div className="ui vertical animated button" tabIndex="0" onClick={() => buy(saleId, 200)}>
                    <div className="hidden content">
                      <i className="shop icon"></i>
                    </div>
                    <div className="visible content">COMPRAR</div>
                  </div>
                }                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NftDetails;
