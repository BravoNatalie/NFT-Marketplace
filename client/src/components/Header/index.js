import React from "react";
import { useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import {useStyles} from './styles.js'

import logo from '../../assets/Logo.svg';

const Header = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.allNft.account);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <img src={logo} alt="Galerie" className={classes.logo}/>
          <div className={classes.account}>
            <AccountBalanceWalletIcon titleAccess="Wallet Address" className={classes.walletIcon}/>
            <Typography variant="subtitle1">{account.slice(0,7)}...{account.slice(-4)}</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
