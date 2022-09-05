
import { useStyles } from "./styles.js";
import NFTbg from "./NFTbg.jpg"
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import getWeb3 from "../../utils/getWeb3";
import { api } from "../../services/api";

import ArtMarketplace from "../../contracts/ArtMarketplace.json";
import ArtToken from "../../contracts/ArtToken.json";

import {
    setNft,
    setAccount,
    setTokenContract,
    setMarketContract,
} from "../../redux/actions/nftActions";
import Card from "../../components/Card";
import {IconButton, TextField} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
const Product=()=>{
    const classes = useStyles();
    const nft = useSelector((state) => state.allNft.nft);
    const dispatch = useDispatch();

    useEffect(() => {
        let itemsList = [];
        const init = async () => {
            try {
                const web3 = await getWeb3();
                const accounts = await web3.eth.getAccounts();

                if (typeof accounts === undefined) {
                    alert("Please login with Metamask!");
                    console.log("login to metamask");
                }

                const networkId = await web3.eth.net.getId();
                try {
                    const artTokenContract = new web3.eth.Contract(
                        ArtToken.abi,
                        ArtToken.networks[networkId].address
                    );
                    // console.log("Contract: ", artTokenContract);
                    const marketplaceContract = new web3.eth.Contract(
                        ArtMarketplace.abi,
                        ArtMarketplace.networks[networkId].address
                    );
                    const totalSupply = await artTokenContract.methods
                        .totalSupply()
                        .call();
                    const totalItemsForSale = await marketplaceContract.methods
                        .totalItemsForSale()
                        .call();

                    for (var tokenId = 1; tokenId <= totalSupply; tokenId++) {
                        let item = await artTokenContract.methods.Items(tokenId).call();
                        let owner = await artTokenContract.methods.ownerOf(tokenId).call();

                        const response = await api
                            .get(`/tokens/${tokenId}`)
                            .catch((err) => {
                                console.log("Err: ", err);
                            });
                        console.log("home----response: ", response);
                        console.log("home----item: ", item);

                        itemsList.push({
                            name: response.data.name,
                            description: response.data.description,
                            image: response.data.image,
                            tokenId: item.id,
                            creator: item.creator,
                            owner: owner,
                            uri: item.uri,
                            isForSale: false,
                            saleId: null,
                            price:response.data.price,
                            isSold: null,
                            isTransfer:false,
                        });
                    }

                    if (totalItemsForSale > 0) {
                        for (var saleId = 0; saleId < totalItemsForSale; saleId++) {
                            let item = await marketplaceContract.methods
                                .itemsForSale(saleId)
                                .call();
                            let active = await marketplaceContract.methods
                                .activeItems(item.tokenId)
                                .call();

                            let itemListIndex = itemsList.findIndex(
                                (i) => i.tokenId === item.tokenId
                            );

                            itemsList[itemListIndex] = {
                                ...itemsList[itemListIndex],
                                isForSale: active,
                                saleId: item.id,
                                isSold: item.isSold,
                            };
                        }
                    }

                    dispatch(setAccount(accounts[0]));
                    dispatch(setTokenContract(artTokenContract));
                    dispatch(setMarketContract(marketplaceContract));
                    dispatch(setNft(itemsList));
                } catch (error) {
                    console.error("home--------------Error", error);
                    alert(
                        "Contracts not deployed to the current network " +
                        networkId.toString()
                    );
                }
            } catch (error) {
                alert(
                    `Failed to load web3, accounts, or contract. Check console for details.` +
                    error
                );
                console.error(error);
            }
        };
        init();
    }, [dispatch]);

    console.log("Nft :", nft);
    const [keyword, setKeyword] = useState({
        receive: "",
    });
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
    async function onSubmit (event){
        event.preventDefault();
        console.log(keyword.receive);
        // if(e.keyCode === 13){
        //     console.log(e.target);
        // }
    };
    useEffect(() => {
        console.log("keyword:"+keyword.receive);

    },[keyword]);
    let filterByName=(nft,name)=>{
        return nft.filter(function(item) {
            return item.name.indexOf(keyword.receive) >= 0 ;
        });
    }
    const SearchNfts =filterByName(nft,name);
    console.log(SearchNfts);
    function onChange(event) {
        let value = event.target.value;
        let newData = {};
        newData.receive = value;
        setKeyword(newData);
    }

    const nftItem = useSelector((state) => state.allNft.nft);
    return (
        <div>
        <div className={classes.main}>

            <img src={NFTbg} alt="NFTbg" className={classes.nftbg}/>
                <div className={classes.nftheader}>
                    <form onSubmit={onSubmit} className={classes.form}>
                        <TextField
                            id="standard-bare"
                            variant="outlined"
                            defaultValue="search..."
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <SearchOutlined />
                                    </IconButton>
                                ),
                            }}
                            onChange ={onChange}
                            value = {keyword.receive}
                        />
                    </form>

            </div>
        </div>
            <div className={classes.allNfts}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {SearchNfts.map((SearchNfts) => (
                        <Grid item key={SearchNfts.tokenId}>
                            <Card {...SearchNfts} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default Product