import React from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

import { Card as MuiCard } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import SvgIcon from "@material-ui/core/SvgIcon";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { useStyles } from "./styles.js";
import { ReactComponent as RMBLogo } from "../../assets/rmb.svg";
import {ReactComponent as like} from "../../assets/galerie.svg";
import investNo from "../../assets/investNo.png";
import likeNo from "../../assets/likeNo.png";
import shareNo from "../../assets/shareNo.png";
import starNo from "../../assets/starNo.png";
import investYes from "../../assets/investYes.png";
import likeYes from "../../assets/likeYes.png";
import starYes from "../../assets/starYes.png";
import { useState } from "react";



const Card = ({ tokenId, name, image, price, owner,isForSale }) => {
  const classes = useStyles();
  const [fourStates, setFourStates] = useState({
    isLike:true,
    isInvest:true,
    isStar:true,
    isShare:false
  });

  // console.log("Card---------image: ", image);
  function like(){
    //todo
    console.log("what fuck?")
    if(fourStates.isLike==false){
      setFourStates({...fourStates, ["isLike"]:true});
      console.log("三影片like",fourStates)
    }else{
      setFourStates({...fourStates, ["isLike"]:false});
      console.log("三影片notlike",fourStates)
    }
  }
  function invest(){
    //todo
    console.log("what fuck?")
    if(fourStates.isInvest==false){
      setFourStates({...fourStates, ["isInvest"]:true});
      console.log("三影片like",fourStates)
    }else{
      setFourStates({...fourStates, ["isInvest"]:false});
      console.log("三影片notlike",fourStates)
    }
  }
  function star(){
    //todo
    console.log("收藏")
    if(fourStates.isStar==false){
      setFourStates({...fourStates, ["isStar"]:true});
      console.log("三影片like",fourStates)
    }else{
      setFourStates({...fourStates, ["isStar"]:false});
      console.log("三影片notlike",fourStates)
    }
  }
  function share(){
    console.log("share")
    //todo
  }

  return (
    
      <MuiCard className={classes.root}>
        <CardActionArea>
          <Link to={`/nft/${tokenId}`}>
            <CardMedia
              component="img"
              alt={name}
              height="240"
              image={image}
              title={name}
            />
          </Link>
          <CardContent className={classes.content}>
            <div className={classes.title}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                gutterBottom
              >
                {name}
              </Typography>
              <Chip
                size="small"
                disabled={!isForSale}
                label="Selling"
                className={classes.badge}
              />
            </div>
            <Typography variant="h6" className={classes.price}>
              <SvgIcon
                component={RMBLogo}
                viewBox="0 0 1024 1024"
                titleAccess="RMB"
              />
              <span>{String(price)}</span>
            </Typography>
            
            <Typography variant="h6" className={classes.price}>
              <div className={classes.quarter} onClick={like}>
                <div align="center">
                  <img src={fourStates["isLike"]?likeNo:likeYes} alt="cnm" height="50px" width="50px"></img>
                </div>
                <div align="center">
                  点赞
                </div>
              </div>
              <div className={classes.quarter} onClick={invest}>
                <div align="center">
                  <img src={fourStates["isInvest"]?investNo:investYes} alt="cnm" height="50px" width="50px"></img>
                </div>
                <div align="center">
                  投资
                </div>
              </div>
              <div className={classes.quarter} onClick={star}>
                <div align="center">
                  <img src={fourStates["isStar"]?starNo:starYes} alt="cnm" height="50px" width="50px"></img>
                </div>
                <div align="center">
                  收藏
                </div>
              </div>
              <div className={classes.quarter} onClick={share}>
                <div align="center">
                  <img src={shareNo} alt="cnm" height="50px" width="50px"></img>
                </div>
                <div align="center">
                  分享
                </div>
              </div> 
              
            </Typography>


            <Divider className={classes.divider} light />
            <Typography
              variant={"body1"}
              align={"center"}
              className={classes.seller}
            >
              {owner.slice(0, 7)}...{owner.slice(-4)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </MuiCard>
  );
};

export default Card;
