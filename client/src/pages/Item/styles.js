import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pageItem: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",

    '& main': {
      margin: "20px auto 80px auto",
      maxWidth: "730px",
      background: "#FFF",
      borderRadius: "8px",
    
      display: "flex",
      flexDirection: "column",

      '& header': {
        display: "flex",
        alignItems: "center",
    
        '& a': {
          margin: "1rem auto 0.5rem 1.5rem",
        }
      },

      '& section': {
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "center",
        
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
});

export { useStyles };