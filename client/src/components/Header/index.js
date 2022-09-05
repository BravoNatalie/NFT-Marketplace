import React, {useState,useEffect} from "react";
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

const Header = (props) => {
    const classes = useStyles();
    const nft = useSelector((state) => state.allNft.nft);
    const account = useSelector((state) => state.allNft.account);
    // const nftItem = useSelector((state) => state.allNft.nft);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
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

    const [keyword, setKeyword] = useState({
        receive : "",
    });

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const dispatch = useDispatch();
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);


    async function onSubmit (event){
        event.preventDefault();
        console.log("gotta submit ：", keyword.receive);
        // alert("gotta submit ："+keyword.receive);
    };
    // const onChange = value =>{
    //     setKeyword(value);
    // }
    function onChange(event) {
        let value = event.target.value;
        let newData = {};
        newData.receive = value;
        setKeyword(newData);

    }
    useEffect(() => {
        console.log("keyword:"+keyword.receive);
        let filterByName=(nft,name)=>{
            return nft.filter(function(item) {
                return item.name.indexOf(keyword.receive) >= 0 ;
            });
        }
        console.log(filterByName(nft,name));
    },[keyword]);
    // useEffect(() => {
    //     console.log("keyword:"+keyword.receive);
    //     let searchData =[];
    //     nft.map((nft) => {
    //             if (nft.name.indexOf(keyword.receive) >= 0){
    //                 searchData.push(nft);
    //             }
    //         }
    //     )
    //     console.log("searchData:"+searchData);
    //     console.log("nft : "+typeof(nft));
    //     console.log("searchData : "+typeof(searchData));
    // },[keyword]);

    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    // const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    //
    // const handleMobileMenuClose = () => {
    //     setMobileMoreAnchorEl(null);
    // };
    //
    // const handleMenuClose = () => {
    //     setAnchorEl(null);
    //     handleMobileMenuClose();
    // };
    //
    // const handleMobileMenuOpen = (event) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };
    // const menuId = 'primary-search-account-menu';
    // const renderMenu = (
    //     <Menu
    //         anchorEl={anchorEl}
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         id={menuId}
    //         keepMounted
    //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         open={isMenuOpen}
    //         onClose={handleMenuClose}
    //     >
    //
    //         <Link to="/Account">
    //             <MenuItem onClick={handleMenuClose}>账户</MenuItem>
    //         </Link>
    //     </Menu>
    // );
    //
    // const mobileMenuId = 'primary-search-account-menu-mobile';
    // const renderMobileMenu = (
    //     <Menu
    //         anchorEl={mobileMoreAnchorEl}
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         id={mobileMenuId}
    //         keepMounted
    //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         open={isMobileMenuOpen}
    //         onClose={handleMobileMenuClose}
    //     >
    //         <MenuItem onClick={handleProfileMenuOpen}>
    //             <IconButton
    //                 aria-label="account of current user"
    //                 aria-controls="primary-search-account-menu"
    //                 aria-haspopup="true"
    //                 color="inherit"
    //             >
    //                 <AccountCircle />
    //             </IconButton>
    //             <p>Profile</p>
    //         </MenuItem>
    //     </Menu>
    // );

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar className={classes.header}>
                <Toolbar>
                    <Link to="/">
                        <img src={logo} alt="shsxy" className={classes.logo}/>
                    </Link>

                    {/*<div className={classes.search}>*/}
                    {/*    <div className={classes.searchIcon}>*/}
                    {/*        <SearchIcon />*/}
                    {/*    </div>*/}
                    {/*    <form onSubmit={onSubmit}>*/}
                    {/*        <InputBase*/}
                    {/*            placeholder="Search…"*/}
                    {/*            classes={{*/}
                    {/*                root: classes.inputRoot,*/}
                    {/*                input: classes.inputInput,*/}
                    {/*            }}*/}
                    {/*            inputProps={{ 'aria-label': 'search' }}*/}
                    {/*            onChange ={onChange}*/}
                    {/*            value = {keyword.receive}*/}
                    {/*        />*/}
                    {/*    </form>*/}
                    {/*</div>*/}

                    {/*<div className={classes.root}>*/}
                    {/*    <div>*/}
                    {/*        <Link to="/Welcome">*/}
                    {/*            <Button color='primary' variant="contained" >Welcome</Button>*/}
                    {/*        </Link>*/}
                    {/*        <Link to="/">*/}
                    {/*            <Button color='primary' variant="contained" >首页</Button>*/}
                    {/*        </Link>*/}
                    {/*        <Link to="/Login">*/}
                    {/*            <Button color='primary' variant="contained" >登录/注册</Button>*/}
                    {/*        </Link>*/}
                    {/*        <Link to="/Tab">*/}
                    {/*            <Button color='primary' variant="contained" >分类</Button>*/}
                    {/*        </Link>*/}
                    {/*        <Button*/}
                    {/*            variant="contained" color="primary"*/}
                    {/*            ref={anchorRef}*/}
                    {/*            aria-controls={open ? 'menu-list-grow' : undefined}*/}
                    {/*            aria-haspopup="true"*/}
                    {/*            onClick={handleToggle}*/}
                    {/*        >*/}
                    {/*            Menu*/}
                    {/*        </Button>*/}
                    {/*        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>*/}
                    {/*            {({ TransitionProps, placement }) => (*/}
                    {/*                <Grow*/}
                    {/*                    {...TransitionProps}*/}
                    {/*                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}*/}
                    {/*                >*/}
                    {/*                    <Paper>*/}
                    {/*                        <ClickAwayListener onClickAway={handleClose}>*/}
                    {/*                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>*/}
                    {/*                                <Link to="/create-nft">*/}
                    {/*                                    <MenuItem onClick={handleClose}>创建NFT</MenuItem>*/}
                    {/*                                </Link>*/}
                    {/*                                <Link to="/my-nft">*/}
                    {/*                                    <MenuItem onClick={handleClose}>我的NFT</MenuItem>*/}
                    {/*                                </Link>*/}

                    {/*                            </MenuList>*/}
                    {/*                        </ClickAwayListener>*/}

                    {/*                    </Paper>*/}
                    {/*                </Grow>*/}
                    {/*            )}*/}
                    {/*        </Popper>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <IconButton*/}
                    {/*        edge="end"*/}
                    {/*        aria-label="account of current user"*/}
                    {/*        aria-controls={classes.account}*/}
                    {/*        aria-haspopup="true"*/}
                    {/*        onClick={handleProfileMenuOpen}*/}
                    {/*        color="inherit"*/}
                    {/*    >*/}
                    {/*        <AccountCircle />*/}
                    {/*    </IconButton>*/}
                    {/*</div>*/}
                    {/*<div className={classes.account}>*/}
                    {/*    <AccountBalanceWalletIcon titleAccess="Wallet Address" className={classes.walletIcon}/>*/}
                    {/*    <Typography variant="subtitle1">{account.slice(0,7)}...{account.slice(-4)}</Typography>*/}
                    {/*</div>*/}
                    <div className={classes.root}>
                        <Link to="/create-nft">
                            <Button href="#" size="large" className={classes.button0}>
                                创作NFT
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button href="#" size="large" className={classes.button1}>
                                NFT要闻
                            </Button>
                        </Link>
                        <Link to="/product">
                            <Button href="#" size="large" className={classes.button2}>
                                NFT产品
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button href="#" size="large" className={classes.button3}>
                                积分兑换
                            </Button>
                        </Link>
                    </div>
                    <div className={classes.account2}>
                        <Link to="/UserSetting">
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={classes.account}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                            >
                                <AccountCircle fontSize="large"/>
                            </IconButton>
                        </Link>
                    </div>
                    <div className={classes.account}>
                        <AccountBalanceWalletIcon
                            fontSize="large"
                            color="action"
                            titleAccess="Wallet Address" className={classes.walletIcon}/>
                        <Typography variant="h6"
                                    color="textPrimary">{account.slice(0, 7)}...{account.slice(-4)}</Typography>
                    </div>
            </Toolbar>
        </AppBar>
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
            {/*{renderMobileMenu}*/}
            {/*{renderMenu}*/}
            <Toolbar />
        </React.Fragment>
    );
};

export default Header;


