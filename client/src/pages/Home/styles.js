import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 1rem",
    '& img': {
      width: "80%"
    },
    '& p': {
      margin: "3rem 4.5rem 5rem 4rem",
      fontSize: "1.2rem",
      textAlign: "center"
    },
    '& button': {
      textTransform: 'none',
      fontSize: "1.2rem"
    }

  },
  allNfts: {
    marginTop: "2rem",
    padding: "0 2rem"
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "500",
     marginBottom: "1rem"
  }
});

export { useStyles };