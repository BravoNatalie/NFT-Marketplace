import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {useStyles} from './styles.js'

import logo from '../../assets/shsxy.svg';
import Grid from "@material-ui/core/Grid";
import Card from "../Card";
import {TextField} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
const Footer = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
        <AppBar className={classes.appBar}>
            <Toolbar>
            {/*<hr className={classes.sep}/>*/}
                <section className={classes.footer}>
                    <div className={classes.footlogo}>
                        <Link to="/">
                            <img src={logo} alt="shsxy" className={classes.logo}/>
                        </Link>
                    </div>
                    <div className={classes.footinfo}>
                        友情链接：上海商学院官网https://www.sbs.edu.cn/
                    </div>
                    <div className={classes.footright}>
                                隐私政策
                    </div>
                </section>
            {/*<hr />*/}
            </Toolbar>
        </AppBar>

        </React.Fragment>
    )
};

export default Footer;