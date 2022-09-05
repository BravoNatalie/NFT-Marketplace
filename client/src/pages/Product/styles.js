import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    main:{
        display:"flex",
        justifyContent:"center",
        //alignItems:"center",
    },
    nftbg: {
        width: "100%",
        top: "0",
        position:"relative",
    },
    allNfts: {
        marginTop: "2rem",
        padding: "0 2rem",
    },
    nftheader:{
       position:"absolute",
        bottom: "20%",




    },
    // form:{
    //   backgroundColor:"white",
    // },
});

export { useStyles };