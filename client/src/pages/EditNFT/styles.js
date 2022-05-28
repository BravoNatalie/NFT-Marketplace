import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pageEditNft: {
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
      '& section': {

        '& figure': {
          height: "350px",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          outline: "0",

          '& img': {
            width: "100% !important",
            height: "100% !important",
            objectFit: "cover !important",
            borderRadius: "10px",
          },
        },

        '& fieldset': {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          border: "0",
        }
      },
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
});

export { useStyles };