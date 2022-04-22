import React, { useState } from "react";
import {useStyles} from "./styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const MyNFTs =()=> {
    const [spacing, setSpacing] = React.useState(5);
    const classes = useStyles();
    return (
        <h1>My NFTs
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={spacing}>
                    {[0, 1, 2,3,4,5,6,7,8,9].map((value) => (
                        <Grid key={value} item>
                            <Paper className={classes.paper}  elevation={3}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
        </h1>
    );
};
export default MyNFTs;