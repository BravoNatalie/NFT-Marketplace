import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Web3 from "web3";


// import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import Box from '@mui/material/Box';

import { selectedNft, removeSelectedNft } from "../../redux/actions/nftActions";

import { useStyles } from "./styles.js";

// import { DateRangePicker, DateRange, DateRangeDelimiter } from "@material-ui/pickers";
// import DatePicker,{registerLocale, setDefaultLocale} from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import zhCN from 'date-fns/locale/zh-CN';
// registerLocale('zh-CN', zhCN)



const Item = () => {
  const classes = useStyles();

  const { nftId } = useParams();
  const marketplaceContract = useSelector(
      (state) => state.allNft.marketplaceContract
  );
  const artTokenContract = useSelector(
      (state) => state.allNft.artTokenContract
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
    duration,
    tokenId,
    saleId,
    isForSale,
    isSold,
  } = nft;

  // const [value, setValue] = React.useState([null, null]);
  const dispatch = useDispatch();

  // const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };



  useEffect(() => {

    if (nftId && nftId !== "" && nftItem) dispatch(selectedNft(nftItem[0]));
    return () => {
      dispatch(removeSelectedNft());
    };
  }, [nftId]);

  async function putForSale(id, price) {
    try {
      // const itemIdex = getItemIndexBuyTokenId(id);
      //
      // const marketAddress = ArtMarketplace.networks[1337].address;
      // await artTokenContract.methods.approve(marketAddress, items[itemIdex].tokenId).send({from: accounts[0]});

      if(isSold){
        try {
          // const web3 = await getWeb3();
          // const artTokenContract = new web3.eth.Contract(
          //     ArtToken.abi
          //     // ArtToken.networks[networkId].address
          // );
          const receipt2 = await artTokenContract.methods
              .approve(marketplaceContract._address,id)
              .send({gas:210000,from: account });
          console.log(receipt2);
        }catch (error) {
          console.error("Error while giveResaleApproval",error);
        }

      }

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
  };
  async function transferNFT(id, receiver) {
    try {
      const receipt = await marketplaceContract.methods
          .transferNFT(saleId)
          .send({ gas: 210000, value: price, from: account });

    } catch (error) {
      console.error("Error, transfering: ", error);
      alert("Error while transfering!");
    }
  };


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

                      {/*<label htmlFor="duration">Duration*/}
                      {/*  <DatePicker*/}
                      {/*      locale="zh-CN"*/}
                      {/*      selected={startDate}*/}
                      {/*      onChange={onChange}*/}
                      {/*      startDate={startDate}*/}
                      {/*      endDate={endDate}*/}
                      {/*      selectsRange*/}
                      {/*      inline*/}
                      {/*  />*/}
                      {/*</label>*/}

                      {/*<DateRangePicker*/}
                      {/*    startText="Check-in"*/}
                      {/*    endText="Check-out"*/}
                      {/*    value={value}*/}
                      {/*    onChange={(newValue) => setValue(newValue)}*/}
                      {/*    renderInput={(startProps, endProps) => (*/}
                      {/*        <React.Fragment>*/}
                      {/*          <TextField {...startProps} />*/}
                      {/*          <DateRangeDelimiter> to </DateRangeDelimiter>*/}
                      {/*          <TextField {...endProps} />*/}
                      {/*        </React.Fragment>*/}
                      {/*    )}*/}
                      {/*/>*/}

                      <TextField
                          label="price"
                          name="price"
                          variant="filled"
                          margin="dense"
                          defaultValue={Web3.utils.fromWei(String(price), "ether")}
                          // defaultValue={String(price)}
                          InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">ETH</InputAdornment>
                            ),
                          }}
                          fullWidth
                          disabled
                      />
                      <Grid item xs={12} direction="row">
                        {owner === account && !isForSale && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => putForSale(tokenId, price)}
                            >
                              Sell
                            </Button>
                        )}

                        {owner !== account && isForSale && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => buy(saleId, price)}
                            >
                              Buy
                            </Button>
                        )}
                        {owner == account && !isForSale &&(
                            <Link to="/transfer">
                              <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => transferNFT(saleId, price)}
                              >
                                Transfer
                              </Button>
                            </Link>
                        )}
                      </Grid>

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