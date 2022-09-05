import { alpha, makeStyles } from '@material-ui/core/styles';
//import backImg from "../../assets/arts/rentao_-22-10-.jpg";

const useStyles = makeStyles((theme) =>({
  homepage: {

  },
  images: {
    objectFit: "cover",
    width: "100%",
    height: "100%",

  },

  banner: {
    // minHeight: "50vh",
    // maxHeight: "50vh",
    // marginBottom: "3rem"
  },
  gridBanner: {
    // margin: 0,
    // width: '100%',
  },
  main: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 1rem",
    '& img': {
      width: "55%"
    },
    '& p': {
      margin: "3rem 8rem 4rem 8.5rem",
      fontSize: "1.2rem",
      textAlign: "center"
    },
    '& button': {
      textTransform: 'none',
      fontSize: "1.2rem",
      fontWeight: "400",
      background: '#3F51B5'
    }

  },
  allNfts: {
    //backgroundImage: `url(${backImg})`,
    marginTop: "2rem",
    padding: "0 2rem",
  },
  nftheader:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:"1em",
  },
  nftcontent:{
    marginBottom:"2rem",
  },
  title: {
    fontFamily: "sans-serif",
    fontSize: "1.8rem",
    fontWeight: "600",
    marginRight:"1rem",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}));

export { useStyles };