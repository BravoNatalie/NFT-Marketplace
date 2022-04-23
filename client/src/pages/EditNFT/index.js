import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CancelOutlinedIcon  from "@material-ui/icons/CancelOutlined";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useStyles } from "./styles.js";

import { api } from "../../services/api";

import DatePicker,{registerLocale, setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import zhCN from 'date-fns/locale/zh-CN';
registerLocale('zh-CN', zhCN)

const EditNFT = () => {
    const classes = useStyles();
    const history = useHistory();

    const account = useSelector((state) => state.allNft.account);
    const artTokenContract = useSelector(
        (state) => state.allNft.artTokenContract
    );

    const [selectedFile, setSelectedFile] = useState();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration:"",
        price: "",
    });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    function handleInputChange(event) {
        let { name, value,start,end ,price} = event.target;

        setFormData({ ...formData, [name]: value ,[start]:start,[end]:end,[price]: price});
    }





    return (
        <div className={classes.pageCreateNft}>
            <form onSubmit={EditNFT}>
                <div className={classes.formHeader}>
                    <h1>Edit collectible</h1>
                    <Link to="/">
                        <CancelOutlinedIcon fontSize="large" />
                    </Link>
                </div>
                <div className={classes.content}>
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
                                startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                            }}
                            fullWidth
                        />

                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </fieldset>
                </div>
            </form>
        </div>
    );
};

export default EditNFT;
