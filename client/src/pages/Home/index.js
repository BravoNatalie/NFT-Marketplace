import React, {useEffect, useState,Component} from "react";
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
import RotationChart from "../../components/RotationChart/index";
import { useStyles } from "./styles.js";


import dunhuang04 from "../../assets/arts/dunhuang04.jpeg";
import dunhuang06 from "../../assets/arts/dunhuang06.jpeg";
import dunhuang08 from "../../assets/arts/dunhuang08.jpeg";
import dunhuang11 from "../../assets/arts/dunhuang11.jpeg";

import sanxingdui08 from "../../assets/arts/sanxingdui08.jpeg";
import bingmayong01 from "../../assets/arts/bingmayong01.jpeg";
import sanxingdui05 from "../../assets/arts/sanxingdui05.jpeg";
import sanxingdui10 from "../../assets/arts/sanxingdui10.jpeg";

import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';


const Home = () => {
  const classes = useStyles();
  const nft = useSelector((state) => state.allNft.nft);
  const dispatch = useDispatch();

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

  const [keyword, setKeyword] = useState({
    receive : "",
  });
  async function onSubmit (event){
    event.preventDefault();
    console.log("gotta submit ：", keyword.receive);
    // alert("gotta submit ："+keyword.receive);
    let value = event.target.value;
    let newData = {};
    newData.receive = value;
    setKeyword(newData);
  };

  function onChange(event) {
    let value = event.target.value;
    let newData = {};
    newData.receive = value;
    setKeyword(newData);

  }



  let filterByName=(nft,name)=>{
    return nft.filter(function(item) {
      return item.name.indexOf(keyword.receive) >= 0 ;
    });
  }
  const SearchNfts =filterByName(nft,name);
  console.log(SearchNfts);


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
  const nftItem = useSelector((state) => state.allNft.nft);


  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };

  return (
      <div className={classes.homepage}>
        <section className={classes.banner}>
          <RotationChart />
        {/*  <Grid container spacing={0} xs={12} className={classes.gridBanner}>*/}
          {/*  <Grid item xs={3}>*/}
          {/*    <Grid container spacing={0}>*/}
          {/*      <Grid item xs={8}>*/}
          {/*        <img src={dunhuang08} alt="dunhuang08" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={4}>*/}
          {/*        <img src={dunhuang11} alt="dunhuang11" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={7}>*/}
          {/*        <img src={dunhuang06} alt="dunhuang06" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={5}>*/}
          {/*        <img src={dunhuang04} alt="dunhuang04" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={6} className={classes.main}>*/}
          {/*    <img src={galerie} alt="galerie" />*/}
          {/*    <Typography>探索艺术品的去中心化NFT市场</Typography>*/}
          {/*    <Link to="/create-nft">*/}
          {/*      <Button variant="contained" color="primary" disableElevation>*/}
          {/*        创建NFT*/}
          {/*      </Button>*/}
          {/*    </Link>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={3}>*/}
          {/*    <Grid container spacing={0}>*/}
          {/*      <Grid item xs={8}>*/}
          {/*        <img src={sanxingdui08} alt="sanxingdui08" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={4}>*/}
          {/*        <img src={sanxingdui10} alt="sanxingdui10" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={7}>*/}
          {/*        <img src={bingmayong01} alt="bingmayong01" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={5}>*/}
          {/*        <img src={sanxingdui05} alt="sanxingdui05" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}

        {/*  </Grid>*/}
        </section>

        <section className={classes.allNfts}>
          {/*<Typography className={classes.title}>所有NFT作品</Typography>*/}
          <form onSubmit={onSubmit}>
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

          <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
          >
            {SearchNfts.map((nft) => (
                <Grid item key={nft.tokenId}>
                  <Card {...nft} />
                </Grid>
            ))}
          </Grid>
        </section>
      </div>
  );
};

export default Home;

