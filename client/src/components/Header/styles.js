import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
  header: {
    background: '#3F51B5'
  },
  logo: {
    width: "10rem"
  },
  account: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
  walletIcon: {
    marginRight: "0.4rem",
  },
  root: {
    display: "flex",
    '& div':{
      marginLeft: 50,
    },
    '& Button':{
      marginLeft: 550,
    }
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export { useStyles };