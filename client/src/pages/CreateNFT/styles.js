import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pageCreateNft: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",

    '& form': {
      margin: "20px auto 80px auto",
      maxWidth: "730px",
      background: "#FFF",
      borderRadius: "8px",
    
      display: "flex",
      flexDirection: "column",

      '& fieldset': {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",

        width: "400px",
        minWidth: "240px",
        marginTop: "64px",
        marginLeft: "2rem",
        minInlineSize: "auto",
        border: "0",
      }
    }
  },

  formHeader: {
    display: "flex",
    alignItems: "baseline",

    '& h1': {
      fontSize: "36px",
    },

    '& a': {
      marginLeft: "auto",
      marginRight: "1.5rem",
    }
  },

  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  dropzone: {
    minWidth: "300px"
  }
});

export { useStyles };