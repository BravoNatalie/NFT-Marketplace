import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useStyles } from "./styles.js";
import DropZone from "../../components/DropZone";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
const Transfer =()=> {
    const history = useHistory();
    const classes = useStyles();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
    });
    function handleInputChange(event) {
        let { name, value } = event.target;
        // if(name === 'image'){
        //   value = event.target.files[0];
        // }
        setFormData({ ...formData, [name]: value });
    }




    return (
        <div className={classes.pageTransferNFTs} >
            <form>
                <div className={classes.formHeader}>
                    <h1>Transfer NFTs</h1>
                    <Link to="/">
                        <CancelOutlinedIcon fontSize="large" />
                    </Link>
                </div>
                <div className={classes.content}>
                    <fieldset>
                        <TextField
                            label="选择NFT并转让"
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
                            rows={6}
                            label="备注"
                            name="description"
                            variant="filled"
                            required
                            value={formData.description}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="转让细节"
                            name="price"
                            variant="filled"
                            value={formData.price}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Details</InputAdornment>,
                            }}
                            fullWidth
                        />

                        <Button variant="contained" color="primary" type="submit">
                            Transfer NFTs
                        </Button>
                    </fieldset>
                </div>
            </form>
        </div>)
};
export default Transfer;