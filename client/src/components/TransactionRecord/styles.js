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
    Record: {
        textAlign:"center",
        marginTop: "3em",
        fontFamily: "Arial",
        fontSize:"1em",
        borderCollapse: "collapse",
        width:"100%",
    },


}));

export { useStyles };