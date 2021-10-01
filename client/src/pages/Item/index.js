import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Web3 from "web3";

import { selectedNft, removeSelectedNft } from "../../redux/actions/nftActions";

import { useStyles } from "./styles.js";

const Item = () => {
  const classes = useStyles();

  const { nftId } = useParams();
  const marketplaceContract = useSelector(
    (state) => state.allNft.marketplaceContract
  );
  const account = useSelector((state) => state.allNft.account);
  let nft = useSelector((state) => state.nft);
  let nftItem = useSelector((state) =>
    state.allNft.nft.filter((nft) => nft.tokenId === nftId)
  );
  const {
    image,
    name,
    price,
    owner,
    creator,
    description,
    tokenId,
    saleId,
    isForSale,
    isSold,
  } = nft;
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

      const receipt = await marketplaceContract.methods
        .putItemForSale(id, price)
        .send({ gas: 210000, from: account });
      console.log(receipt);
    } catch (error) {
      console.error("Error, puting for sale: ", error);
      alert("Error while puting for sale!");
    }
  }

  async function buy(saleId, price) {
    try {
      const receipt = await marketplaceContract.methods
        .buyItem(saleId)
        .send({ gas: 210000, value: price, from: account });
      console.log(receipt);
      const id = receipt.events.itemSold.id; ///saleId
    } catch (error) {
      console.error("Error, buying: ", error);
      alert("Error while buying!");
    }
  }

  return (
    <div className={classes.pageItem}>
      {Object.keys(nft).length === 0 ? (
        <div>...CARREGANDO</div>
      ) : (
        <main>
          <header className={classes.pageHeader}>
            <Link to="/">
              <KeyboardBackspaceIcon fontSize="large" />
            </Link>
          </header>
          <section>
            <Grid container 
              spacing={0} 
              alignItems="center"
              justify="center"
            >
              <Grid item md={7} sm={7} xs={12}>
                <figure> 
                  <img className="ui fluid image" src={image} />
                </figure>
              </Grid>
              <Grid item md={5} sm={5} xs={12}>
                <fieldset>
                  <h1>{name}</h1>
                  <TextField
                    label="creator"
                    name="creator"
                    variant="filled"
                    margin="dense"
                    fullWidth
                    disabled
                    defaultValue={
                      creator.slice(0, 7) + "..." + creator.slice(-4)
                    }
                  />
                  <TextField
                    label="owner"
                    name="owner"
                    variant="filled"
                    disabled
                    fullWidth
                    margin="dense"
                    defaultValue={owner.slice(0, 7) + "..." + owner.slice(-4)}
                  />
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    variant="filled"
                    margin="dense"
                    disabled
                    fullWidth
                    defaultValue={description}
                  />
                  <TextField
                    label="price"
                    name="price"
                    variant="filled"
                    margin="dense"
                    defaultValue={Web3.utils.fromWei(String(price), "ether")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">ETH</InputAdornment>
                      ),
                    }}
                    fullWidth
                    disabled
                  />
                  {owner === account && !isForSale && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => putForSale(tokenId, 200)}
                    >
                      Sell
                    </Button>
                  )}
                  {owner !== account && isForSale && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => buy(saleId, 200)}
                    >
                      Buy
                    </Button>
                  )}
                </fieldset>
              </Grid>
            </Grid>
          </section>
        </main>
      )}
    </div>
  );
};

export default Item;
