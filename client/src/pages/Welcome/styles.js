import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    pageWelcome: {
        '& video': {
            maxWidth: "100%",
            height: "auto",
            float: "right",
            objectFit: "cover",
        },
        '& body': {
            margin: '80px',

        },

    },
});

export { useStyles };