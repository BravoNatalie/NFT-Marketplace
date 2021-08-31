import { makeStyles } from "@material-ui/core/styles";

const spaceUnits = 2;

const useStyles = makeStyles({
  root: {
    // maxWidth: "12.5rem",
    width: "20rem",
    minWidth: 200,
    borderRadius: "0.6rem",
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  content: {
    // textAlign: "left",
    // padding: spaceUnits * 6,
  },
  divider: {
    margin: `${spaceUnits * 3}px 0`,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  heading: {
    fontWeight: "bold"
  },
  badge: {
    fontSize: "0.9rem",
    height: "1.4rem",
    marginLeft: "auto",
    color: "white",
    backgroundColor: "#00BE7A",
    '&:active': {
      boxShadow: 'none',
      backgroundColor: "#DDE1E3"
  },
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding:" 0.8rem 0 0.4rem",
  },
  seller: {
    paddingTop: "0.1rem"
  },
});

export { useStyles };
