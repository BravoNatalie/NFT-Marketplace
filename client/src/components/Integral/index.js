import React, {useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {useStyles} from './styles.js'


const Integral = () => {
    const classes = useStyles();


    return (
        <section >
            <h1>积分明细</h1>
            <div className={classes.account}>
                <AccountBalanceWalletIcon
                    fontSize="large"
                    color="action"
                    titleAccess="Wallet Address" className={classes.walletIcon}/>
                <Typography variant="h6" color="textPrimary">积分余额：999</Typography>
            </div>
        </section>
    )
};

export default Integral;