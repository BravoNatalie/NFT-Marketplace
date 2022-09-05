import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    logo: {
        width: "12rem"
    },
    footer: {
        width:"100%",
      display:"flex",
      justifyContent: "space-between",
      alignItems:"center",
    },
    footlogo: {
        width: "15rem",
        marginLeft:"1em"
    },
    footinfo:{
        fontSize: "2.5em",
        color:"LightGray",
    },
    footright:{
        fontSize: "2.5em",
        color:"LightGray",
        marginRight:"1em",
    },
    // sep: {
    //     flexGrow: "1",
    //     border: "none",
    //     height: "1px",
    //     backgroundColor: "black",
    //     width: "100%",
    // }
    appBar: {
        top: 'auto',
        bottom: 0,
        background: "white",
    },
}));

export { useStyles };