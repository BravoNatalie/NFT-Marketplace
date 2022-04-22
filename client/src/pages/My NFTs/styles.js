import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 280,
        width: 200,

    },
    control: {
        padding: theme.spacing(2),
    },
}));
export {useStyles};