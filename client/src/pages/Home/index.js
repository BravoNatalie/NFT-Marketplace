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
import slick from "./slick.css"
import {
  setNft,
  setAccount,
  setTokenContract,
  setMarketContract,
} from "../../redux/actions/nftActions";
import Card from "../../components/Card";

import { useStyles } from "./styles.js";

import veterans from "../../assets/arts/Sparse-Ahmed-Mostafa-vetarans-2.jpg";
import lionKing from "../../assets/arts/suresh-pydikondala-lion.jpg";
import dreaming from "../../assets/arts/phuongvp-maybe-i-m-dreaming-by-pvpgk-deggyli.jpg";
import modeling3d from "../../assets/arts/alan-linssen-alanlinssen-kitbashkitrender2.jpg";
import woman from "../../assets/arts/ashline-sketch-brushes-3-2.jpg";
import stones from "../../assets/arts/rentao_-22-10-.jpg";
import wale from "../../assets/arts/luzhan-liu-1-1500.jpg";
import comic from "../../assets/arts/daniel-taylor-black-and-white-2019-2.jpg";

import galerie from "../../assets/galerie.svg";
import Business from "../../assets/Business.svg";
import shsxy from "../../assets/shsxy.svg";
import shanghai from "../../assets/shanghai.svg";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import RotationChart from "../../components/RotationChart/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
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
            // console.log("home----response: ", response);
            // console.log("home----item: ", item);

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
  // console.log("SearchNfts："+SearchNfts);
  function onChange(event) {
    let value = event.target.value;
    let newData = {};
    newData.receive = value;
    setKeyword(newData);
  }
  function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
          <div
              className={className}
              style={{ ...style, display: "block", background: "grey",fontSize:"15px"}}
              onClick={onClick}
          />
      );
  }

  function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
          <div
              className={className}
              style={{ ...style, display: "block",  background: "grey" , fontSize:"15px"}}
              onClick={onClick}
          />
      );
  }
  const nftItem = useSelector((state) => state.allNft.nft);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
      <div className={classes.homepage}>
        <section className={classes.banner}>
          <RotationChart />
          {/*<Grid container spacing={0} xs={12} className={classes.gridBanner}>*/}
          {/*  <Grid item xs={3}>*/}
          {/*    <Grid container spacing={0}>*/}
          {/*      <Grid item xs={8}>*/}
          {/*        <img src={dreaming} alt="dreaming" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={4}>*/}
          {/*        <img src={veterans} alt="veterans" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={7}>*/}
          {/*        <img src={modeling3d} alt="modeling3d" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={5}>*/}
          {/*        <img src={lionKing} alt="lionKing" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={6} className={classes.main}>*/}
          {/*    <img src={shanghai} alt="shanghai" />*/}
          {/*    <Typography>A decentralized NFT marketplace where you can expose your art.</Typography>*/}

          {/*    <Link to="/create-nft">*/}
          {/*      <Button variant="contained" color="primary" disableElevation>*/}
          {/*        Mint your art*/}
          {/*      </Button>*/}
          {/*    </Link>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={3}>*/}
          {/*    <Grid container spacing={0}>*/}
          {/*      <Grid item xs={8}>*/}
          {/*        <img src={stones} alt="dreaming" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={4}>*/}
          {/*        <img src={woman} alt="veterans" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={7}>*/}
          {/*        <img src={wale} alt="modeling3d" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={5}>*/}
          {/*        <img src={comic} alt="lionKing" className={classes.images} />*/}
          {/*      </Grid>*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </section>
        <section className={classes.allNfts}>
          <div className={classes.nftheader}>
            <Typography className={classes.title}>最新NFT产品</Typography>
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
          </div>
          <div className={classes.nftcontent}>
            <Slider {...settings}>
              {SearchNfts.map((SearchNfts) => (
                  <Grid item key={SearchNfts.tokenId}>
                    <Card {...SearchNfts} />
                  </Grid>
              ))}
            </Slider>
          </div>
          {/*<Grid*/}
          {/*  container*/}
          {/*  direction="row"*/}
          {/*  justifyContent="center"*/}
          {/*  alignItems="center"*/}
          {/*  spacing={2}*/}
          {/*>*/}
          {/*  {SearchNfts.map((SearchNfts) => (*/}
          {/*      <Grid item key={SearchNfts.tokenId}>*/}
          {/*        <Card {...SearchNfts} />*/}
          {/*      </Grid>*/}
          {/*  ))}*/}
          {/*</Grid>*/}

        </section>
      </div>
  );
};

export default Home;
