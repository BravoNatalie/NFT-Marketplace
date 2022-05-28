import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    homepage: {

    },
    MyNfts: {
        marginTop: "2rem",
        padding: "0 2rem",
    },
    title: {
        fontFamily: "sans-serif",
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "1rem",
    }
}));
export {useStyles};