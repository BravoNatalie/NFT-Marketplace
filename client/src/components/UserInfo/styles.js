import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    content:{
        display:"flex",
        flexDirection:"column",

    },
    title: {
        textAlign:"center",
        color:"black",
        justifyContent:"space-around",
    },
    row:{
        display:"flex",
        width:"100%",
        height:"100%",

    },
    images:{
        width: "15rem",
        marginLeft: "1em",
        marginTop: "1em",
    },
    Info:{
        marginLeft: "5em",
        marginTop: "6em",
        columnCount:"3",
        fontSize: "1em",
        marginRight:"1em",
    },

}));

export { useStyles };