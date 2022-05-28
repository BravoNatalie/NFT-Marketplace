import React, { useState } from "react";
import {useStyles} from "./styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {useSelector} from "react-redux";
import Card from "../../components/Card";
import Typography from "@material-ui/core/Typography";


const MyNFTs =()=> {
    const classes = useStyles();
    const nft = useSelector((state) => state.allNft.nft);
    const nftItem = useSelector((state) => state.allNft.nft);
    const account = useSelector((state) => state.allNft.account);
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
    const listItems =[];
   let filterByName=(nft,account)=>{
      return nft.filter(item=>item.owner == account);
    }
    console.log(filterByName(nft,account));
    const MyNfts =filterByName(nft,account);
    console.log(MyNfts);



    return (
        <box className={classes.homepage}>
            <section className={classes.MyNfts}>
                <Typography className={classes.title}>My NFTs</Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {MyNfts.map((MyNfts) => (
                        <Grid item key={MyNfts.tokenId}>
                            <Card {...MyNfts} />
                        </Grid>
                    ))}
                </Grid>
            </section>
        </box>
    );
};
export default MyNFTs;