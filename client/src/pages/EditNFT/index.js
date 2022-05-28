import React, {useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams,Link, useHistory } from "react-router-dom";
import CancelOutlinedIcon  from "@material-ui/icons/CancelOutlined";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { selectedNft, removeSelectedNft } from "../../redux/actions/nftActions";

import { useStyles } from "./styles.js";

import { api } from "../../services/api";

import DatePicker,{registerLocale, setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import zhCN from 'date-fns/locale/zh-CN';
registerLocale('zh-CN', zhCN)

const EditNFT = () => {
    const classes = useStyles();
    const history = useHistory();
    const { nftId } = useParams();

    const account = useSelector((state) => state.allNft.account);
    const marketplaceContract = useSelector(
        (state) => state.allNft.marketplaceContract
    );
    let nft = useSelector((state) => state.nft);
    let nftItem = useSelector((state) =>
        state.allNft.nft.filter((nft) => nft.tokenId === nftId)
    );
    const {
        image,
        name,
        price,
        creator,
        description,
        duration,
        tokenId,
        saleId,
        isForSale,
        isSold,
    } = nft;

    const [formData, setFormData] = useState({
        title: nftItem.title,
        description: nftItem.description,
        price: nftItem.price,
    });

    const dispatch = useDispatch();

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
    function handleInputChange(event) {
        let { name, value,start,end ,price} = event.target;

        setFormData({ ...formData, [name]: value });
    }

    async function editNFT(event) {
        event.preventDefault();
        const { title, description ,price} = formData;

        console.log("title: " + title);

        const data = new FormData();
        data.append("name", title);
        data.append("description", description);
        data.append("price", price);


        try {
            const totalSupply = await marketplaceContract.methods.totalSupply().call();

            const response = await api.post("/tokens", data, {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                },
            });
            console.log("edit...............",response);


            await edit(response.data.message);
        } catch (error) {
            console.log(error);

        }
    }
    async function edit(tokenMetadataURL) {
        try {
            // const receipt = await artTokenContract.methods
            //     .edit(tokenMetadataURL)
            //     .send({ from: account });
            //
            // history.push('/');
            console.log("edit...........",nft)
        } catch (error) {
            console.error("Error, editing: ", error);
            alert("Error while editing!");
        }
    }


    return (
        <div className={classes.pageEditNft}>
            <form onSubmit={EditNFT}>
                <div className={classes.formHeader}>
                    <h1>Edit collectible</h1>
                    <Link to="/">
                        <CancelOutlinedIcon fontSize="large" />
                    </Link>
                </div>
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
                        <fieldset>
                            <TextField
                                label="Title"
                                name="title"
                                variant="filled"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                label="Description"
                                name="description"
                                variant="filled"
                                required
                                value={formData.description}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <label htmlFor="duration">Duration
                                <DatePicker
                                    locale="zh-CN"
                                    selected={startDate}
                                    onChange={onChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                />
                            </label>
                            <TextField
                                label="price"
                                name="price"
                                variant="filled"
                                value={formData.price}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">wei</InputAdornment>,
                                }}
                                fullWidth
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </fieldset>
                        </Grid>
                </section>
            </form>
        </div>
    );
};

export default EditNFT;
