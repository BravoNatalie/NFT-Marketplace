import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {useStyles} from './styles.js'
import getWeb3 from "../../utils/getWeb3";

const Wallet = () => {
    const classes = useStyles();
    const account = useSelector((state) => state.allNft.account);


    // async function get(account){
    //     const web3 = await getWeb3();
    //     const Balance = await web3.eth.net.getBalance(account);
    //     console.log(Balance);
    //     return Balance;
    // }

    return (
        <section >
            <h1>MetaMask</h1>
            <div className={classes.account}>
                <AccountBalanceWalletIcon
                    fontSize="large"
                    color="action"
                    titleAccess="Wallet Address" className={classes.walletIcon}/>
                <Typography variant="h6" color="textPrimary">{account}</Typography>
            </div>
            {/*<div className={classes.account}>*/}
            {/*    <AccountBalanceWalletIcon*/}
            {/*        fontSize="large"*/}
            {/*        color="action"*/}
            {/*        titleAccess="Wallet Address" className={classes.walletIcon}/>*/}
            {/*    <Typography variant="h6" color="textPrimary">{web3.utils.fromWei(String(), "ether")}ETH</Typography>*/}
            {/*</div>*/}
        </section>
    )
};

export default Wallet;