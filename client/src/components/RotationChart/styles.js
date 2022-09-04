import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    images: {
        objectFit: "cover",
        width: "100%",
        height: "300px",
        marginLeft: "auto",
        marginRight: "auto"
    },
}));

export { useStyles };