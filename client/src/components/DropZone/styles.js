import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dropzone: {
    height: "350px",
    background: "#e1E4F2",
    borderRadius: "10px",
  
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "48px",
    outline: "0",
    
    '& img': {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  
    '& p': {
      width: "calc(100% - 60px)",
      height:" calc(100% - 60px)",
      borderRadius: "10px",
      border: "1px dashed #3F51B5",
    
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#333",

      '& svg': {
        color: "#3F51B5",
        width: "24px",
        height: "24px",
        marginBottom: "8px",
      }
    }
  }
});

export { useStyles };