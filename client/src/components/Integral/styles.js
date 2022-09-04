import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    account: {
        display: "flex",
        alignItems: "center",
    },
    sep: {
        flexGrow: "1",
        border: "none",
        height: "1px",
        backgroundColor: "black",
        width: "100%",
    }
}));

export { useStyles };