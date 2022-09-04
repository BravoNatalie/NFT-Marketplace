import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
  header: {
    background: "white"
  },
  search:{
    marginLeft:"3rem"
  },
  logo: {
    width: "10rem"
  },
  account: {
    display: "flex",
    alignItems: "center",
  },
  walletIcon: {
    marginRight: "0.4rem",
  },
  root: {
    display: "flex",
    marginLeft: "auto",
    alignItems: "center",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  button1:{
    marginRight:"5rem",
  },
  button2:{
    marginRight:"5rem",
  },
  button3:{
    marginRight:"8rem",
  },
  account2:{
    marginRight:"10px",
  },
}));

export { useStyles };